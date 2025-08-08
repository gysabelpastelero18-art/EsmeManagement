// User database management
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  username: string;
  password: string; // hashed
  email?: string;
  createdAt: string;
  lastLogin?: string;
}

const USERS_DB_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Load all users from file
async function loadUsers(): Promise<User[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(USERS_DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist, create with default admin users
    const defaultUsers: User[] = [
      {
        id: 'admin-1',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        createdAt: new Date().toISOString()
      },
      {
        id: 'manager-1',
        username: 'manager',
        password: await bcrypt.hash('manager123', 10),
        createdAt: new Date().toISOString()
      }
    ];
    await saveUsers(defaultUsers);
    return defaultUsers;
  }
}

// Save users to file
async function saveUsers(users: User[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(USERS_DB_FILE, JSON.stringify(users, null, 2));
}

// Create a new user
export async function createUser(username: string, password: string, email?: string): Promise<{ success: boolean; message: string }> {
  try {
    const users = await loadUsers();
    
    // Check if username already exists
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      username: username.trim(),
      password: hashedPassword,
      email: email?.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await saveUsers(users);

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Failed to create user' };
  }
}

// Authenticate user
export async function authenticateUser(username: string, password: string): Promise<{ success: boolean; user?: Omit<User, 'password'> }> {
  try {
    const users = await loadUsers();
    
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      return { success: false };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false };
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await saveUsers(users);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return { success: false };
  }
}

// Get all users (without passwords)
export async function getAllUsers(): Promise<Omit<User, 'password'>[]> {
  try {
    const users = await loadUsers();
    return users.map(({ password, ...user }) => user);
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}

// Delete user
export async function deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const users = await loadUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    users.splice(userIndex, 1);
    await saveUsers(users);

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: 'Failed to delete user' };
  }
}

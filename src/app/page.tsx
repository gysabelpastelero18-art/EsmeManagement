'use client';

import { useState, useEffect } from 'react';
import LoginPage from '../components/LoginPage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Both Branches');
  const [startDate, setStartDate] = useState('2025-08-01');
  const [endDate, setEndDate] = useState('2025-08-07');
  const [dateRange, setDateRange] = useState('This Week');
  const [username, setUsername] = useState('Admin');

  // Check for persisted login state on component mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setIsLoggedIn(true);
            setUsername(data.user.username || 'Admin');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsHydrated(true);
      }
    };

    checkUserSession();
  }, []);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/session', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
    
    setIsLoggedIn(false);
    setUsername('Admin');
  };

  // Branch-specific data
  const getBranchData = () => {
    // If there is no imported file or database record, show zeroes
    const noData = true; // Set this to true if there is no data in the database

    if (noData) {
      switch (selectedBranch) {
        case 'Mayon Branch':
        case 'One Balete Branch':
          return {
            departments: [
              { dept: '🥖 Bakery', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '🥤 Beverages', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '🥘 Commissary', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '🍰 Desserts', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '🍳 Kitchen', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '🍽️ Others: Corkage', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '🚚 Others: Delivery Fee', sales: '₱0', expenses: '₱0', net: '₱0' },
              { dept: '⭐ Others: Service Charge', sales: '₱0', expenses: '₱0', net: '₱0' }
            ],
            totals: { sales: '₱0', expenses: '₱0', net: '₱0' },
            stats: [
              { icon: '💰', title: 'Total Sales', amount: '₱0', change: '+0% from last month', color: '#9CAF88', action: () => window.location.href = '/sales' },
              { icon: '🍎', title: 'Products', amount: '0', change: 'Active items', color: '#4A6741', action: () => window.location.href = '/inventory' },
              { icon: '📊', title: 'Orders', amount: '0', change: 'This month', color: '#006400', action: () => alert('Order management coming soon!') },
              { icon: '🏪', title: 'Revenue', amount: '₱0', change: 'Net profit', color: '#9CAF88', action: () => window.location.href = '/sales' }
            ],
            showSeparateBranches: false
          };
        default: // Both Branches
          return {
            departments: [
              { dept: '🥖 Bakery', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '🥤 Beverages', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '🥘 Commissary', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '🍰 Desserts', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '🍳 Kitchen', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '🍽️ Others: Corkage', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '🚚 Others: Delivery Fee', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } },
              { dept: '⭐ Others: Service Charge', mayon: { sales: '₱0', expenses: '₱0', net: '₱0' }, balete: { sales: '₱0', expenses: '₱0', net: '₱0' } }
            ],
            totals: { 
              mayon: { sales: '₱0', expenses: '₱0', net: '₱0' },
              balete: { sales: '₱0', expenses: '₱0', net: '₱0' },
              combined: { sales: '₱0', expenses: '₱0', net: '₱0' }
            },
            stats: [
              { icon: '💰', title: 'Total Sales', amount: '₱0', change: '+0% from last month', color: '#9CAF88', action: () => window.location.href = '/sales' },
              { icon: '🍎', title: 'Products', amount: '0', change: 'Active items', color: '#4A6741', action: () => window.location.href = '/inventory' },
              { icon: '📊', title: 'Orders', amount: '0', change: 'This month', color: '#006400', action: () => alert('Order management coming soon!') },
              { icon: '🏪', title: 'Revenue', amount: '₱0', change: 'Net profit', color: '#9CAF88', action: () => window.location.href = '/sales' }
            ],
            showSeparateBranches: true
          };
      }
    }
  }; // <-- Add this closing brace here

  const currentBranchData = getBranchData() ?? {
  departments: [],
  totals: {},
  stats: [],
  showSeparateBranches: false
};

  if (!isHydrated) {
    return null; // Prevent hydration mismatch
  }

  // Always show login page unless authenticated
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fdf8 0%, #f0f8f0 25%, #e8f5e8 50%, #f2f9f2 75%, #fafdfb 100%)',
        position: 'relative'
      }}
    >
      {/* Elegant Background Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(156,175,136,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 40%, rgba(74,103,65,0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0,100,0,0.04) 0%, transparent 50%),
            linear-gradient(45deg, transparent 48%, rgba(156,175,136,0.02) 49%, rgba(156,175,136,0.02) 51%, transparent 52%)
          `,
          backgroundSize: '400px 400px, 600px 600px, 500px 500px, 100px 100px',
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle Geometric Accents */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(156,175,136,0.5) 100px,
              rgba(156,175,136,0.5) 101px
            )
          `,
          pointerEvents: 'none'
        }}
      />
      {/* Header */}
      <header 
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(156,175,136,0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(74,103,65,0.4)',
                overflow: 'hidden',
                background: 'white'
              }}
            >
              <img 
                src="/images/logo.png" 
                alt="ESMERALDA Finance Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div>
              <h1 
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#006400',
                  margin: '0 0 4px 0',
                  fontFamily: 'Georgia, serif'
                }}
              >
                ESMERALDA Finance
              </h1>
              <p 
                style={{
                  color: '#4A6741',
                  margin: 0,
                  fontSize: '14px'
                }}
              >
                Business Management Dashboard
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#006400',
                fontWeight: '600'
              }}
            >
              👋 Welcome, {username}
            </div>
            <button 
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg, #9CAF88, #4A6741)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '50px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(74,103,65,0.3)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 8px 25px rgba(74,103,65,0.4)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 15px rgba(74,103,65,0.3)';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 20px',
          position: 'relative',
          zIndex: 5
        }}
      >
        {/* Stats Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          {currentBranchData.stats.map((stat, index) => (
            <div 
              key={index}
              onClick={stat.action}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(156,175,136,0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
                target.style.background = 'rgba(255, 255, 255, 0.85)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                target.style.background = 'rgba(255, 255, 255, 0.75)';
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                  borderRadius: '20px',
                  zIndex: -1
                }}
              />
              
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: stat.color,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: `0 8px 20px ${stat.color}40`
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p style={{ color: '#4A6741', fontWeight: '600', margin: '0 0 4px 0' }}>{stat.title}</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#006400', margin: '0 0 4px 0' }}>{stat.amount}</p>
                  <p style={{ fontSize: '14px', color: '#9CAF88', margin: 0 }}>{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Financial Summary */}
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(156,175,136,0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                background: 'linear-gradient(135deg, rgba(156,175,136,0.1), rgba(74,103,65,0.08), rgba(0,100,0,0.06))',
                borderRadius: '20px',
                zIndex: -1
              }}
            />
            
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <h2 
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#006400',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  🌺 Financial Summary
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Date Range Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#4A6741', fontWeight: '500' }}>📅</span>
                    <select 
                      value={dateRange}
                      onChange={(e) => {
                        setDateRange(e.target.value);
                        const today = new Date();
                        const todayStr = today.toISOString().split('T')[0];
                        
                        if (e.target.value === 'Today') {
                          setStartDate(todayStr);
                          setEndDate(todayStr);
                        } else if (e.target.value === 'This Week') {
                          const startOfWeek = new Date(today);
                          startOfWeek.setDate(today.getDate() - today.getDay());
                          setStartDate(startOfWeek.toISOString().split('T')[0]);
                          setEndDate(todayStr);
                        } else if (e.target.value === 'This Month') {
                          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                          setStartDate(startOfMonth.toISOString().split('T')[0]);
                          setEndDate(todayStr);
                        }
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #9CAF88',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        color: '#4A6741',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>Custom Range</option>
                    </select>
                    
                    {dateRange === 'Custom Range' && (
                      <>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #9CAF88',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            color: '#4A6741',
                            outline: 'none'
                          }}
                        />
                        <span style={{ color: '#4A6741', fontSize: '12px' }}>to</span>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #9CAF88',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            color: '#4A6741',
                            outline: 'none'
                          }}
                        />
                      </>
                    )}
                  </div>
                  
                  {/* Branch Selector */}
                  <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid #9CAF88',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '14px',
                      color: '#4A6741',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option>Both Branches</option>
                    <option>Mayon Branch</option>
                    <option>One Balete Branch</option>
                  </select>
                </div>
              </div>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    {currentBranchData.showSeparateBranches ? (
                      <>
                        <tr style={{ borderBottom: '2px solid rgba(156,175,136,0.3)' }}>
                          <th rowSpan={2} style={{ textAlign: 'left', padding: '12px 8px', color: '#006400', fontWeight: '600', verticalAlign: 'bottom', borderRight: '1px solid rgba(156,175,136,0.3)' }}>Department</th>
                          <th colSpan={3} style={{ textAlign: 'center', padding: '12px 8px', color: '#006400', fontWeight: '600', borderRight: '1px solid rgba(156,175,136,0.3)' }}>Mayon Branch</th>
                          <th colSpan={3} style={{ textAlign: 'center', padding: '12px 8px', color: '#006400', fontWeight: '600' }}>One Balete Branch</th>
                        </tr>
                        <tr style={{ borderBottom: '2px solid rgba(156,175,136,0.3)' }}>
                          <th style={{ textAlign: 'center', padding: '8px 4px', color: '#006400', fontWeight: '500', fontSize: '14px' }}>Sales</th>
                          <th style={{ textAlign: 'center', padding: '8px 4px', color: '#006400', fontWeight: '500', fontSize: '14px' }}>Expenses</th>
                          <th style={{ textAlign: 'center', padding: '8px 4px', color: '#006400', fontWeight: '500', fontSize: '14px', borderRight: '1px solid rgba(156,175,136,0.3)' }}>Net</th>
                          <th style={{ textAlign: 'center', padding: '8px 4px', color: '#006400', fontWeight: '500', fontSize: '14px' }}>Sales</th>
                          <th style={{ textAlign: 'center', padding: '8px 4px', color: '#006400', fontWeight: '500', fontSize: '14px' }}>Expenses</th>
                          <th style={{ textAlign: 'center', padding: '8px 4px', color: '#006400', fontWeight: '500', fontSize: '14px' }}>Net</th>
                        </tr>
                      </>
                    ) : (
                      <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.3)' }}>
                        <th style={{ textAlign: 'left', padding: '12px 0', color: '#ffffff', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Department</th>
                        <th style={{ textAlign: 'right', padding: '12px 0', color: '#ffffff', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Sales</th>
                        <th style={{ textAlign: 'right', padding: '12px 0', color: '#ffffff', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Expenses</th>
                        <th style={{ textAlign: 'right', padding: '12px 0', color: '#ffffff', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Net</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {currentBranchData.departments.map((row, index) => (
                      <tr 
                        key={index}
                        style={{
                          borderBottom: '1px solid rgba(156,175,136,0.2)',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLTableRowElement;
                          target.style.backgroundColor = 'rgba(156,175,136,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLTableRowElement;
                          target.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td style={{ padding: '12px 8px', color: '#4A6741', borderRight: currentBranchData.showSeparateBranches ? '1px solid rgba(156,175,136,0.2)' : 'none' }}>{row.dept}</td>
                        {currentBranchData.showSeparateBranches ? (
                          <>
                            <td style={{ textAlign: 'center', padding: '12px 4px', color: '#006400', fontWeight: '500' }}>{(row as any).mayon.sales}</td>
                            <td style={{ textAlign: 'center', padding: '12px 4px', color: '#D32F2F', fontWeight: '500' }}>{(row as any).mayon.expenses}</td>
                            <td style={{ textAlign: 'center', padding: '12px 4px', color: '#2E7D32', fontWeight: 'bold', borderRight: '1px solid rgba(156,175,136,0.2)' }}>{(row as any).mayon.net}</td>
                            <td style={{ textAlign: 'center', padding: '12px 4px', color: '#006400', fontWeight: '500' }}>{(row as any).balete.sales}</td>
                            <td style={{ textAlign: 'center', padding: '12px 4px', color: '#D32F2F', fontWeight: '500' }}>{(row as any).balete.expenses}</td>
                            <td style={{ textAlign: 'center', padding: '12px 4px', color: '#2E7D32', fontWeight: 'bold' }}>{(row as any).balete.net}</td>
                          </>
                        ) : (
                          <>
                            <td style={{ textAlign: 'right', padding: '12px 0', color: '#006400', fontWeight: '500' }}>{(row as any).sales}</td>
                            <td style={{ textAlign: 'right', padding: '12px 0', color: '#D32F2F', fontWeight: '500' }}>{(row as any).expenses}</td>
                            <td style={{ textAlign: 'right', padding: '12px 0', color: '#2E7D32', fontWeight: 'bold' }}>{(row as any).net}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: 'rgba(156,175,136,0.2)', fontWeight: 'bold' }}>
                      <td style={{ padding: '16px 8px', color: '#006400', borderRight: currentBranchData.showSeparateBranches ? '1px solid rgba(156,175,136,0.3)' : 'none' }}>📊 Total</td>
                      {currentBranchData.showSeparateBranches ? (
                        <>
                          <td style={{ textAlign: 'center', padding: '16px 4px', color: '#006400' }}>{(currentBranchData.totals as any).mayon.sales}</td>
                          <td style={{ textAlign: 'center', padding: '16px 4px', color: '#D32F2F' }}>{(currentBranchData.totals as any).mayon.expenses}</td>
                          <td style={{ textAlign: 'center', padding: '16px 4px', color: '#2E7D32', fontSize: '16px', borderRight: '1px solid rgba(156,175,136,0.3)' }}>{(currentBranchData.totals as any).mayon.net}</td>
                          <td style={{ textAlign: 'center', padding: '16px 4px', color: '#006400' }}>{(currentBranchData.totals as any).balete.sales}</td>
                          <td style={{ textAlign: 'center', padding: '16px 4px', color: '#D32F2F' }}>{(currentBranchData.totals as any).balete.expenses}</td>
                          <td style={{ textAlign: 'center', padding: '16px 4px', color: '#2E7D32', fontSize: '16px' }}>{(currentBranchData.totals as any).balete.net}</td>
                        </>
                      ) : (
                        <>
                          <td style={{ textAlign: 'right', padding: '16px 0', color: '#006400' }}>{(currentBranchData.totals as any).sales}</td>
                          <td style={{ textAlign: 'right', padding: '16px 0', color: '#D32F2F' }}>{(currentBranchData.totals as any).expenses}</td>
                          <td style={{ textAlign: 'right', padding: '16px 0', color: '#2E7D32', fontSize: '18px' }}>{(currentBranchData.totals as any).net}</td>
                        </>
                      )}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Action Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}
            >
              {[
                { icon: '💼', title: 'Daily Reports', desc: 'Generate sales reports', color: '#9CAF88', path: '/sales' },
                { icon: '📦', title: 'Inventory', desc: 'Manage stock levels', color: '#4A6741', path: '/inventory' },
                { icon: '🍳', title: 'Production', desc: 'Food preparation', color: '#006400', path: '/production' },
                { icon: '🛒', title: 'Purchases', desc: 'Supplier orders', color: '#9CAF88', path: '/purchases' },
                { icon: '📊', title: 'Reports', desc: 'Analytics & insights', color: '#FF6B35', path: '/reports' }
              ].map((action, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    // Navigate to the respective page
                    window.location.href = action.path;
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${action.color}, ${action.color}DD)`,
                    borderRadius: '16px',
                    padding: '24px',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 8px 20px ${action.color}40`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.transform = 'translateY(-4px) scale(1.02)';
                    target.style.boxShadow = `0 15px 35px ${action.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.transform = 'translateY(0) scale(1)';
                    target.style.boxShadow = `0 8px 20px ${action.color}40`;
                  }}
                >
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ fontSize: '32px' }}>{action.icon}</div>
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}
                    >
                      →
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 0 8px 0' }}>{action.title}</h3>
                  <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>{action.desc}</p>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(156,175,136,0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  background: 'linear-gradient(135deg, rgba(156,175,136,0.1), rgba(74,103,65,0.08))',
                  borderRadius: '20px',
                  zIndex: -1
                }}
              />
              
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '20px'
                }}
              >
                <h3 
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#006400',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  🎯 Recent Activities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: '✓', iconBg: '#4CAF50', title: 'Daily report submitted', desc: 'Mayon Branch • 2 hours ago', action: () => window.location.href = '/sales' },
                    { icon: '📊', iconBg: '#2196F3', title: 'Inventory updated', desc: 'One Balete Branch • 4 hours ago', action: () => window.location.href = '/inventory' },
                    { icon: '🍳', iconBg: '#FF9800', title: 'Production completed', desc: 'Kitchen • 6 hours ago', action: () => window.location.href = '/production' }
                  ].map((activity, index) => (
                    <div 
                      key={index}
                      onClick={activity.action}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        background: 'rgba(156,175,136,0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(156,175,136,0.2)',
                        transition: 'background-color 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget as HTMLDivElement;
                        target.style.backgroundColor = 'rgba(156,175,136,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget as HTMLDivElement;
                        target.style.backgroundColor = 'rgba(156,175,136,0.1)';
                      }}
                    >
                      <div 
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: activity.iconBg,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        {activity.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: '#006400', fontWeight: '600', margin: '0 0 4px 0' }}>{activity.title}</p>
                        <p style={{ color: '#4A6741', fontSize: '14px', margin: 0 }}>{activity.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
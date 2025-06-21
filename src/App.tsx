/// <reference types="react" />
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Dashboard } from './components/Dashboard.js'
import { Login } from './components/Login.js'
import { LandingPage } from './components/LandingPage.js'
import { User } from './types/types.js'
import logo from './logo.png'
import styles from './App.module.css'
// import './index.css'

function AddExpensePage({ user, onLogout, onUserUpdate }: any) {
  return <Dashboard user={user} onLogout={onLogout} onUserUpdate={onUserUpdate} section="add" />;
}
function SummaryPage({ user, onLogout, onUserUpdate }: any) {
  return <Dashboard user={user} onLogout={onLogout} onUserUpdate={onUserUpdate} section="summary" />;
}
function RecentExpensesPage({ user, onLogout, onUserUpdate }: any) {
  return <Dashboard user={user} onLogout={onLogout} onUserUpdate={onUserUpdate} section="recent" />;
}
function ProfilePage({ user, onLogout, onUserUpdate }: any) {
  return <Dashboard user={user} onLogout={onLogout} onUserUpdate={onUserUpdate} section="profile" />;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('spendSutraCurrentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [authMode, setAuthMode] = useState<'welcome' | 'login' | 'signup'>('welcome');

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem('spendSutraCurrentUser', JSON.stringify(user));
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setAuthMode('welcome');
    localStorage.removeItem('spendSutraCurrentUser');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('spendSutraCurrentUser', JSON.stringify(updatedUser));
  };

  const handleAuthModeSelect = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
  };

  if (!currentUser) {
    if (authMode === 'welcome') {
      return <LandingPage onSelect={handleAuthModeSelect} />;
    }
    return <Login onLogin={handleLogin} initialMode={authMode} />;
  }

  return (
    <Router>
      <div className={styles.bodyPad}>
        <Routes>
          <Route path="/add" element={<AddExpensePage user={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />} />
          <Route path="/summary" element={<SummaryPage user={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />} />
          <Route path="/recent" element={<RecentExpensesPage user={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />} />
          <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />} />
          <Route path="*" element={<Navigate to="/add" />} />
        </Routes>
      </div>
    </Router>
  );
}
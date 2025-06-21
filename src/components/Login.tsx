import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card.js"
import { Button } from "../components/ui/button.js"
import { Input } from "../components/ui/input.js"
// import { Label } from "@/components/ui/label"
import { Label } from "../components/ui/label.js"
import { useNotification } from './Notification.js'
import { database } from '../lib/database.js'
import { User, CURRENCIES } from '../types/types.js'
import styles from "./Login.module.css"

export function Login({ onLogin, initialMode }: { onLogin: (user: User) => void, initialMode?: 'login' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [currency, setCurrency] = useState('USD')
  const { showNotification, Notification } = useNotification()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      if (!firstName || !lastName || !phone || !currency) {
        showNotification('Please fill in all fields', 'error')
        return
      }
      if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error')
        return
      }
      if (database.getUserByEmail(email)) {
        showNotification('Email already exists', 'error')
        return
      }
      const newUser = database.createUser(email, password, firstName, lastName, phone, currency)
      showNotification('Account created successfully!', 'success')
      onLogin(newUser)
    } else {
      const user = database.getUserByEmail(email)
      if (!user || user.password !== password) {
        showNotification('Invalid email or password', 'error')
        return
      }
      showNotification('Logged in successfully!', 'success')
      onLogin(user)
    }
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) {
      showNotification('Please enter your email', 'error')
      return
    }
    const user = database.getUserByEmail(forgotEmail)
    if (!user) {
      showNotification('No account found with that email', 'error')
      return
    }
    showNotification('Password reset link sent to your email!', 'success')
    setShowForgot(false)
    setForgotEmail('')
  }

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          {/* Finance/User Icon */}
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 48, height: 48, color: '#6366f1' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 12c-3.038 0-5.5-2.462-5.5-5.5h11c0 3.038-2.462 5.5-5.5 5.5z" />
            </svg>
          </div>
          <CardTitle className={styles.title}>
            {isSignUp ? 'Create an Account' : 'Welcome to SpendSutra'}
          </CardTitle>
          <CardDescription className={styles.description}>
            {isSignUp ? 'Start tracking your expenses' : 'Track your expenses and predict future spending'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Notification />
          {showForgot ? (
            <form onSubmit={handleForgotPassword} className={styles.form}>
              <Label htmlFor="forgotEmail">Enter your email to reset password</Label>
              <Input
                id="forgotEmail"
                type="email"
                placeholder="your@email.com"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              <Button type="submit">Send Reset Link</Button>
              <Button type="button" onClick={() => setShowForgot(false)} style={{ background: '#e5e7eb', color: '#1e293b' }}>Back to Login</Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {isSignUp && (
                <>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className={styles.relative}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {/* Mail Icon */}
                  <span className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.789l-7.5 5.625a2.25 2.25 0 01-2.748 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75" />
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password *</Label>
                <div className={styles.relative}>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  {/* Lock Icon */}
                  <span className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m12 0a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25h-12A2.25 2.25 0 013 18.75v-6A2.25 2.25 0 015.25 10.5m12 0h-12" />
                    </svg>
                  </span>
                  {/* Eye Icon for toggling password visibility */}
                  <span className={styles.eyeIcon} onClick={() => setShowPassword(v => !v)}>
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5c4.5 0 8.25 3 9.75 7.5-1.5 4.5-5.25 7.5-9.75 7.5-4.5 0-8.25-3-9.75-7.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12c1.5 4.5 5.25 7.5 9.75 7.5 2.042 0 3.97-.495 5.602-1.377M6.223 6.223A10.477 10.477 0 0112 4.5c4.5 0 8.25 3 9.75 7.5-.386 1.158-.972 2.24-1.738 3.193M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    )}
                  </span>
                </div>
                {!isSignUp && (
                  <div style={{ textAlign: 'right', marginTop: '0.25rem' }}>
                    <button type="button" style={{ background: 'none', border: 'none', color: '#6366f1', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => setShowForgot(true)}>
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className={styles.relative}>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    {/* Lock Icon */}
                    <span className={styles.inputIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 20, height: 20 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m12 0a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25h-12A2.25 2.25 0 013 18.75v-6A2.25 2.25 0 015.25 10.5m12 0h-12" />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
              {isSignUp && (
                <>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency *</Label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      required
                      style={{ width: '100%', borderRadius: 8, border: '1.5px solid #e0e7ff', padding: '0.6rem 1rem', fontSize: '1rem', background: '#f8fafc', marginTop: 4 }}
                    >
                      {CURRENCIES.map(cur => (
                        <option key={cur.code} value={cur.code}>{cur.label} ({cur.symbol})</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <Button type="submit">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>
          )}
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: '0.875rem' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              style={{ textDecoration: 'underline', color: '#6366f1', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
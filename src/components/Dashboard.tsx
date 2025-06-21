import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card.js"
import { Button } from "../components/ui/button.js"
import { Input } from "../components/ui/input.js"
import { Label } from "../components/ui/label.js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.js"
import { ArrowRight, Calendar, Clock, Home, BarChart, List, User as UserIcon, LogOut, Utensils, Car, Home as HomeIcon, Music, Plug, HeartPulse, CircleHelp } from "lucide-react"
import { useNotification } from './Notification.js'
import { database } from '../lib/database.js'
import { User, Expense, categories, CURRENCIES } from '../types/types.js'
import styles from "./Dashboard.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../logo.png'

const categoryIcons: Record<string, JSX.Element> = {
  food: <Utensils style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
  transportation: <Car style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
  housing: <HomeIcon style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
  entertainment: <Music style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
  utilities: <Plug style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
  health: <HeartPulse style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
  other: <CircleHelp style={{ marginRight: 6, color: '#6366f1' }} size={18} />,
};

export function Dashboard({ user, onLogout, section }: { user: User, onLogout: () => void, section?: string }) {
  const [expenses, setExpenses] = useState<Expense[]>(user.expenses)
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: ''
  })
  const [prediction, setPrediction] = useState<number | null>(null)
  const { showNotification, Notification } = useNotification()
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [address, setAddress] = useState(user.address || '')
  const [bio, setBio] = useState(user.bio || '')
  const [photoError, setPhotoError] = useState('')
  const currency = CURRENCIES.find(c => c.code === user.currency)
  const currencySymbol = currency?.symbol || '$'
  const currencyCode = currency?.code || 'USD'
  const navigate = useNavigate()

  useEffect(() => {
    const updatedUser = { ...user, expenses }
    database.updateUser(updatedUser)
    calculatePrediction()
  }, [expenses])

  useEffect(() => {
    // Load profile photo from localStorage
    const photo = localStorage.getItem(`profilePhoto_${user.id}`)
    if (photo) setProfilePhoto(photo)
  }, [user.id])

  const calculatePrediction = () => {
    if (expenses.length < 2) {
      setPrediction(null)
      return
    }
    const recentExpenses = [...expenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
    const total = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    setPrediction(total / recentExpenses.length)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) {
      showNotification('Please fill in all required fields', 'error')
      return
    }
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: new Date().toISOString().split('T')[0]
    }
    setExpenses(prev => [...prev, newExpense])
    setFormData({ amount: '', category: '', description: '' })
    showNotification('Expense added successfully', 'success')
  }

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const getCategoryTotals = () => {
    const totals: Record<string, number> = {}
    
    categories.forEach((cat: typeof categories[number]) => {
      totals[cat.value] = expenses
        .filter(e => e.category === cat.value)
        .reduce((sum, expense) => sum + expense.amount, 0)
    })

    return totals
  }

  const categoryTotals = getCategoryTotals()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError('')
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setPhotoError('Only image files are allowed.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('Image must be less than 2MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfilePhoto(reader.result)
        localStorage.setItem(`profilePhoto_${user.id}`, reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setProfilePhoto(null)
    localStorage.removeItem(`profilePhoto_${user.id}`)
  }

  const handleProfileSave = () => {
    // Save address and bio to user profile (localStorage or backend)
    const updatedUser = { ...user, address, bio }
    localStorage.setItem('spendSutraCurrentUser', JSON.stringify(updatedUser))
    // Optionally update in your user DB as well
    showNotification('Profile updated!', 'success')
    setShowProfileSettings(false)
  }

  return (
    <div className={styles.root}>
      <nav className={styles.navbar}>
        <img src={logo} alt="SpendSutra Logo" className={styles.logo} />
        <div className={styles.navLinks}>
          <NavLink to="/add" className={({ isActive }) => isActive ? styles.navlink + ' ' + styles.active : styles.navlink}>
            <Home className={styles.navIcon} />
            <span className={styles.navText}>Add Expense</span>
          </NavLink>
          <NavLink to="/summary" className={({ isActive }) => isActive ? styles.navlink + ' ' + styles.active : styles.navlink}>
            <BarChart className={styles.navIcon} />
            <span className={styles.navText}>Summary</span>
          </NavLink>
          <NavLink to="/recent" className={({ isActive }) => isActive ? styles.navlink + ' ' + styles.active : styles.navlink}>
            <List className={styles.navIcon} />
            <span className={styles.navText}>Recent Expenses</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? styles.navlink + ' ' + styles.active : styles.navlink}>
            <UserIcon className={styles.navIcon} />
            <span className={styles.navText}>Profile</span>
          </NavLink>
        </div>
        <div className={styles.navRight}>
          <div className={styles.profileNav}>
            <div className={styles.profilePhotoBox}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className={styles.profilePhoto} />
              ) : (
                <div className={styles.profileInitial}>
                  {user.firstName ? user.firstName[0].toUpperCase() : ''}
                </div>
              )}
            </div>
            <span className={styles.userName}>{user.firstName} {user.lastName}</span>
            <button onClick={() => { onLogout(); navigate('/add'); }} className={styles.logoutBtn}>
              <LogOut className={styles.navIcon} />
              <span className={styles.navText}>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.fadeInModal} style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', maxWidth: 400, width: '100%' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Profile Settings</h2>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>Profile Photo:</label><br />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              {photoError && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{photoError}</div>}
            </div>
            {profilePhoto && (
              <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={profilePhoto} alt="Profile Preview" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e7ff', marginBottom: 8 }} />
                <Button type="button" onClick={handleRemovePhoto} style={{ background: '#f87171', color: '#fff', fontSize: 14, padding: '0.4rem 0.8rem', marginBottom: 8 }}>Remove Photo</Button>
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>Address:</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Your address" style={{ width: '100%', borderRadius: 8, border: '1px solid #e0e7ff', padding: '0.5rem', marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>Bio:</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself" style={{ width: '100%', borderRadius: 8, border: '1px solid #e0e7ff', padding: '0.5rem', minHeight: 60, marginTop: 4, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button type="button" onClick={handleProfileSave} style={{ marginTop: 8 }}>Save</Button>
              <Button type="button" onClick={() => setShowProfileSettings(false)} style={{ marginTop: 8, background: '#e0e7ff', color: '#3730a3' }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        {(!section || section === 'add') && (
          <Card className={styles.expenseFormCard}>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
              <CardDescription>Track your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <Notification />
              <form onSubmit={handleSubmit} className={styles.expenseForm}>
                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className={styles.expenseFormInput}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category: typeof categories[number]) => (
                        <SelectItem key={category.value} value={category.value}>
                          <span className={styles.categoryLabel}>{categoryIcons[category.value]}{category.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="What was this expense for?"
                    className={styles.expenseFormInput}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Expense
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        {(!section || section === 'summary') && (
          <Card className={styles.summaryCard} style={{ marginTop: 32 }}>
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
              <CardDescription>Overview of your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.summaryGrid}>
                <div className="space-y-2">
                  <div className={styles.summaryItem}>
                    <span className="text-sm font-medium">Total Expenses</span>
                    <span className="text-lg font-bold">{currencySymbol}{getTotalExpenses().toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className="text-sm font-medium">Number of Expenses</span>
                    <span className="text-lg font-bold">{expenses.length}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={styles.summaryItem}>
                    <span className="text-sm font-medium">Average Expense</span>
                    <span className="text-lg font-bold">
                      {expenses.length > 0 
                        ? `${currencySymbol}${(getTotalExpenses() / expenses.length).toFixed(2)}` 
                        : `${currencySymbol}0.00`}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className="text-sm font-medium">Last Expense</span>
                    <span className="text-lg font-bold">
                      {expenses.length > 0 
                        ? `${currencySymbol}${expenses[expenses.length - 1].amount.toFixed(2)}` 
                        : 'None'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">By Category</h3>
                <div className="space-y-2">
                  {categories.map((category: typeof categories[number]) => (
                    <div key={category.value} className={styles.summaryItem}>
                      <span className="text-sm">{category.label}</span>
                      <span className="font-medium">{currencySymbol}{categoryTotals[category.value].toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {section === 'recent' && (
          <Card className={styles.recentExpenses}>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Your most recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {[...expenses]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map(expense => (
                    <div key={expense.id} className={styles.expenseItem}>
                      <div className={styles.expenseInfo}>
                        <div className={styles.expenseIcon}>
                          {categoryIcons[expense.category] || <CircleHelp className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">
                            <span className={styles.categoryLabel}>
                              {categoryIcons[expense.category] || <CircleHelp className="h-5 w-5" />}
                              {categories.find((c: typeof categories[number]) => c.value === expense.category)?.label || 'Other'}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {expense.description || 'No description'}
                          </p>
                        </div>
                      </div>
                      <div className={styles.expenseAmount}>
                        <p className={styles.expenseAmount}>{currencySymbol}{expense.amount.toFixed(2)}</p>
                        <p className={styles.expenseDate}>{expense.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
        {section === 'profile' && (
          <Card className={styles.profileCard}>
            <CardHeader style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div className={styles.profilePhotoBox} style={{ width: 80, height: 80, marginBottom: 8 }}>
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className={styles.profilePhoto} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <div className={styles.profileInitial} style={{ fontSize: 32 }}>
                    {user.firstName ? user.firstName[0].toUpperCase() : ''}
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ marginBottom: 8 }} />
              {photoError && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{photoError}</div>}
              {profilePhoto && (
                <Button type="button" onClick={handleRemovePhoto} style={{ background: '#f87171', color: '#fff', fontSize: 14, padding: '0.4rem 0.8rem', marginBottom: 8 }}>Remove Photo</Button>
              )}
              <Input
                value={user.firstName}
                onChange={e => setAddress(e.target.value)}
                placeholder="First Name"
                style={{ marginBottom: 8, width: '100%' }}
                disabled
              />
              <Input
                value={user.lastName}
                onChange={e => setAddress(e.target.value)}
                placeholder="Last Name"
                style={{ marginBottom: 8, width: '100%' }}
                disabled
              />
              <Input
                value={user.email}
                placeholder="Email"
                style={{ marginBottom: 8, width: '100%' }}
                disabled
              />
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ width: '100%', maxWidth: 340 }}>
                <div style={{ marginBottom: 12 }}>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Phone Number"
                    style={{ marginBottom: 8, width: '100%' }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={user.currency} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Your address"
                    style={{ marginBottom: 8, width: '100%' }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    style={{ width: '100%', borderRadius: 8, border: '1px solid #e0e7ff', padding: '0.5rem', minHeight: 60, marginTop: 4, resize: 'vertical' }}
                  />
                </div>
                <Button type="button" onClick={handleProfileSave} style={{ marginTop: 8, width: '100%' }}>Save</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
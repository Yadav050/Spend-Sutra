import { User } from '../types/types.js'

export const database = {
  getUsers: (): User[] => {
    const users = localStorage.getItem('spendSutraUsers')
    return users ? JSON.parse(users) : []
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem('spendSutraUsers', JSON.stringify(users))
  },

  getUserByEmail: (email: string): User | undefined => {
    return database.getUsers().find(user => user.email === email)
  },

  createUser: (email: string, password: string, firstName: string, lastName: string, phone: string, currency: string): User => {
    const users = database.getUsers()
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      firstName,
      lastName,
      phone,
      currency,
      expenses: []
    }
    database.saveUsers([...users, newUser])
    return newUser
  },

  updateUser: (updatedUser: User) => {
    const users = database.getUsers().filter(user => user.id !== updatedUser.id)
    database.saveUsers([...users, updatedUser])
  }
}
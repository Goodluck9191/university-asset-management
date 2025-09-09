// src/services/authService.js
// Frontend-only authentication service using localStorage

// Sample users data structure
const SAMPLE_USERS = [
  {
    userId: 1,
    name: 'System Administrator',
    email: 'admin@university.edu',
    password: 'admin123',
    role: 'admin',
    avatar: 'A',
    department: 'IT Department',
    createdAt: '2024-01-01'
  },
  {
    userId: 2,
    name: 'Professor John Smith',
    email: 'prof@university.edu',
    password: 'professor123',
    role: 'professor',
    avatar: 'P',
    department: 'Computer Science',
    createdAt: '2024-01-15'
  },
  {
    userId: 3,
    name: 'Staff Member',
    email: 'staff@university.edu',
    password: 'staff123',
    role: 'staff',
    avatar: 'S',
    department: 'Administration',
    createdAt: '2024-02-01'
  }
];

export const authService = {
  // Login function
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get users from localStorage or use sample data
    const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(SAMPLE_USERS));
    
    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Create user session (without password)
    const userSession = { ...user };
    delete userSession.password;
    
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    localStorage.setItem('isAuthenticated', 'true');
    
    return userSession;
  },

  // Register function
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(SAMPLE_USERS));
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }
    
    // Create new user
    const newUser = {
      userId: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      avatar: userData.name.charAt(0).toUpperCase(),
      department: 'General',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to users array and save
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Create user session (without password)
    const userSession = { ...newUser };
    delete userSession.password;
    
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    localStorage.setItem('isAuthenticated', 'true');
    
    return userSession;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // Get all users (for admin purposes)
  getAllUsers: () => {
    const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(SAMPLE_USERS));
    return users.map(user => {
      const userCopy = { ...user };
      delete userCopy.password;
      return userCopy;
    });
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(SAMPLE_USERS));
    const userIndex = users.findIndex(u => u.userId === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user
    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user if it's the same user
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.userId === userId) {
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    }
    
    return users[userIndex];
  }
};
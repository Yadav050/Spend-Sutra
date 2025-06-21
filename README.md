# 💰 SpendSutra - Intelligent Expense Tracker

A modern, responsive expense tracking application built with React, TypeScript, and Vite. SpendSutra helps users track expenses, analyze spending patterns, and predict future expenses with AI-powered insights.

## ✨ Features

- **📊 Smart Analytics**: Detailed insights into spending patterns with beautiful charts
- **🔮 Expense Prediction**: AI-powered predictions for budget planning
- **🔒 Secure & Private**: Encrypted data storage on your device
- **📱 Mobile First**: Responsive design optimized for all devices
- **⚡ Lightning Fast**: Instant expense tracking with real-time updates
- **👨‍👩‍👧‍👦 Family Sharing**: Share expenses with family members

## 🚀 Live Demo

[Add your deployed link here]

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Data Storage**: LocalStorage (can be extended to backend)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spend-sutra.git
   cd spend-sutra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Key Features

### Landing Page
- Beautiful animated entry sequence
- Modern, responsive design
- Professional dark navbar
- Feature highlights and benefits

### Authentication
- User registration and login
- Secure password handling
- Profile management
- Currency selection

### Expense Tracking
- Add expenses with categories
- Real-time expense tracking
- Category-wise analysis
- Date-based filtering

### Analytics & Reports
- Total expense overview
- Category-wise breakdown
- Average expense calculation
- Recent expense history

### User Profile
- Profile photo upload
- Personal information management
- Address and bio updates
- Currency preferences

## 📱 Screenshots

[Add screenshots of your application here]

## 🏗️ Project Structure

```
spend-sutra/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Main dashboard component
│   │   ├── LandingPage.tsx        # Landing page with animations
│   │   ├── Login.tsx              # Authentication component
│   │   ├── Notification.tsx       # Notification system
│   │   └── ui/                    # Reusable UI components
│   ├── lib/
│   │   └── database.ts            # Local storage database
│   ├── types/
│   │   └── types.ts               # TypeScript type definitions
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # App entry point
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Dark Theme**: Elegant dark navbar and modern styling
- **Smooth Animations**: Beautiful entry animations and transitions
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔧 Customization

### Adding New Categories
Edit `src/types/types.ts` to add new expense categories:
```typescript
export const categories = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transportation', label: 'Transportation' },
  // Add your custom categories here
];
```

### Changing Colors
Update the CSS variables in your component files to match your brand colors.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Design inspiration from modern expense tracker applications
- Built with [Vite](https://vitejs.dev/) for fast development

---

⭐ **Star this repository if you found it helpful!** 
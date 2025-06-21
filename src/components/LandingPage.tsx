import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Shield, Smartphone, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';
import logo from '../logo.png';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onSelect: (mode: 'login' | 'signup') => void;
}

export function LandingPage({ onSelect }: LandingPageProps) {
  const [showEntryAnimation, setShowEntryAnimation] = useState(true);
  const [logoMoved, setLogoMoved] = useState(false);

  useEffect(() => {
    // Start the entry animation sequence
    const timer1 = setTimeout(() => {
      setLogoMoved(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setShowEntryAnimation(false);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const features = [
    {
      icon: <BarChart3 size={32} />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with beautiful charts and reports"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Expense Prediction",
      description: "AI-powered predictions help you plan your budget and avoid overspending"
    },
    {
      icon: <Shield size={32} />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and stored securely on your device"
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile First",
      description: "Optimized for mobile devices with a responsive design that works everywhere"
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      description: "Instant expense tracking with real-time updates and notifications"
    },
    {
      icon: <Users size={32} />,
      title: "Family Sharing",
      description: "Share expenses with family members and track group spending"
    }
  ];

  const benefits = [
    "Track expenses in real-time",
    "Categorize spending automatically",
    "Generate detailed reports",
    "Set budget limits and alerts",
    "Export data to CSV/PDF",
    "Multi-currency support"
  ];

  return (
    <div className={styles.landingPage}>
      {/* Entry Animation Overlay */}
      {showEntryAnimation && (
        <div className={styles.entryAnimation}>
          <div className={`${styles.entryContent} ${logoMoved ? styles.moveToNav : ''}`}>
            <img
              src={logo}
              alt="SpendSutra"
              className={styles.entryLogo}
            />
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className={`${styles.navbar} ${logoMoved ? styles.navbarVisible : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logoSection}>
            <img src={logo} alt="SpendSutra" className={styles.logo} />
            <span className={styles.logoText}>SpendSutra</span>
          </div>
          <div className={styles.navActions}>
            <button 
              className={styles.loginBtn}
              onClick={() => onSelect('login')}
            >
              Login
            </button>
            <button 
              className={styles.signupBtn}
              onClick={() => onSelect('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.hero} ${!showEntryAnimation ? styles.heroVisible : ''}`}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Take Control of Your
              <span className={styles.highlight}> Financial Future</span>
            </h1>
            <p className={styles.heroDescription}>
              SpendSutra is your intelligent expense tracker that helps you understand your spending habits, 
              predict future expenses, and achieve your financial goals with ease.
            </p>
            <div className={styles.heroActions}>
              <button 
                className={styles.ctaButton}
                onClick={() => onSelect('signup')}
              >
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button className={styles.demoButton}>
                Watch Demo
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Active Users</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>$2M+</span>
                <span className={styles.statLabel}>Tracked Expenses</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.9★</span>
                <span className={styles.statLabel}>User Rating</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.appMockup}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupDots}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              </div>
              <div className={styles.mockupContent}>
                <div className={styles.mockupChart}>
                  <div className={styles.chartBar} style={{ height: '60%' }}></div>
                  <div className={styles.chartBar} style={{ height: '80%' }}></div>
                  <div className={styles.chartBar} style={{ height: '45%' }}></div>
                  <div className={styles.chartBar} style={{ height: '90%' }}></div>
                  <div className={styles.chartBar} style={{ height: '70%' }}></div>
                </div>
                <div className={styles.mockupText}>
                  <div className={styles.mockupTitle}>Monthly Overview</div>
                  <div className={styles.mockupAmount}>$2,450.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`${styles.features} ${!showEntryAnimation ? styles.featuresVisible : ''}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose SpendSutra?</h2>
            <p className={styles.sectionDescription}>
              Powerful features designed to make expense tracking simple, insightful, and secure.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`${styles.benefits} ${!showEntryAnimation ? styles.benefitsVisible : ''}`}>
        <div className={styles.container}>
          <div className={styles.benefitsContent}>
            <div className={styles.benefitsText}>
              <h2 className={styles.benefitsTitle}>
                Everything you need to manage your expenses
              </h2>
              <p className={styles.benefitsDescription}>
                From simple expense tracking to advanced analytics, SpendSutra provides all the tools 
                you need to take control of your finances.
              </p>
              <div className={styles.benefitsList}>
                {benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <CheckCircle size={20} className={styles.checkIcon} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <button 
                className={styles.benefitsCta}
                onClick={() => onSelect('signup')}
              >
                Start Tracking Today
                <ArrowRight size={20} />
              </button>
            </div>
            <div className={styles.benefitsVisual}>
              <div className={styles.benefitsImage}>
                <div className={styles.floatingCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardAvatar}></div>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardName}>Coffee Shop</div>
                      <div className={styles.cardDate}>Today, 2:30 PM</div>
                    </div>
                  </div>
                  <div className={styles.cardAmount}>-$4.50</div>
                </div>
                <div className={styles.floatingCard} style={{ transform: 'translateY(20px) translateX(20px)' }}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardAvatar}></div>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardName}>Grocery Store</div>
                      <div className={styles.cardDate}>Yesterday, 6:15 PM</div>
                    </div>
                  </div>
                  <div className={styles.cardAmount}>-$67.80</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.cta} ${!showEntryAnimation ? styles.ctaVisible : ''}`}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to transform your financial life?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of users who are already taking control of their expenses with SpendSutra.
            </p>
            <button 
              className={styles.ctaButton}
              onClick={() => onSelect('signup')}
            >
              Get Started Free
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${styles.footer} ${!showEntryAnimation ? styles.footerVisible : ''}`}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>
                <img src={logo} alt="SpendSutra" className={styles.footerLogoImg} />
                <span>SpendSutra</span>
              </div>
              <p className={styles.footerDescription}>
                Your intelligent expense tracker for a better financial future.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#security">Security</a>
              </div>
              <div className={styles.footerColumn}>
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <a href="#careers">Careers</a>
              </div>
              <div className={styles.footerColumn}>
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#docs">Documentation</a>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 SpendSutra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Mail, Download, Smartphone, 
  ShieldCheck, Compass, Landmark, 
  Sparkles, Youtube, Play, Globe, Star, MapPin, Users, Bot, ArrowRight, Menu, X, MessageCircle
} from 'lucide-react';

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const playStoreLink = "https://play.google.com/store/apps/details?id=com.bharathdarshika.app";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.statusBar}></div>
      
      {/* --- 📱 MOBILE STICKY DOWNLOAD BAR (Fixed Condition) --- */}
      <AnimatePresence>
        {isScrolled && isMobile && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} style={styles.stickyMobileCta}>
            <a href={playStoreLink} target="_blank" rel="noopener noreferrer" style={styles.mobileCtaBtn}>
              <Download size={18} /> Install App & Explore
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 🚀 GLASSMORPHIC NAVBAR --- */}
      <nav style={{
        ...styles.nav, 
        backgroundColor: (isScrolled || isMobileMenuOpen) ? 'rgba(255,255,255,0.95)' : 'transparent', 
        borderBottom: (isScrolled || isMobileMenuOpen) ? '1px solid #E2E8F0' : '1px solid transparent'
      }}>
        <div style={styles.navContent}>
          <div style={styles.brandGroup}>
            <motion.span animate={{ rotateY: 360 }} transition={{ duration: 3, repeat: Infinity }} style={{fontSize: '1.8rem'}}>🚩</motion.span>
            <h2 style={{...styles.logo, color: (isScrolled || isMobileMenuOpen) ? '#0F172A' : '#fff'}}>Bharath <span style={{color: '#FF7A00'}}>Darshika</span></h2>
          </div>
          
          <div style={styles.desktopNav}>
            <a href="#features" style={{...styles.link, color: isScrolled ? '#1E293B' : '#CBD5E1'}}>Features</a>
            <Link to="/privacy" style={{...styles.link, color: isScrolled ? '#1E293B' : '#CBD5E1'}}>Privacy</Link>
            <motion.a href={playStoreLink} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} style={styles.navBtn}>Download App</motion.a>
          </div>

          <button style={styles.menuIcon} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X color="#FF7A00" size={28}/> : <Menu color={isScrolled ? "#0F172A" : "#fff"} size={28}/>}
          </button>
        </div>

        {/* --- 📱 MOBILE MENU UI (FIXED) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={styles.mobileMenu}>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileLink}>Features</a>
              <Link to="/privacy" style={styles.mobileLink}>Privacy Policy</Link>
              <Link to="/terms" style={styles.mobileLink}>Terms of Use</Link>
              <Link to="/login" style={styles.mobileLink}>Staff Login</Link>
              <a href={playStoreLink} style={styles.primaryBtn}>Install Now</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- 🏔️ HERO SECTION (SEO IMPROVED & BUG FIXED) --- */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <motion.div style={{ ...styles.heroContent, opacity, scale, zIndex: 1 }}>
          <div style={styles.miniTag}>
            <Sparkles size={14} /> 10,000+ Active Explorers 🚀
          </div>
          
          <h1 style={styles.mainHeading}>
            Bharath Darshika - <br/>
            <span style={styles.gradientText}>Explore India Smarter 🇮🇳</span>
          </h1>
          
          <p style={styles.subText}>
            The ultimate heritage intelligence. Decode mysteries, discover hidden temples, and plan perfect budget trips in seconds.
          </p>
          
          <div style={styles.btnRow}>
            <motion.a href={playStoreLink} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} style={styles.primaryBtn}>
              <Play fill="white" size={18} /> Get App Free
            </motion.a>
            <motion.a href="https://youtube.com/@BharathDarshika" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} style={styles.secondaryBtn}>
              <Youtube size={20}/> Watch Trailer
            </motion.a>
          </div>

          <div style={styles.trustStrip}>
            <StatBox icon={<Star size={16} fill="#FF7A00" color="#FF7A00"/>} text="4.8/5 Rating" />
            <StatBox icon={<Users size={16}/>} text="Trusted Community" />
            <StatBox icon={<MapPin size={16}/>} text="Pan India Guides" />
          </div>
        </motion.div>
      </header>

      {/* --- 🛠️ FEATURES --- */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Startup Level Intelligence</h2>
          <p style={styles.sectionSub}>Built to bridge the gap between ancient wisdom and modern travel.</p>
        </div>
        
        <div style={styles.featureGrid}>
          <FeatureCard icon={<Landmark color="#FF7A00"/>} title="Untold History" desc="Verified historical truths and legends direct from ASI records." />
          <FeatureCard icon={<Bot color="#FF7A00"/>} title="AI Master Guide" desc="24/7 intelligent assistance for all your travel queries." />
          <FeatureCard icon={<ShieldCheck color="#FF7A00"/>} title="Safe & Budgeted" desc="Smart planning with Rentora bike integration for solo explorers." />
        </div>
      </section>

      {/* --- 👣 FOOTER (FIXED LINKS & STAFF LOGIN) --- */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerBrand}>
            <h2 style={styles.footerLogo}>Bharath Darshika</h2>
            <p style={{color: '#94A3B8', lineHeight: 1.6}}>The soul of Bharat in your pocket. Built by Ghanta Sai Babu.</p>
            <div style={styles.socialRow}>
               <SocialIcon icon={<Instagram />} href="https://instagram.com/bharathdarshika" />
               <SocialIcon icon={<Youtube />} href="https://youtube.com/@BharathDarshika" />
               <SocialIcon icon={<MessageCircle />} href="https://wa.me/91XXXXXXXXXX" /> {/* Add your number here */}
               <SocialIcon icon={<Mail />} href="mailto:bharathdarshika@gmail.com" />
            </div>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerHead}>Navigation</h4>
            <Link to="/privacy" style={styles.fLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.fLink}>Terms of Use</Link>
            <Link to="/login" style={styles.staffLink}>🔐 Staff Portal Login</Link>
          </div>
        </div>
        <div style={styles.copyright}>© 2026 Bharath Darshika • Preserving Heritage Legends</div>
      </footer>
    </div>
  );
}

// --- 🧩 REUSABLE COMPONENTS ---
const StatBox = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
    {icon} <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#fff' }}>{text}</span>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -10 }} style={styles.fCard}>
    <div style={styles.fIcon}>{icon}</div>
    <h3 style={{fontSize: '1.25rem', fontWeight: '800', marginBottom: '10px'}}>{title}</h3>
    <p style={{color: '#64748B', lineHeight: 1.6, fontSize: '0.95rem'}}>{desc}</p>
  </motion.div>
);

const SocialIcon = ({ icon, href }) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, color: '#FF7A00' }} style={{ color: '#94A3B8' }}>{icon}</motion.a>
);

const StatusBar = () => <div style={styles.statusBar}></div>;

// --- 🎨 UI/UX STYLING (SCALE READY) ---
const styles = {
  container: { fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#fff', overflowX: 'hidden' },
  statusBar: { height: 4, background: 'linear-gradient(90deg, #FF7A00, #FFB800)', width: '100%', position: 'fixed', top: 0, zIndex: 2001 },
  
  stickyMobileCta: { position: 'fixed', bottom: 20, left: '5%', right: '5%', zIndex: 1000 },
  mobileCtaBtn: { backgroundColor: '#FF7A00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', borderRadius: '16px', color: '#fff', fontWeight: '900', textDecoration: 'none', boxShadow: '0 15px 35px rgba(255,122,0,0.4)' },

  nav: { width: '100%', position: 'fixed', top: 0, zIndex: 2000, transition: '0.3s' },
  navContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', maxWidth: '1400px', margin: '0 auto' },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '1.3rem', fontWeight: '900', letterSpacing: '-0.5px' },
  desktopNav: { display: window.innerWidth < 768 ? 'none' : 'flex', gap: '25px', alignItems: 'center' },
  link: { textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' },
  navBtn: { padding: '10px 20px', backgroundColor: '#FF7A00', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.85rem' },
  menuIcon: { display: window.innerWidth < 768 ? 'block' : 'none', background: 'none', border: 'none', cursor: 'pointer' },

  mobileMenu: { backgroundColor: '#fff', padding: '20px 5%', display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #F1F5F9' },
  mobileLink: { textDecoration: 'none', color: '#0F172A', fontWeight: '700', fontSize: '1rem', padding: '10px 0' },

  hero: { minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center', padding: '100px 5%', backgroundColor: '#020617' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(2,6,23,0.3) 0%, #020617 100%), url("https://images.unsplash.com/photo-1548013146-72479768bada?w=1600") center/cover', zIndex: 0 },
  heroContent: { maxWidth: '850px' },
  miniTag: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,122,0,0.15)', color: '#FF7A00', padding: '8px 16px', borderRadius: '100px', fontWeight: '900', fontSize: '0.75rem', marginBottom: '20px', border: '1px solid rgba(255,122,0,0.3)' },
  mainHeading: { fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: '900', color: '#fff', lineHeight: 1.1, letterSpacing: '-2px' },
  gradientText: { background: 'linear-gradient(90deg, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subText: { fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: '#94A3B8', margin: '25px auto', maxWidth: '650px', lineHeight: 1.6 },
  btnRow: { display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '30px' },
  primaryBtn: { padding: '18px 36px', backgroundColor: '#FF7A00', color: '#fff', textDecoration: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'center' },
  secondaryBtn: { padding: '18px 36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '18px', fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' },
  trustStrip: { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '50px', flexWrap: 'wrap' },

  section: { padding: '100px 5%', backgroundColor: '#F8FAFC' },
  sectionHeader: { textAlign: 'center', marginBottom: '60px' },
  sectionTitle: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' },
  sectionSub: { color: '#64748B', fontSize: '1.1rem', marginTop: '10px' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  fCard: { padding: '40px', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' },
  fIcon: { width: 56, height: 56, backgroundColor: '#FFF7ED', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' },

  footer: { backgroundColor: '#020617', padding: '80px 5% 40px', color: '#fff' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', maxWidth: '1400px', margin: '0 auto' },
  footerBrand: { maxWidth: '350px' },
  footerLogo: { fontSize: '1.8rem', fontWeight: '900', marginBottom: '20px', color: '#FF7A00' },
  socialRow: { display: 'flex', gap: '20px', marginTop: '25px' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: '12px' },
  footerHead: { color: '#FF7A00', fontWeight: '900', fontSize: '0.8rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' },
  fLink: { color: '#94A3B8', textDecoration: 'none', fontSize: '0.95rem' },
  staffLink: { color: '#FF7A00', fontSize: '0.85rem', marginTop: '20px', textDecoration: 'none', opacity: 0.7, fontWeight: '700' },
  copyright: { textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#475569', fontSize: '0.85rem' }
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Mail, Download, Smartphone, 
  ShieldCheck, Compass, Landmark, 
  Sparkles, Youtube, Play, Globe, Star, MapPin, Users, Bot, ArrowRight, Menu, X
} from 'lucide-react';

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const playStoreLink = "https://play.google.com/store/apps/details?id=com.bharathdarshika.app";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.container}>
      <StatusBar />
      
      {/* --- 📱 MOBILE STICKY DOWNLOAD BUTTON --- */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            exit={{ y: 100 }} 
            style={styles.stickyMobileCta}
          >
            <a href={playStoreLink} style={styles.mobileCtaBtn}>
              <Download size={18} /> Install App
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 🚀 GLASSMORPHIC NAVBAR --- */}
      <nav style={{...styles.nav, backgroundColor: isScrolled ? 'rgba(255,255,255,0.85)' : 'transparent', borderBottomColor: isScrolled ? '#E2E8F0' : 'transparent'}}>
        <div style={styles.navContent}>
          <div style={styles.brandGroup}>
            <motion.span animate={{ rotateY: 360 }} transition={{ duration: 3, repeat: Infinity }} style={{fontSize: '1.8rem'}}>🚩</motion.span>
            <h2 style={{...styles.logo, color: isScrolled ? '#0F172A' : '#fff'}}>Bharath <span style={{color: '#FF7A00'}}>Darshika</span></h2>
          </div>
          
          <div style={styles.desktopNav}>
            <a href="#features" style={{...styles.link, color: isScrolled ? '#1E293B' : '#CBD5E1'}}>Features</a>
            <a href="#packages" style={{...styles.link, color: isScrolled ? '#1E293B' : '#CBD5E1'}}>Expeditions</a>
            <Link to="/privacy" style={{...styles.link, color: isScrolled ? '#1E293B' : '#CBD5E1'}}>Privacy</Link>
            <motion.a href={playStoreLink} whileHover={{ scale: 1.05 }} style={styles.navBtn}>Get App <Download size={16} /></motion.a>
          </div>

          <TouchableOpacity style={styles.menuIcon} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X color="#FF7A00" size={28}/> : <Menu color={isScrolled ? "#0F172A" : "#fff"} size={28}/>}
          </TouchableOpacity>
        </div>
      </nav>

      {/* --- 🏔️ CINEMATIC HERO SECTION --- */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <motion.div style={{ opacity, scale }} style={styles.heroContent}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={styles.miniTag}>
            <Sparkles size={14} /> The Future of Heritage Travel
          </motion.div>
          
          <h1 style={styles.mainHeading}>
            Explore India <br/>
            <span style={styles.gradientText}>Smarter. 🇮🇳</span>
          </h1>
          
          <p style={styles.subText}>
            Decode ancient mysteries, hidden temples, and master budget trips with India's most intelligent travel guide.
          </p>
          
          <div style={styles.btnRow}>
            <motion.a href={playStoreLink} whileHover={{ scale: 1.05 }} style={styles.primaryBtn}>
              <Play fill="white" size={18} /> Download Now
            </motion.a>
            <motion.button whileHover={{ scale: 1.05 }} style={styles.secondaryBtn}>
              <Youtube size={20}/> Watch Trailer
            </motion.button>
          </div>

          <div style={styles.trustStrip}>
            <StatBox icon={<Users size={16}/>} text="10k+ Travelers" />
            <StatBox icon={<Star size={16} fill="#FF7A00"/>} text="4.8+ Google Play" />
            <StatBox icon={<MapPin size={16}/>} text="100+ Holy Sites" />
          </div>
        </motion.div>
      </header>

      {/* --- 🛠️ FEATURE CARDS (GLASS EFFECT) --- */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Built for the Modern Explorer</h2>
          <p style={styles.sectionSub}>Leveraging AI to bring ancient India to your fingertips.</p>
        </div>
        
        <div style={styles.featureGrid}>
          <FeatureCard icon={<Landmark color="#FF7A00"/>} title="Untold Legends" desc="Verified history and mysteries that local guides won't tell you." />
          <FeatureCard icon={<Bot color="#FF7A00"/>} title="AI Tour Guide" desc="An intelligent bot that knows every temple corner in India." />
          <FeatureCard icon={<Smartphone color="#FF7A00"/>} title="Offline Wisdom" desc="Save history and maps. Explore even without the internet." />
          <FeatureCard icon={<ShieldCheck color="#FF7A00"/>} title="Safe Budgeting" desc="Smart planning with Rentora bike tie-ups for solo trips." />
        </div>
      </section>

      {/* --- 👣 FOOTER (PROFESSIONAL & MINIMAL) --- */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerBrand}>
            <h2 style={styles.footerLogo}>Bharath Darshika</h2>
            <p style={{color: '#94A3B8', lineHeight: 1.6}}>Bridge the gap between ancient wisdom and modern exploration.</p>
            <div style={styles.socialRow}>
               <SocialIcon icon={<Instagram />} href="https://instagram.com/bharathdarshika" />
               <SocialIcon icon={<Youtube />} href="https://youtube.com" />
               <SocialIcon icon={<Mail />} href="mailto:bharathdarshika@gmail.com" />
            </div>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerHead}>Platform</h4>
            <Link to="/privacy" style={styles.fLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.fLink}>Terms of Use</Link>
            <Link to="/login" style={styles.staffLink}>🔐 Staff Portal</Link>
          </div>
        </div>
        <div style={styles.copyright}>© 2026 Developed by Ghanta Sai Babu • Made with ❤️ for Bharat</div>
      </footer>
    </div>
  );
}

// --- 🧩 COMPONENTS ---
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
    <div style={{marginTop: '15px', color: '#FF7A00', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px'}}>Learn More <ArrowRight size={14}/></div>
  </motion.div>
);

const SocialIcon = ({ icon, href }) => (
  <motion.a href={href} whileHover={{ y: -5, color: '#FF7A00' }} style={{ color: '#94A3B8' }}>{icon}</motion.a>
);

const StatusBar = () => <div style={styles.statusBar}></div>;
const TouchableOpacity = ({ children, ...props }) => <button {...props} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{children}</button>;

// --- 🎨 UI/UX STYLING (PRODUCTION READY) ---
const styles = {
  container: { fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#fff', overflowX: 'hidden' },
  statusBar: { height: 4, background: 'linear-gradient(90deg, #FF7A00, #FFB800)', width: '100%', position: 'fixed', top: 0, zIndex: 2001 },
  
  stickyMobileCta: { position: 'fixed', bottom: 20, left: '5%', right: '5%', zIndex: 1000, display: Platform.OS === 'web' ? 'block' : 'none' },
  mobileCtaBtn: { backgroundColor: '#FF7A00', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', borderRadius: '16px', color: '#fff', fontWeight: '900', textDecoration: 'none', boxShadow: '0 15px 35px rgba(255,122,0,0.4)' },

  nav: { width: '100%', position: 'fixed', top: 0, zIndex: 2000, transition: '0.3s', backdropFilter: 'blur(15px)', borderBottom: '1px solid transparent' },
  navContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', maxWidth: '1400px', margin: '0 auto' },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '1.3rem', fontWeight: '900', letterSpacing: '-0.5px' },
  desktopNav: { display: 'flex', gap: '25px', alignItems: 'center' }, // Hidden on small screens via CSS/MediaQuery
  link: { textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' },
  navBtn: { padding: '10px 20px', backgroundColor: '#FF7A00', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' },
  menuIcon: { display: 'none' }, // Toggle via media query in real CSS

  hero: { minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center', padding: '100px 5%', backgroundColor: '#020617' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(2,6,23,0.3) 0%, #020617 100%), url("https://images.unsplash.com/photo-1548013146-72479768bada?w=1600") center/cover', zIndex: 0 },
  heroContent: { maxWidth: '850px', zIndex: 1 },
  miniTag: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,122,0,0.15)', color: '#FF7A00', padding: '8px 16px', borderRadius: '100px', fontWeight: '900', fontSize: '0.75rem', marginBottom: '20px', border: '1px solid rgba(255,122,0,0.3)' },
  mainHeading: { fontSize: 'clamp(2.8rem, 9vw, 5.5rem)', fontWeight: '900', color: '#fff', lineHeight: 1, letterSpacing: '-2px' },
  gradientText: { background: 'linear-gradient(90deg, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subText: { fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: '#94A3B8', margin: '25px auto', maxWidth: '650px', lineHeight: 1.6 },
  btnRow: { display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '30px' },
  primaryBtn: { padding: '18px 36px', backgroundColor: '#FF7A00', color: '#fff', textDecoration: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(255,122,0,0.3)' },
  secondaryBtn: { padding: '18px 36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '18px', fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' },
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

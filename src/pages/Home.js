import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Instagram, Mail, Download, Smartphone, 
  ShieldCheck, Compass, Landmark, 
  Sparkles, Youtube, Play, Globe
} from 'lucide-react';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const playStoreLink = "https://play.google.com/store/apps/details?id=com.bharathdarshika.app";

  return (
    <div style={styles.container}>
      <StatusBar />
      
      {/* --- 🚀 PREMIUM FLOATING NAVBAR --- */}
      <nav style={styles.nav}>
        <div style={styles.brandGroup}>
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            style={styles.logoCircle}
          >🚩</motion.div>
          <h2 style={styles.logo}>Bharath <span style={{color: '#FF7A00'}}>Darshika</span></h2>
        </div>
        
        <div style={styles.navLinks}>
          <a href="#features" style={styles.link}>Features</a>
          <a href="#packages" style={styles.link}>Packages</a>
          <Link to="/privacy" style={styles.link}>Privacy</Link>
          
          <motion.a 
            href={playStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={styles.navBtn}
          >
            Get App <Play size={16} fill="white" />
          </motion.a>
        </div>
      </nav>

      {/* --- 🏔️ IMMERSIVE HERO SECTION --- */}
      <header style={styles.hero}>
        <motion.div style={{ y: y1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
           <div style={styles.heroOverlay}></div>
        </motion.div>

        <motion.div 
          initial={{opacity:0, scale: 0.9}} 
          animate={{opacity:1, scale: 1}} 
          transition={{duration: 1}}
          style={styles.heroContent}
        >
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={styles.miniTag}
          >
            <Sparkles size={14} /> The Ultimate Heritage Guide
          </motion.div>
          
          <h1 style={styles.mainHeading}>
            Unlock India's <br/>
            <span style={styles.gradientText}>Untold Legends.</span>
          </h1>
          
          <p style={styles.subText}>
            Detailed history, verified mysteries, and Rentora bike integration. 
            Experience the soul of Bharat like never before.
          </p>
          
          <div style={styles.btnRow}>
            <motion.a 
              href={playStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(255,122,0,0.4)' }}
              style={styles.primaryBtn}
            >
              Download APK <Download size={20}/>
            </motion.a>
            <motion.button 
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              style={styles.secondaryBtn}
            >
              Watch Trailer <Youtube size={20}/>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* --- 🛠️ INTERACTIVE FEATURES --- */}
      <section id="features" style={styles.section}>
        <div style={styles.featureGrid}>
          <FeatureItem 
            icon={<Landmark size={32} color="#FF7A00"/>} 
            title="Verified Truths" 
            desc="Curated from ASI records and ancient scriptures." 
            delay={0.2}
          />
          <FeatureItem 
            icon={<ShieldCheck size={32} color="#FF7A00"/>} 
            title="Safe Exploration" 
            desc="Verified routes and trusted local rentora partners." 
            delay={0.4}
          />
          <FeatureItem 
            icon={<Smartphone size={32} color="#FF7A00"/>} 
            title="Offline Guides" 
            desc="Access maps and history even in remote areas." 
            delay={0.6}
          />
        </div>
      </section>

      {/* --- 🗺️ PREMIUM PACKAGES --- */}
      <section id="packages" style={styles.packageSection}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={styles.sectionTitle}
          >
            Exclusive Expeditions
          </motion.h2>
          
          <div style={styles.packageGrid}>
            <PackageCard 
              title="Kingdom of Hampi" 
              days="3D/2N" 
              price="₹4,999" 
              img="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600" 
              color="#FF7A00"
            />
            <PackageCard 
              title="Rajputana Legacy" 
              days="5D/4N" 
              price="₹8,999" 
              img="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600" 
              color="#0F4C81"
            />
            <PackageCard 
              title="Godavari Escapes" 
              days="2D/1N" 
              price="₹2,999" 
              img="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600" 
              color="#059669"
            />
          </div>
        </div>
      </section>

      {/* --- 👣 FOOTER --- */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <h2 style={styles.footerLogo}>Bharath Darshika</h2>
            <p style={{opacity: 0.6}}>Built to bridge the gap between ancient wisdom and modern exploration.</p>
            <div style={styles.socialRow}>
               <motion.a whileHover={{y:-5}} href="https://instagram.com/bharathdarshika"><Instagram /></motion.a>
               <motion.a whileHover={{y:-5}} href="https://youtube.com"><Youtube /></motion.a>
               <motion.a whileHover={{y:-5}} href="mailto:bharathdarshika@gmail.com"><Mail /></motion.a>
            </div>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerHead}>Navigation</h4>
            <Link to="/privacy" style={styles.fLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.fLink}>Terms of Use</Link>
            <a href="#features" style={styles.fLink}>Features</a>
          </div>

          <div style={styles.footerLinks}>
            <h4 style={styles.footerHead}>Dev Team</h4>
            <p style={styles.fLink}>Ghanta Sai Babu</p>
            <Link to="/login" style={styles.staffLink}>Staff Login</Link>
          </div>
        </div>
        
        <div style={styles.copyright}>
          <p>© 2026 Bharath Darshika • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

// --- ✨ SUB-COMPONENTS (ERROR FREE) ---

const FeatureItem = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, backgroundColor: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }} 
    style={styles.fItem}
  >
    <div style={styles.fIcon}>{icon}</div>
    <h4 style={{fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px'}}>{title}</h4>
    <p style={{color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6}}>{desc}</p>
  </motion.div>
);

const PackageCard = ({ title, days, price, img, color }) => (
  <motion.div 
    whileHover={{ y: -15 }} 
    style={styles.pCard}
  >
    <div style={styles.pImgContainer}>
        <img src={img} alt={title} style={styles.pImg} />
        <div style={{...styles.pPriceTag, backgroundColor: color}}>{price}</div>
    </div>
    <div style={styles.pContent}>
      <h3 style={{margin: '0 0 10px 0', fontSize: '1.4rem'}}>{title}</h3>
      <div style={{display:'flex', alignItems:'center', gap:8, color:'#64748B'}}>
        <Compass size={16} /> <span>{days} Exploration</span>
      </div>
      <motion.button 
        whileHover={{ backgroundColor: color, color: '#fff' }}
        style={{...styles.bookBtn, borderColor: color, color: color}}
      >
        Book Trip
      </motion.button>
    </div>
  </motion.div>
);

const StatusBar = () => <div style={styles.statusBar}></div>;

// --- 🎨 ADVANCED STYLING ---

const styles = {
  container: { fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#0F172A', overflowX: 'hidden', backgroundColor: '#fff' },
  statusBar: { height: 4, background: 'linear-gradient(90deg, #FF7A00, #FFB800)', width: '100%', position: 'fixed', top: 0, zIndex: 2000 },
  
  nav: { 
    display: 'flex', justifyContent: 'space-between', padding: '15px 8%', alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', 
    position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(0,0,0,0.05)' 
  },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoCircle: { fontSize: '2rem' },
  logo: { fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-1px' },
  navLinks: { display: 'flex', gap: '30px', alignItems: 'center' },
  link: { textDecoration: 'none', color: '#1E293B', fontWeight: '700', fontSize: '0.9rem' },
  navBtn: { 
    padding: '12px 25px', backgroundColor: '#0F172A', color: '#fff', 
    textDecoration: 'none', borderRadius: '15px', fontWeight: '800', 
    display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' 
  },

  hero: { 
    height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden', textAlign: 'center', padding: '0 8%',
    backgroundColor: '#0F172A'
  },
  heroOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to bottom, rgba(15,23,42,0.6), #0F172A), url("https://images.unsplash.com/photo-1548013146-72479768bada?w=1600") center/cover',
    zIndex: -1,
    opacity: 0.5
  },
  heroContent: { maxWidth: '900px', color: 'white', zIndex: 1 },
  miniTag: { 
    display: 'inline-flex', alignItems: 'center', gap: '10px', 
    backgroundColor: 'rgba(255,122,0,0.15)', color: '#FF7A00', 
    padding: '8px 20px', borderRadius: '100px', fontWeight: '900', fontSize: '0.8rem', marginBottom: '30px' 
  },
  mainHeading: { fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: '900', lineHeight: 1.1, letterSpacing: '-3px' },
  gradientText: { background: 'linear-gradient(90deg, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subText: { fontSize: '1.4rem', opacity: 0.8, margin: '30px 0 50px', lineHeight: 1.6 },
  btnRow: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  primaryBtn: { 
    padding: '18px 40px', backgroundColor: '#FF7A00', color: '#fff', 
    textDecoration: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1.1rem',
    display: 'flex', alignItems: 'center', gap: '15px' 
  },
  secondaryBtn: { 
    padding: '18px 40px', backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.2)', 
    color: '#fff', borderRadius: '18px', fontWeight: '900', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' 
  },

  section: { padding: '100px 8%', backgroundColor: '#F8FAFC' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' },
  fItem: { padding: '45px 35px', borderRadius: '35px', textAlign: 'left', transition: '0.4s' },
  fIcon: { width: 70, height: 70, backgroundColor: '#F0F9FF', borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px' },

  packageSection: { padding: '100px 8%' },
  sectionTitle: { fontSize: '3.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '60px', letterSpacing: '-2px' },
  packageGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' },
  pCard: { borderRadius: '40px', backgroundColor: '#fff', overflow: 'hidden', border: '1px solid #F1F5F9', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' },
  pImgContainer: { position: 'relative' },
  pImg: { width: '100%', height: '260px', objectFit: 'cover' },
  pPriceTag: { 
    position: 'absolute', bottom: 20, right: 20, padding: '8px 18px', 
    borderRadius: '12px', color: '#fff', fontWeight: '900', fontSize: '1.1rem' 
  },
  pContent: { padding: '30px' },
  bookBtn: { 
    marginTop: '20px', width: '100%', padding: '14px', borderRadius: '12px', 
    border: '2px solid', backgroundColor: 'transparent', fontWeight: '900', cursor: 'pointer', transition: '0.3s' 
  },

  footer: { backgroundColor: '#0F172A', color: 'white', padding: '80px 8% 40px' },
  footerTop: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '60px' },
  footerBrand: { maxWidth: '400px' },
  footerLogo: { fontSize: '2.5rem', fontWeight: '900', marginBottom: '20px', background: 'linear-gradient(90deg, #FF7A00, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  socialRow: { display: 'flex', gap: '20px', marginTop: '25px' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: '15px' },
  footerHead: { color: '#FF7A00', fontWeight: '900', fontSize: '0.9rem', marginBottom: '10px', letterSpacing: '1px' },
  fLink: { textDecoration: 'none', color: '#94A3B8', fontSize: '0.95rem' },
  staffLink: { color: '#FF7A00', fontSize: '0.8rem', marginTop: '15px', textDecoration: 'none', opacity: 0.6 },
  copyright: { borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '60px', paddingTop: '30px', textAlign: 'center', color: '#475569' }
};

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, Mail, Download, Smartphone, MapPin, 
  ShieldCheck, ArrowRight, Compass, Landmark, 
  Sparkles, Navigation, Youtube, CheckCircle, Globe
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <StatusBar />
      
      {/* --- PREMIUM NAVBAR --- */}
      <nav style={styles.nav}>
        <div style={styles.brandGroup}>
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={styles.logoCircle}
          >🚩</motion.div>
          <h2 style={styles.logo}>Bharath <span style={{color: '#FF7A00'}}>Darshika</span></h2>
        </div>
        <div style={styles.navLinks}>
          <a href="#features" style={styles.link}>Features</a>
          <a href="#packages" style={styles.link}>Packages</a>
          {/* ✅ Privacy & Terms Direct Redirects */}
          <Link to="/privacy" style={styles.link}>Privacy</Link>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(255,122,0,0.3)' }} 
            whileTap={{ scale: 0.95 }}
            style={styles.navBtn}
          >
            Download APK <Download size={16} />
          </motion.button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header style={styles.hero}>
        <motion.div 
          initial={{opacity:0, y:40}} 
          animate={{opacity:1, y:0}} 
          transition={{duration: 0.8}}
          style={styles.heroContent}
        >
          <motion.span 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={styles.miniTag}
          >✨ Explore the Unexplored</motion.span>
          
          <h1 style={styles.mainHeading}>Discover India's <br/><span style={styles.goldText}>Lost Heritage.</span></h1>
          
          <p style={styles.subText}>
            భారతీయ సంస్కృతి, పురాతన కట్టడాల వెనుక ఉన్న అసలైన రహస్యాలను అన్వేషించండి. 
            Detailed history, verified mysteries, and seamless travel in one app.
          </p>
          
          <div style={styles.btnRow}>
            <motion.button whileHover={{x: 5}} style={styles.primaryBtn}>
              Start Exploring <Compass size={20}/>
            </motion.button>
            <button style={styles.secondaryBtn}>View Packages</button>
          </div>
        </motion.div>
      </header>

      {/* --- FEATURES GRID --- */}
      <section id="features" style={styles.section}>
        <div style={styles.featureGrid}>
          <FeatureItem icon={<Landmark color="#FF7A00"/>} title="Verified History" desc="Facts curated from official archaeological surveys." />
          <FeatureItem icon={<Sparkles color="#FF7A00"/>} title="Hidden Mysteries" desc="Uncover secrets that aren't on standard search engines." />
          <FeatureItem icon={<Navigation color="#FF7A00"/>} title="Rentora Ready" desc="Reach remote gems easily with our bike rentals." />
        </div>
      </section>

      {/* --- PACKAGES SECTION --- */}
      <section id="packages" style={styles.packageSection}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={styles.sectionTitle}>🎯 Curated Tour Packages</h2>
          <div style={styles.packageGrid}>
            <PackageCard title="Heritage of Hampi" days="3D/2N" price="₹4,999" tag="Cultural" img="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600" />
            <PackageCard title="Mystic Rajasthan" days="5D/4N" price="₹8,999" tag="Historical" img="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600" />
            <PackageCard title="Konaseema Trails" days="2D/1N" price="₹2,999" tag="Nature" img="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600" />
          </div>
        </div>
      </section>

      {/* --- FOOTER (Updated with Links) --- */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <h2 style={styles.footerLogo}>Bharath Darshika</h2>
            <p style={{opacity: 0.7, lineHeight: 1.6}}>Preserving Indian heritage for the modern explorer. Experience Bharat like never before.</p>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerHead}>Company</h4>
            <Link to="/privacy" style={styles.fLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.fLink}>Terms & Conditions</Link>
            <Link to="/login" style={styles.staffLink}>Staff Portal</Link>
          </div>

          <div style={styles.footerLinks}>
            <h4 style={styles.footerHead}>Support</h4>
            <a href="mailto:bharathdarshika@gmail.com" style={styles.contactRow}><Mail size={16}/> Email Us</a>
            <a href="https://instagram.com/bharathdarshika" style={styles.contactRow}><Instagram size={16}/> Instagram</a>
          </div>
        </div>
        
        <div style={styles.copyright}>
          <p>© 2026 Bharath Darshika. Built with ❤️ by <b>Ghanta Sai Babu</b></p>
        </div>
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const FeatureItem = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -10 }} style={styles.fItem}>
    <div style={styles.fIcon}>{icon}</div>
    <h4 style={{fontSize: '1.2rem', marginBottom: '10px'}}>{title}</h4>
    <p style={{color: '#64748B', fontSize: '0.95rem', lineHeight: 1.5}}>{desc}</p>
  </motion.div>
);

const PackageCard = ({ title, days, price, tag, img }) => (
  <motion.div whileHover={{ y: -12 }} style={styles.pCard}>
    <img src={img} alt={title} style={styles.pImg} />
    <div style={styles.pContent}>
      <span style={styles.pTag}>{tag}</span>
      <h3 style={{margin: '10px 0'}}>{title}</h3>
      <div style={{display:'flex', alignItems:'center', gap:5, color:'#64748B', fontSize:'0.9rem'}}>
        <Compass size={14} /> {days}
      </div>
      <div style={styles.pFooter}>
        <span style={styles.price}>{price}</span>
        <button style={styles.bookBtn}>Book Now</button>
      </div>
    </div>
  </motion.div>
);

const StatusBar = () => <div style={{height: 4, backgroundColor: '#FF7A00', width: '100%', position: 'fixed', top: 0, zIndex: 2000}}></div>;

// --- ADVANCED TAILWIND-STYLE CSS ---

const styles = {
  container: { fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E293B', backgroundColor: '#fff', scrollBehavior: 'smooth' },
  nav: { display: 'flex', justifyContent: 'space-between', padding: '15px 8%', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #F1F5F9' },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoCircle: { fontSize: '1.8rem' },
  logo: { fontSize: '1.4rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' },
  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: { textDecoration: 'none', color: '#475569', fontWeight: '700', fontSize: '0.9rem', transition: '0.3s' },
  navBtn: { padding: '12px 24px', backgroundColor: '#0F4C81', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },

  hero: { padding: '140px 8%', textAlign: 'center', background: 'linear-gradient(rgba(15, 76, 129, 0.85), rgba(15, 76, 129, 0.95)), url("https://images.unsplash.com/photo-1548013146-72479768bada?w=1200") center/cover no-repeat', color: 'white', borderBottomLeftRadius: '80px', borderBottomRightRadius: '80px' },
  miniTag: { display: 'inline-block', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.7rem', backgroundColor: 'rgba(255,122,0,0.2)', color: '#FF7A00', border: '1px solid #FF7A00', padding: '6px 16px', borderRadius: '100px', fontWeight: '900', marginBottom: '20px' },
  mainHeading: { fontSize: '4.5rem', fontWeight: '900', marginTop: '10px', lineHeight: 1, letterSpacing: '-2px' },
  goldText: { color: '#FF7A00' },
  subText: { fontSize: '1.2rem', maxWidth: '700px', margin: '25px auto 40px', opacity: 0.8, lineHeight: 1.7, fontWeight: '500' },
  btnRow: { display: 'flex', justifyContent: 'center', gap: '20px' },
  primaryBtn: { padding: '18px 45px', backgroundColor: '#FF7A00', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem' },
  secondaryBtn: { padding: '18px 45px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', border: '1px solid #fff', color: '#fff', borderRadius: '18px', fontWeight: '800' },

  section: { padding: '100px 8%' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px' },
  fItem: { textAlign: 'center', padding: '40px', borderRadius: '30px', backgroundColor: '#F8FAFC', transition: '0.3s' },
  fIcon: { width: 70, height: 70, backgroundColor: '#fff', borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 25px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' },

  packageSection: { padding: '100px 8%', backgroundColor: '#F1F5F9' },
  sectionTitle: { fontSize: '2.8rem', fontWeight: '900', textAlign: 'center', marginBottom: '60px', color: '#0F4C81', letterSpacing: '-1px' },
  packageGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '35px' },
  pCard: { borderRadius: '35px', backgroundColor: '#fff', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' },
  pImg: { width: '100%', height: '220px', objectFit: 'cover' },
  pContent: { padding: '25px' },
  pTag: { fontSize: '10px', backgroundColor: '#FFF7ED', color: '#FF7A00', padding: '5px 12px', borderRadius: '8px', fontWeight: '900', textTransform: 'uppercase' },
  pFooter: { marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '20px' },
  price: { fontSize: '1.6rem', fontWeight: '900', color: '#1E293B' },
  bookBtn: { border: 'none', backgroundColor: '#0F4C81', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' },

  footer: { backgroundColor: '#0F172A', color: 'white', padding: '100px 8% 40px' },
  footerTop: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '60px', maxWidth: '1200px', margin: '0 auto' },
  footerBrand: { maxWidth: '350px' },
  footerLogo: { fontSize: '2rem', fontWeight: '900', marginBottom: '20px' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: '18px' },
  footerHead: { color: '#FF7A00', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '10px' },
  fLink: { textDecoration: 'none', color: '#94A3B8', fontSize: '0.95rem', transition: '0.3s' },
  staffLink: { textDecoration: 'none', color: '#1E293B', backgroundColor: '#334155', padding: '5px 10px', borderRadius: '6px', fontSize: '0.7rem', marginTop: '20px', display: 'inline-block' },
  contactRow: { display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
  copyright: { borderTop: '1px solid #1E293B', paddingTop: '40px', textAlign: 'center', color: '#475569', marginTop: 80, fontSize: '0.9rem' }
};

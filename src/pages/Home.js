import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, Mail, Download, Smartphone, MapPin, 
  ShieldCheck, ArrowRight, Compass, Landmark, Camera, 
  Sparkles, Star, Navigation, Plane, X, FileText, CheckCircle
} from 'lucide-react';

export default function Home() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' or 'terms'

  const closeModal = () => setActiveModal(null);

  return (
    <div style={styles.container}>
      <StatusBar />
      
      {/* --- NAVBAR --- */}
      <nav style={styles.nav}>
        <div style={styles.brandGroup}>
          <div style={styles.logoCircle}>🚩</div>
          <h2 style={styles.logo}>Bharath <span style={{color: '#FF7A00'}}>Darshika</span></h2>
        </div>
        <div style={styles.navLinks}>
          <a href="#history" style={styles.link}>History</a>
          <a href="#packages" style={styles.link}>Packages</a>
          <button onClick={() => setActiveModal('privacy')} style={styles.linkBtn}>Privacy</button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            style={styles.navBtn}
          >
            Download APK
          </motion.button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header style={styles.hero}>
        <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} style={styles.heroContent}>
          <span style={styles.miniTag}>Explore the Unexplored</span>
          <h1 style={styles.mainHeading}>Discover India's <br/><span style={styles.goldText}>Lost Heritage.</span></h1>
          <p style={styles.subText}>
            భారతీయ సంస్కృతి, పురాతన కట్టడాల వెనుక ఉన్న అసలైన రహస్యాలను అన్వేషించండి. 
            Detailed history, verified mysteries, and seamless travel packages in one app.
          </p>
          <div style={styles.btnRow}>
            <button style={styles.primaryBtn}>Start Exploring <Compass size={20}/></button>
            <button style={styles.secondaryBtn}>View Packages</button>
          </div>
        </motion.div>
      </header>

      {/* --- FEATURES GRID --- */}
      <section style={styles.section}>
        <div style={styles.featureGrid}>
          <FeatureItem icon={<Landmark color="#FF7A00"/>} title="Verified History" desc="Facts curated from archaeological surveys." />
          <FeatureItem icon={<Sparkles color="#FF7A00"/>} title="Hidden Mysteries" desc="Uncover secrets that aren't on Google." />
          <FeatureItem icon={<Navigation color="#FF7A00"/>} title="Rentora Ready" desc="Reach remote gems with bike rentals." />
        </div>
      </section>

      {/* --- PACKAGES SECTION --- */}
      <section id="packages" style={styles.packageSection}>
        <h2 style={styles.sectionTitle}>🎯 Curated Tour Packages</h2>
        <div style={styles.packageGrid}>
          <PackageCard title="Heritage of Hampi" days="3D/2N" price="₹4,999" tag="Cultural" />
          <PackageCard title="Mystic Rajasthan" days="5D/4N" price="₹8,999" tag="Historical" />
          <PackageCard title="Konaseema Trails" days="2D/1N" price="₹2,999" tag="Nature" />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <h2 style={styles.footerLogo}>Bharath Darshika</h2>
            <p style={{opacity: 0.7}}>Preserving Indian heritage for the modern explorer.</p>
          </div>
          <div style={styles.footerLinks}>
            <h4>Legal</h4>
            <button onClick={() => setActiveModal('privacy')} style={styles.fLinkBtn}>Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} style={styles.fLinkBtn}>Terms & Conditions</button>
            <Link to="/login" style={{...styles.fLinkBtn, fontSize: '10px', marginTop: '10px', opacity: 0.3}}>
           Staff Portal
         </Link>
          </div>
          <div style={styles.footerLinks}>
            <h4>Connect</h4>
            <a href="mailto:bharathdarshika@gmail.com" style={styles.contactRow}><Mail size={16}/> bharathdarshika@gmail.com</a>
            <a href="https://instagram.com/bharathdarshika" style={styles.contactRow}><Instagram size={16}/> @bharathdarshika</a>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>© 2026 Bharath Darshika. Developed by <b>Ghanta Sai Babu</b></p>
        </div>
      </footer>

      {/* --- MODALS (Privacy & Terms) --- */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={styles.modalOverlay}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={styles.modalContent}
            >
              <div style={styles.modalHeader}>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <FileText color="#FF7A00" />
                  <h3 style={{margin:0}}>{activeModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h3>
                </div>
                <button onClick={closeModal} style={styles.closeBtn}><X /></button>
              </div>
              <div style={styles.modalBody}>
                {activeModal === 'privacy' ? <PrivacyContent /> : <TermsContent />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const FeatureItem = ({ icon, title, desc }) => (
  <div style={styles.fItem}>
    <div style={styles.fIcon}>{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const PackageCard = ({ title, days, price, tag }) => (
  <motion.div whileHover={{ y: -10 }} style={styles.pCard}>
    <span style={styles.pTag}>{tag}</span>
    <h3>{title}</h3>
    <p style={{color: '#64748B'}}>{days}</p>
    <div style={styles.pFooter}>
      <span style={styles.price}>{price}</span>
      <button style={styles.bookBtn}>Details <ArrowRight size={14}/></button>
    </div>
  </motion.div>
);

const PrivacyContent = () => (
  <div style={styles.legalText}>
    <p><b>Last Updated:</b> March 2026</p>
    <p>Bharath Darshika is committed to protecting your privacy. This policy explains how we handle your data.</p>
    <h4>1. Information We Collect</h4>
    <ul>
      <li>Personal details (Name, Email) when you register.</li>
      <li>Location data to show nearby heritage sites.</li>
      <li>Usage data via AdMob to provide rewarded content.</li>
    </ul>
    <h4>2. How We Use Data</h4>
    <p>Your data is used solely to improve exploration experience and process tour bookings. We do not sell your personal information to third parties.</p>
    <h4>3. Third-Party Services</h4>
    <p>We use Google AdMob for advertisements and Firebase for database management. These services may collect data as per their own privacy policies.</p>
  </div>
);

const TermsContent = () => (
  <div style={styles.legalText}>
    <p><b>Last Updated:</b> March 2026</p>
    <h4>1. Use of Service</h4>
    <p>By using Bharath Darshika, you agree to respect heritage sites and follow local laws during travels.</p>
    <h4>2. User Content</h4>
    <p>Any photos or reviews uploaded to our platform must be original and respectful.</p>
    <h4>3. Rentora Integration</h4>
    <p>Bike rentals are handled via the Rentora platform. All rental agreements and safety protocols are subject to Rentora's terms of service.</p>
    <h4>4. Liability</h4>
    <p>Bharath Darshika provides historical information for educational and travel purposes. We are not responsible for physical injuries during travel.</p>
  </div>
);

const StatusBar = () => <div style={{height: 5, backgroundColor: '#FF7A00', width: '100%', position: 'fixed', top: 0, zIndex: 2000}}></div>;

// --- STYLES ---

const styles = {
  container: { fontFamily: "'Inter', sans-serif", color: '#1E293B', backgroundColor: '#fff', scrollBehavior: 'smooth' },
  nav: { display: 'flex', justifyContent: 'space-between', padding: '15px 8%', alignItems: 'center', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #F1F5F9' },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoCircle: { fontSize: '1.5rem' },
  logo: { fontSize: '1.3rem', fontWeight: '900', margin: 0 },
  navLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { textDecoration: 'none', color: '#64748B', fontWeight: '600', fontSize: '0.9rem' },
  linkBtn: { background: 'none', border: 'none', color: '#64748B', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' },
  navBtn: { padding: '10px 25px', backgroundColor: '#0F4C81', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },

  hero: { padding: '120px 8%', textAlign: 'center', background: 'linear-gradient(rgba(15, 76, 129, 0.9), rgba(15, 76, 129, 0.9)), url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200") center/cover no-repeat', color: 'white', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' },
  miniTag: { textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', backgroundColor: '#FF7A00', padding: '5px 15px', borderRadius: '8px', fontWeight: 'bold' },
  mainHeading: { fontSize: '4rem', fontWeight: '900', marginTop: '25px', lineHeight: 1.1 },
  goldText: { color: '#FF7A00' },
  subText: { fontSize: '1.25rem', maxWidth: '750px', margin: '20px auto 45px', opacity: 0.9, lineHeight: 1.6 },
  btnRow: { display: 'flex', justifyContent: 'center', gap: '20px' },
  primaryBtn: { padding: '18px 40px', backgroundColor: '#FF7A00', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' },
  secondaryBtn: { padding: '18px 40px', backgroundColor: 'transparent', border: '2px solid #fff', color: '#fff', borderRadius: '15px', fontWeight: '800' },

  section: { padding: '80px 8%' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' },
  fItem: { textAlign: 'center' },
  fIcon: { width: 60, height: 60, backgroundColor: '#FFF7ED', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px' },

  packageSection: { padding: '100px 8%', backgroundColor: '#F8FAFC' },
  sectionTitle: { fontSize: '2.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '50px', color: '#0F4C81' },
  packageGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  pCard: { padding: '30px', borderRadius: '30px', backgroundColor: '#fff', border: '1px solid #E2E8F0', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  pTag: { position: 'absolute', top: '20px', right: '20px', fontSize: '10px', backgroundColor: '#FFF7ED', color: '#FF7A00', padding: '5px 12px', borderRadius: '10px', fontWeight: '900' },
  pFooter: { marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '20px' },
  price: { fontSize: '1.5rem', fontWeight: '900', color: '#0F4C81' },
  bookBtn: { border: 'none', backgroundColor: '#F1F5F9', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },

  footer: { backgroundColor: '#0F172A', color: 'white', padding: '80px 8% 40px' },
  footerTop: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' },
  footerBrand: { maxWidth: '300px' },
  footerLogo: { fontSize: '1.8rem', fontWeight: '900', marginBottom: '15px' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: '15px' },
  fLinkBtn: { background: 'none', border: 'none', color: '#94A3B8', textAlign: 'left', cursor: 'pointer', padding: 0 },
  contactRow: { display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none' },
  copyright: { borderTop: '1px solid #1E293B', paddingTop: '40px', textAlign: 'center', color: '#64748B', marginTop: 50 },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: 20 },
  modalContent: { backgroundColor: '#fff', width: '100%', maxWidth: '700px', maxHeight: '80vh', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  modalHeader: { padding: '20px 30px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalBody: { padding: '30px', overflowY: 'auto' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  legalText: { lineHeight: '1.6', color: '#475569' }
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { 
  Layers, LogOut, Navigation, Map, Bell, 
  LayoutDashboard, UserCircle, Menu, X, ChevronRight, FileJson,
  UsersRound // 👈 కొత్త ఐకాన్
} from 'lucide-react';

import PlacesTab from './PlacesTab';
import StatesTab from './StatesTab';
import NotificationTab from './NotificationTab';
import BulkUpload from './BulkUpload';
import CreatorsTab from './creators'; // 👈 కొత్తగా క్రియేటర్స్ ట్యాబ్ ఇంపోర్ట్ చేశాం

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [counts, setCounts] = useState({ places: 0, states: 0, creators: 0 }); // 👈 creators count యాడ్ చేశాం
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchCounts = async () => {
    try {
      const pSnap = await getDocs(collection(db, "Places"));
      const sSnap = await getDocs(collection(db, "States"));
      const cSnap = await getDocs(collection(db, "Creators")); // 👈 క్రియేటర్స్ డేటా తెచ్చుకుంటున్నాం
      setCounts({ 
        places: pSnap.size, 
        states: sSnap.size,
        creators: cSnap.size // 👈 కౌంట్ సెట్ చేస్తున్నాం
      });
    } catch (e) { console.error("Count Fetch Error:", e); }
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/login');
    fetchCounts();
  }, [navigate]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div style={styles.container}>
      {/* --- MOBILE HEADER --- */}
      <div style={styles.mobileHeader}>
        <div style={styles.brand}>
          <Layers color="#FF7A00" size={24} />
          <span style={{...styles.brandText, color: '#0F172A'}}>Darshika CMS</span>
        </div>
        <button onClick={toggleSidebar} style={styles.menuBtn}>
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside style={{
        ...styles.sidebar,
        transform: isSidebarOpen ? 'translateX(0)' : (window.innerWidth <= 1024 ? 'translateX(-100%)' : 'translateX(0)'),
      }}>
        <div style={styles.sidebarHeader}>
          <Layers color="#FF7A00" size={32} />
          <h2 style={styles.brandText}>Darshika <span style={{color: '#94A3B8'}}>CMS</span></h2>
        </div>

        <nav style={styles.navGroup}>
          <div style={styles.sectionLabel}>MAIN MENU</div>
          <NavButton active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setSidebarOpen(false);}} icon={<LayoutDashboard size={20}/>} label="Overview" />
          <NavButton active={activeTab === 'places'} onClick={() => {setActiveTab('places'); setSidebarOpen(false);}} icon={<Navigation size={20}/>} label="Places Management" />
          <NavButton active={activeTab === 'states'} onClick={() => {setActiveTab('states'); setSidebarOpen(false);}} icon={<Map size={20}/>} label="Regional States" />
          
          <div style={{...styles.sectionLabel, marginTop: '20px'}}>COMMUNITY</div>
          {/* 🚩 కొత్తగా క్రియేటర్స్ బటన్ యాడ్ చేశాం */}
          <NavButton active={activeTab === 'creators'} onClick={() => {setActiveTab('creators'); setSidebarOpen(false);}} icon={<UsersRound size={20}/>} label="Creators Hub" />
          
          <div style={{...styles.sectionLabel, marginTop: '20px'}}>DATA TOOLS</div>
          <NavButton active={activeTab === 'bulk'} onClick={() => {setActiveTab('bulk'); setSidebarOpen(false);}} icon={<FileJson size={20}/>} label="Bulk Integration" />
          <NavButton active={activeTab === 'notifications'} onClick={() => {setActiveTab('notifications'); setSidebarOpen(false);}} icon={<Bell size={20}/>} label="Push Broadcast" />
          
          <div style={{...styles.sectionLabel, marginTop: '30px'}}>SYSTEM</div>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={styles.logoutNavItem}>
            <LogOut size={20} /> <span>Sign Out</span>
          </button>
        </nav>

        <div style={styles.sidebarUser}>
          <div style={styles.userBadge}>
            <div style={styles.statusDot} />
            <UserCircle size={35} color="#94A3B8" />
            <div style={{marginLeft: '10px'}}>
                <div style={{color: '#fff', fontSize: '14px', fontWeight: '600'}}>Master Admin</div>
                <div style={{color: '#64748B', fontSize: '11px'}}>Super Control</div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={{
        ...styles.mainContent,
        marginLeft: window.innerWidth <= 1024 ? '0' : '280px'
      }}>
        <header style={styles.contentHeader}>
          <div style={styles.headerTitle}>
            <h1 style={styles.pageTitle}>{activeTab.toUpperCase()}</h1>
            <div style={styles.breadcrumb}>Dashboard <ChevronRight size={14}/> {activeTab}</div>
          </div>
        </header>

        <section style={styles.tabContent}>
          {activeTab === 'dashboard' && <HomeDashboard setActiveTab={setActiveTab} counts={counts} />}
          {activeTab === 'places' && <PlacesTab />}
          {activeTab === 'states' && <StatesTab />}
          {activeTab === 'notifications' && <NotificationTab />}
          {activeTab === 'bulk' && <BulkUpload refresh={fetchCounts} />}
          {activeTab === 'creators' && <CreatorsTab />} {/* 👈 క్రియేటర్స్ ట్యాబ్ ఇక్కడ చూపిస్తున్నాం */}
        </section>
      </main>

      {isSidebarOpen && <div onClick={toggleSidebar} style={styles.overlay} />}
    </div>
  );
}

// --- SUB-COMPONENTS ---
const HomeDashboard = ({ setActiveTab, counts }) => (
  <div style={styles.dashboardView}>
    <div style={styles.heroBanner}>
      <div style={{zIndex: 2}}>
        <h2 style={{fontSize: '24px', margin: '0 0 10px 0'}}>System Operational.</h2>
        <p style={{opacity: 0.8, fontSize: '14px', maxWidth: '500px'}}>Welcome back. You are currently viewing the real-time analytics and management suite for Bharat Darshika.</p>
      </div>
      <div style={styles.livePulse}><div style={styles.pulseRing}/>LIVE DATA</div>
    </div>

    <div style={styles.statsGrid}>
      <StatBox label="TOTAL PLACES" count={counts.places} trend="Global Inventory" color="#FF7A00" onClick={() => setActiveTab('places')} />
      <StatBox label="ACTIVE STATES" count={counts.states} trend="Regional Coverage" color="#3B82F6" onClick={() => setActiveTab('states')} />
      <StatBox label="TOP CREATORS" count={counts.creators} trend="Verified Legends" color="#8B5CF6" onClick={() => setActiveTab('creators')} /> {/* 👈 హోమ్ పేజీలో కౌంట్ బాక్స్ */}
    </div>
  </div>
);

const StatBox = ({ label, count, trend, color, onClick }) => (
  <div style={styles.statBox} onClick={onClick}>
    <div style={{color: '#64748B', fontSize: '12px', fontWeight: '800', letterSpacing: '1px'}}>{label}</div>
    <div style={{fontSize: '36px', fontWeight: '800', margin: '10px 0', color: '#1E293B'}}>{count}</div>
    <div style={{fontSize: '12px', color: color, fontWeight: '700'}}>{trend}</div>
    <ChevronRight style={styles.boxIcon} size={20} />
  </div>
);

const NavButton = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} style={active ? styles.activeNav : styles.inactiveNav}>
    {icon} <span>{label}</span>
  </button>
);

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif" },
  sidebar: { width: '280px', backgroundColor: '#0F172A', padding: '30px 20px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 1200, transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '10px 0 30px rgba(0,0,0,0.1)' },
  sidebarHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '10px' },
  brandText: { color: '#fff', fontSize: '20px', fontWeight: '800', margin: 0 },
  sectionLabel: { color: '#475569', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '15px', paddingLeft: '15px' },
  navGroup: { display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 },
  activeNav: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '12px', backgroundColor: '#FF7A00', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '700', transition: '0.3s' },
  inactiveNav: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '12px', backgroundColor: 'transparent', color: '#94A3B8', border: 'none', cursor: 'pointer', fontWeight: '500', transition: '0.3s' },
  logoutNavItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'none', cursor: 'pointer', fontWeight: '700', marginTop: '5px', textAlign: 'left' },
  sidebarUser: { marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #1E293B' },
  userBadge: { display: 'flex', alignItems: 'center', backgroundColor: '#1E293B', padding: '12px', borderRadius: '16px', position: 'relative' },
  statusDot: { position: 'absolute', top: '12px', left: '42px', width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%', border: '2px solid #1E293B' },
  mainContent: { flex: 1, padding: '40px', transition: 'margin 0.4s' },
  mobileHeader: { display: window.innerWidth <= 1024 ? 'flex' : 'none', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', backgroundColor: '#fff', borderBottom: '1px solid #E2E8F0', position: 'fixed', top: 0, width: '100%', zIndex: 1100, boxSizing: 'border-box' },
  menuBtn: { border: 'none', background: 'none', cursor: 'pointer', color: '#0F172A' },
  contentHeader: { marginBottom: '40px', paddingTop: window.innerWidth <= 1024 ? '60px' : '0' },
  pageTitle: { fontSize: '28px', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-1px' },
  breadcrumb: { fontSize: '13px', color: '#94A3B8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' },
  heroBanner: { background: 'linear-gradient(135deg, #FF7A00 0%, #FF9533 100%)', color: '#fff', padding: '40px', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(255, 122, 0, 0.2)', marginBottom: '30px' },
  livePulse: { position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '900' },
  pulseRing: { width: '8px', height: '8px', backgroundColor: '#fff', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(255,255,255,0.3)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' },
  statBox: { backgroundColor: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.02)', cursor: 'pointer', transition: '0.3s', position: 'relative' },
  boxIcon: { position: 'absolute', right: '25px', bottom: '25px', color: '#E2E8F0' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', zIndex: 1150 }
};

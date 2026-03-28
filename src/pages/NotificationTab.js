import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Send, Users, BellRing, Info, Loader2 } from 'lucide-react';

export default function NotificationTab() {
  const [notif, setNotif] = useState({ title: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  // టోకెన్ల సంఖ్యను రియల్ టైమ్‌లో చూపిస్తుంది
  useEffect(() => {
    const fetchTokenCount = async () => {
      try {
        const snap = await getDocs(collection(db, "pushTokens"));
        setTokenCount(snap.docs.length);
      } catch (e) {
        console.error("Token Fetch Error:", e);
      }
    };
    fetchTokenCount();
  }, []);

  const sendNotif = async () => {
    if (!notif.title || !notif.message) {
      return alert("టైటిల్ మరియు మెసేజ్ రాయాలి బాసు! 📢");
    }

    setLoading(true);
    try {
      // 1. తాజా టోకెన్లను తెచ్చుకోవడం
      const snap = await getDocs(collection(db, "pushTokens"));
      const tokens = snap.docs.map(d => d.data().token).filter(t => t);
      
      if (tokens.length === 0) {
        throw new Error("డేటాబేస్‌లో టోకెన్లు ఏవీ దొరకలేదు!");
      }

      // 2. ఎక్స్‌పో పేలోడ్ సిద్ధం చేయడం
      const messages = tokens.map(t => ({ 
        to: t, 
        title: notif.title, 
        body: notif.message, 
        sound: 'default',
        data: { appName: "Bharat Darshika" }
      }));

      // 3. ఎక్స్‌పో API కి పంపడం
const response = await fetch('/api/expo/', { 
  method: 'POST',
  headers: { 
    'Accept': 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_EXPO_ACCESS_TOKEN}`
  },
  body: JSON.stringify(messages),
});

      // 4. రెస్పాన్స్ చెక్ చేయడం
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const resJson = await response.json();
      console.log("Expo Response:", resJson);

      alert(`బ్రహ్మాండం! ${tokens.length} మందికి నోటిఫికేషన్ వెళ్ళింది. 🚀`);
      setNotif({ title: '', message: '' });

    } catch (e) { 
      console.error("Push Error:", e);
      alert("Error: " + e.message + "\n\n(గమనిక: ఒకవేళ 'Failed to fetch' అని వస్తే బ్రౌజర్‌లో CORS ఎక్స్‌టెన్షన్ ఆన్ చెయ్ బాసు!)"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={nStyles.container}>
      {/* 📊 SUMMARY CARD */}
      <div style={nStyles.statsCard}>
        <div style={nStyles.statInfo}>
          <Users size={24} color="#FF7A00" />
          <div style={{marginLeft: '15px'}}>
            <div style={nStyles.statLabel}>Total Reach</div>
            <div style={nStyles.statValue}>{tokenCount} Registered Devices</div>
          </div>
        </div>
        <div style={nStyles.statusBadge}>System Active 🟢</div>
      </div>

      {/* 📢 BROADCAST FORM */}
      <div style={nStyles.formCard}>
        <div style={nStyles.header}>
          <BellRing size={22} color="#1E293B" />
          <h3 style={{margin: 0, fontSize: '18px'}}>Global Broadcast Service</h3>
        </div>

        <div style={nStyles.formBody}>
          <div style={nStyles.inputGroup}>
            <label style={nStyles.label}>Headline / Title</label>
            <input 
              style={nStyles.input} 
              placeholder="Ex: Special Hidden Gem Unveiled! 🚩" 
              value={notif.title}
              onChange={e => setNotif({...notif, title: e.target.value})} 
            />
          </div>

          <div style={nStyles.inputGroup}>
            <label style={nStyles.label}>Message Details</label>
            <textarea 
              style={{...nStyles.input, height: '120px', resize: 'none'}} 
              placeholder="Write the full notification content here..." 
              value={notif.message}
              onChange={e => setNotif({...notif, message: e.target.value})} 
            />
          </div>

          <div style={nStyles.infoBox}>
            <Info size={18} color="#3B82F6" />
            <span>This action will trigger an immediate push to all {tokenCount} users.</span>
          </div>

          <button 
            onClick={sendNotif} 
            disabled={loading} 
            style={{
              ...nStyles.sendBtn,
              backgroundColor: loading ? '#94A3B8' : '#FF7A00',
              transform: loading ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {loading ? "Transmitting..." : (
              <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                <Send size={18} /> Execute Blast 🚀
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles remain exactly as you provided for a consistent Corporate UI
const nStyles = {
  container: { maxWidth: '700px', margin: '0 auto', animation: 'fadeIn 0.5s ease-in' },
  statsCard: { 
    backgroundColor: '#fff', padding: '20px 30px', borderRadius: '20px', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #E2E8F0', marginBottom: '25px'
  },
  statInfo: { display: 'flex', alignItems: 'center' },
  statLabel: { fontSize: '12px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' },
  statValue: { fontSize: '18px', fontWeight: '800', color: '#1E293B' },
  statusBadge: { backgroundColor: '#F0FDF4', color: '#16A34A', padding: '6px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: '800' },
  formCard: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', overflow: 'hidden' },
  header: { padding: '25px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fff' },
  formBody: { padding: '30px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' },
  input: { 
    width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #E2E8F0', 
    backgroundColor: '#F8FAFC', outline: 'none', fontSize: '15px', fontWeight: '600', 
    color: '#1E293B', boxSizing: 'border-box', transition: '0.2s border'
  },
  infoBox: { 
    display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', 
    backgroundColor: '#EFF6FF', borderRadius: '12px', color: '#1E40AF', 
    fontSize: '13px', fontWeight: '500', marginBottom: '30px', lineHeight: '1.4'
  },
  sendBtn: { 
    width: '100%', padding: '18px', borderRadius: '14px', border: 'none', 
    color: '#fff', fontWeight: '800', fontSize: '16px',
    boxShadow: '0 10px 20px rgba(255, 122, 0, 0.2)', transition: '0.3s transform',
    cursor: 'pointer'
  }
};

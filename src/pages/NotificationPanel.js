import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // నీ firebaseConfig పాత్ ఒకసారి చెక్ చేసుకో
import { collection, getDocs } from 'firebase/firestore';
import { Bell, Send, Users, Smartphone, CheckCircle } from 'lucide-react';

export default function NotificationPanel() {
  const [notifData, setNotifData] = useState({ title: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  // 1. డేటాబేస్ లో ఎన్ని టోకెన్లు ఉన్నాయో లోడ్ అవ్వగానే చూపిస్తుంది
  useEffect(() => {
    const fetchTokenCount = async () => {
      try {
        const tokenSnap = await getDocs(collection(db, "pushTokens"));
        setTokenCount(tokenSnap.docs.length);
      } catch (e) {
        console.error("Error fetching tokens:", e);
      }
    };
    fetchTokenCount();
  }, []);

  // 2. అసలైన నోటిఫికేషన్ పంపే ఫంక్షన్
  const sendPushNotifications = async () => {
    if (!notifData.title || !notifData.message) {
      return alert("టైటిల్ మరియు మెసేజ్ కచ్చితంగా ఉండాలి బాస్! ✍️");
    }

    if (tokenCount === 0) {
      return alert("పంపడానికి టోకెన్లు ఏమీ లేవు. ఎవరూ ఇంకా యాప్ ఇన్స్టాల్ చేయలేదు! ❌");
    }

    const confirmSend = window.confirm(`${tokenCount} మంది యూజర్లకు నోటిఫికేషన్ పంపమంటావా?`);
    if (!confirmSend) return;

    setIsSending(true);
    try {
      // Firestore నుండి అన్ని టోకెన్లని తెచ్చుకుంటున్నాం
      const tokenSnap = await getDocs(collection(db, "pushTokens"));
      const tokens = tokenSnap.docs.map(doc => doc.data().token);

      // Expo Push API కి పంపాల్సిన మెసేజ్ డేటా
      const messages = tokens.map(token => ({
        to: token,
        sound: 'default',
        title: notifData.title,
        body: notifData.message,
        data: { screen: '/' }, // క్లిక్ చేస్తే నేరుగా హోమ్ కి వచ్చేలా మనం యాప్ లో రాసిన లాజిక్
      }));

      // Expo సర్వర్ కి POST రిక్వెస్ట్ పంపుతున్నాం
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert("✅ సక్సెస్! అందరి ఫోన్లలో భారత్ దర్శిక నోటిఫికేషన్ మోగింది! 🔔");
        setNotifData({ title: '', message: '' });
      } else {
        throw new Error("Expo API Error");
      }

    } catch (error) {
      console.error("Notification Error:", error);
      alert("❌ ఏదో తప్పు జరిగింది! నెట్వర్క్ లేదా టోకెన్ల సమస్య కావచ్చు.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={styles.bulkWrapper}>
      <div style={styles.bulkCard}>
        {/* Header Section */}
        <div style={styles.iconCircle}>
          <Bell size={35} color="#FF7A00" />
        </div>
        <h2 style={styles.heading}>Global Notifications 🌍</h2>
        <p style={styles.subHeading}>మీరు పంపే ప్రతి మెసేజ్ యూజర్లందరికీ ఇన్స్టంట్ గా వెళ్తుంది.</p>

        {/* Stats Badge */}
        <div style={styles.statsBadge}>
          <Smartphone size={16} />
          <span>Active Devices: <b>{tokenCount}</b></span>
        </div>

        {/* Form Section */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Notification Title</label>
          <input 
            placeholder="ఉదా: కొత్త హిడెన్ జెమ్ యాడ్ అయింది! 🚩" 
            value={notifData.title}
            onChange={e => setNotifData({...notifData, title: e.target.value})}
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Message Body</label>
          <textarea 
            placeholder="యూజర్లకు కనిపించాల్సిన వివరాలు ఇక్కడ రాయండి..." 
            value={notifData.message}
            onChange={e => setNotifData({...notifData, message: e.target.value})}
            style={styles.textarea} 
          />
        </div>

        {/* Send Button */}
        <button 
          onClick={sendPushNotifications} 
          disabled={isSending}
          style={{
            ...styles.sendBtn, 
            backgroundColor: isSending ? '#94A3B8' : '#1E293B',
            cursor: isSending ? 'not-allowed' : 'pointer'
          }}
        >
          {isSending ? "Sending... 🚀" : "Broadcast Notification"}
          {!isSending && <Send size={18} style={{marginLeft: '10px'}} />}
        </button>

        {/* Tip Section */}
        <div style={styles.tipBox}>
          <CheckCircle size={14} color="#10B981" />
          <span>క్లిక్ చేస్తే యూజర్ హోమ్ స్క్రీన్ కి వెళ్తారు.</span>
        </div>
      </div>
    </div>
  );
}

// 🎨 నీ అడ్మిన్ ప్యానెల్ థీమ్ కి మ్యాచ్ అయ్యే స్టైల్స్
const styles = {
  bulkWrapper: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    padding: '20px'
  },
  bulkCard: { 
    backgroundColor: '#fff', 
    padding: '40px', 
    borderRadius: '32px', 
    textAlign: 'center', 
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)', 
    maxWidth: '550px', 
    width: '100%',
    border: '1px solid #F1F5F9'
  },
  iconCircle: { 
    width: '80px', height: '80px', borderRadius: '24px', backgroundColor: '#FFF7ED', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 24px' 
  },
  heading: { color: '#0F172A', fontSize: '26px', margin: '0 0 8px 0', fontWeight: '800' },
  subHeading: { color: '#64748B', fontSize: '15px', marginBottom: '28px', lineHeight: '1.5' },
  statsBadge: { 
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', 
    backgroundColor: '#F1F5F9', borderRadius: '14px', fontSize: '13px', 
    color: '#334155', marginBottom: '30px' 
  },
  inputGroup: { textAlign: 'left', marginBottom: '24px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '8px', marginLeft: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { 
    width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', 
    fontSize: '15px', fontWeight: '600', backgroundColor: '#F8FAFC', outline: 'none', boxSizing: 'border-box', transition: '0.2s focus'
  },
  textarea: { 
    width: '100%', height: '120px', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', 
    fontSize: '15px', fontWeight: '600', backgroundColor: '#F8FAFC', outline: 'none', boxSizing: 'border-box', resize: 'none'
  },
  sendBtn: { 
    width: '100%', border: 'none', padding: '20px', borderRadius: '18px', 
    color: '#fff', fontWeight: '800', fontSize: '16px', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s ease',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  tipBox: {
    marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '6px', fontSize: '12px', color: '#64748B', fontWeight: '600'
  }
};

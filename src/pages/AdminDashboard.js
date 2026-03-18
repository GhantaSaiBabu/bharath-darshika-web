import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { 
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, writeBatch 
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { 
  Edit3, Trash2, Layers, LogOut, ChevronDown, ChevronRight, 
  Search, Navigation, Map, Image as ImageIcon, CheckCircle, UploadCloud, FileJson,
  Bell, Send 
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activeTab, setActiveTab] = useState('places'); 
  const [expandedZones, setExpandedZones] = useState({ "South India": true });

  // 📝 Combined Form Data
  const [formData, setFormData] = useState({
    name: '', state: '', zone: 'South India', category: 'Hidden Gems', 
    history: '', mystery: '', img: '', location: '', nearby_attractions: '', 
    rentora_suitable: 'No', is_hidden_gem: false, yt_link: '',
    quote: '', capital: ''
  });

  // 🔔 Notification States
  const [notifData, setNotifData] = useState({ title: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const zones = ['South India', 'North India', 'West India', 'East India', '💎 Hidden Gems'];
  const zoneMapping = { "South India": "z1", "North India": "z2", "West India": "z3", "East India": "z4" };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/login');
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const pSnap = await getDocs(collection(db, "Places"));
      const gSnap = await getDocs(collection(db, "HiddenGems"));
      const sSnap = await getDocs(collection(db, "States"));
      
      const combinedPlaces = [
        ...pSnap.docs.map(d => ({ id: d.id, ...d.data(), is_hidden_gem: false })),
        ...gSnap.docs.map(d => ({ id: d.id, ...d.data(), is_hidden_gem: true }))
      ];
      setPlaces(combinedPlaces);
      setStatesList(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error("Fetch Error:", e); }
    setLoading(false);
  };

  // 🚀 Notification Logic
  const sendPushNotifications = async () => {
    if (!notifData.title || !notifData.message) return alert("Title and Message are required!");
    setIsSending(true);
    try {
      const tokenSnap = await getDocs(collection(db, "pushTokens"));
      const tokens = tokenSnap.docs.map(doc => doc.data().token);
      if (tokens.length === 0) {
        alert("డేటాబేస్ లో టోకెన్లు లేవు బాస్!");
        setIsSending(false);
        return;
      }
      const messages = tokens.map(token => ({
        to: token,
        sound: 'default',
        title: notifData.title,
        body: notifData.message,
        data: { screen: '/' }, 
      }));
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages),
      });
      alert("✅ అందరికీ నోటిఫికేషన్ వెళ్ళిపోయింది బొస్సు!");
      setNotifData({ title: '', message: '' });
    } catch (error) {
      alert("❌ ఏదో తప్పు జరిగింది!");
    }
    setIsSending(false);
  };

  // 📂 Bulk Upload Logic
  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (!Array.isArray(jsonData)) return alert("JSON ఫైల్ Array ఫార్మాట్‌లో ఉండాలి బాస్!");
        
        const batch = writeBatch(db);
        jsonData.forEach((item) => {
          const colName = item.is_hidden_gem ? "HiddenGems" : "Places";
          const newDocRef = doc(collection(db, colName));
          batch.set(newDocRef, item);
        });
        await batch.commit();
        alert("✅ Bulk Data Uploaded Successfully! 🎯");
        fetchData();
      } catch (err) {
        alert("❌ Error parsing JSON file!");
      }
    };
    reader.readAsText(file);
  };

  const handleSave = async () => {
    if (!formData.name) return alert("పేరు తప్పనిసరి బొస్సు!");
    try {
      if (activeTab === 'places') {
        const targetCol = formData.is_hidden_gem ? "HiddenGems" : "Places";
        const data = { ...formData, zone: formData.is_hidden_gem ? "North India" : formData.zone };
        if (isEditing) await updateDoc(doc(db, targetCol, currentId), data);
        else await addDoc(collection(db, targetCol), data);
      } else {
        const stateData = { 
          name: formData.name, capital: formData.capital, 
          quote: formData.quote, img: formData.img, 
          zoneId: zoneMapping[formData.zone] || "z1" 
        };
        if (isEditing) await updateDoc(doc(db, "States", currentId), stateData);
        else await addDoc(collection(db, "States"), stateData);
      }
      alert("సక్సెస్ ఫుల్ గా సేవ్ అయ్యింది! 🎯");
      resetForm(); fetchData();
    } catch (e) { alert(e.message); }
  };

  const resetForm = () => {
    setFormData({ name: '', state: '', zone: 'South India', category: 'Hidden Gems', history: '', mystery: '', img: '', location: '', nearby_attractions: '', rentora_suitable: 'No', is_hidden_gem: false, yt_link: '', quote: '', capital: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm("డిలీట్ చేయమంటావా బాస్?")) {
      const col = type === 'gem' ? "HiddenGems" : type === 'state' ? "States" : "Places";
      await deleteDoc(doc(db, col, id));
      fetchData();
    }
  };

  const getFilteredPlaces = (zoneName) => {
    return places.filter(p => {
      const match = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.state.toLowerCase().includes(searchTerm.toLowerCase());
      if (zoneName === '💎 Hidden Gems') return p.is_hidden_gem && match;
      return (p.zone || 'South India') === zoneName && !p.is_hidden_gem && match;
    });
  };

  if (loading) return <div style={styles.loader}>డేటా లోడ్ అవుతోంది... ⏳</div>;

  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <div style={styles.brand}><Layers color="#FF7A00" size={28} /> <h2>Darshika <span style={{color: '#94A3B8'}}>CMS</span></h2></div>
        <div style={styles.tabContainer}>
            <button onClick={() => {setActiveTab('places'); resetForm();}} style={activeTab === 'places' ? styles.activeTab : styles.inactiveTab}><Navigation size={18}/> Manage Places</button>
            <button onClick={() => {setActiveTab('states'); resetForm();}} style={activeTab === 'states' ? styles.activeTab : styles.inactiveTab}><Map size={18}/> Manage States</button>
            <button onClick={() => {setActiveTab('bulk');}} style={activeTab === 'bulk' ? styles.activeTab : styles.inactiveTab}><UploadCloud size={18}/> Bulk Upload</button>
            <button onClick={() => {setActiveTab('notifications');}} style={activeTab === 'notifications' ? styles.activeTab : styles.inactiveTab}><Bell size={18}/> Notifications</button>
        </div>
        <div style={styles.searchWrap}>
          <Search size={18} color="#94A3B8" />
          <input placeholder="Search Database..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.search} />
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/login'); }} style={styles.logout}><LogOut size={20} /></button>
      </div>

      <div style={styles.wrapper}>
        {/* 🛠️ FORM SIDE (Only for Places & States) */}
        {activeTab !== 'notifications' && activeTab !== 'bulk' && (
          <div style={styles.formSide}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                  <h3 style={{margin: 0}}>{isEditing ? "✏️ Edit Record" : "➕ Add Entry"}</h3>
                  <span style={styles.tabIndicator}>{activeTab.toUpperCase()}</span>
              </div>
              <div style={styles.formGrid}>
                <div style={{gridColumn: 'span 2'}}>
                    <label style={styles.label}>{activeTab === 'places' ? "Place Name" : "State Name"}</label>
                    <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} />
                </div>
                <div>
                    <label style={styles.label}>{activeTab === 'places' ? "State" : "Capital"}</label>
                    <input value={activeTab === 'places' ? formData.state : formData.capital} onChange={e => setFormData({...formData, [activeTab === 'places' ? 'state' : 'capital']: e.target.value})} style={styles.input} />
                </div>
                <div>
                    <label style={styles.label}>Zone</label>
                    <select value={formData.zone} onChange={e => setFormData({...formData, zone: e.target.value})} style={styles.input}>
                      {zones.filter(z => z !== '💎 Hidden Gems').map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                </div>
                <div style={{gridColumn: 'span 2'}}>
                    <label style={styles.label}>Image URL</label>
                    <input value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} style={styles.input} />
                </div>
              </div>
              {activeTab === 'places' ? (
                <>
                  <label style={styles.label}>History/Mystery</label>
                  <textarea value={formData.history} style={styles.textarea} onChange={e => setFormData({...formData, history: e.target.value})} />
                </>
              ) : (
                <>
                  <label style={styles.label}>State Quote</label>
                  <input value={formData.quote} style={styles.input} onChange={e => setFormData({...formData, quote: e.target.value})} />
                </>
              )}
              <div style={styles.btnRow}>
                <button onClick={handleSave} style={styles.saveBtn}>{isEditing ? "Update Data" : "Save to Firebase"}</button>
                {isEditing && <button onClick={resetForm} style={styles.cancelBtn}>Cancel</button>}
              </div>
            </div>
          </div>
        )}

        {/* 📊 DATA LIST / BULK / NOTIFICATIONS SIDE */}
        <div style={(activeTab === 'notifications' || activeTab === 'bulk') ? styles.bulkWrapper : styles.listSide}>
          
          {/* 📂 BULK UPLOAD PANEL */}
          {activeTab === 'bulk' && (
            <div style={styles.bulkCard}>
              <div style={{width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px'}}>
                <FileJson size={32} color="#475569" />
              </div>
              <h2 style={{color: '#1E293B', marginBottom: '10px'}}>Bulk JSON Upload 🚀</h2>
              <p style={{color: '#64748B', marginBottom: '30px', fontSize: '14px'}}>JSON ఫైల్‌ని అప్‌లోడ్ చేసి డేటాను ఒకేసారి సెట్ చేయండి.</p>
              <input type="file" accept=".json" onChange={handleBulkUpload} style={{border: '2px dashed #CBD5E1', padding: '30px', borderRadius: '20px', width: '100%', cursor: 'pointer'}} />
            </div>
          )}

          {/* 🔔 NOTIFICATION PANEL */}
          {activeTab === 'notifications' && (
            <div style={styles.bulkCard}>
              <div style={{width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px'}}>
                <Bell size={32} color="#FF7A00" />
              </div>
              <h2 style={{color: '#1E293B', marginBottom: '10px'}}>Send Notification 🔔</h2>
              <p style={{color: '#64748B', marginBottom: '30px', fontSize: '14px'}}>యాప్ యూజర్లందరికీ ఒకేసారి మెసేజ్ పంపండి.</p>
              <div style={{textAlign: 'left', marginBottom: '15px'}}>
                <label style={styles.label}>Title</label>
                <input placeholder="Notification Title..." value={notifData.title} onChange={e => setNotifData({...notifData, title: e.target.value})} style={styles.input} />
              </div>
              <div style={{textAlign: 'left', marginBottom: '20px'}}>
                <label style={styles.label}>Message</label>
                <textarea placeholder="Notification Body..." value={notifData.message} onChange={e => setNotifData({...notifData, message: e.target.value})} style={styles.textarea} />
              </div>
              <button onClick={sendPushNotifications} disabled={isSending} style={{...styles.saveBtn, backgroundColor: isSending ? '#94A3B8' : '#FF7A00', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                {isSending ? "Sending... 🚀" : "Broadcast Notification"} {!isSending && <Send size={18} />}
              </button>
            </div>
          )}

          {/* Existing Lists */}
          {activeTab === 'places' && zones.map(zone => {
            const items = getFilteredPlaces(zone);
            return (
              <div key={zone} style={styles.accordion}>
                <div onClick={() => setExpandedZones(p => ({...p, [zone]: !p[zone]}))} style={styles.accHead}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    {expandedZones[zone] ? <ChevronDown size={20} color="#0F4C81"/> : <ChevronRight size={20} color="#64748B"/>}
                    <span style={{fontWeight: '800', color: '#1E293B'}}>{zone}</span>
                    <span style={styles.badge}>{items.length}</span>
                  </div>
                </div>
                {expandedZones[zone] && (
                  <div style={styles.accBody}>
                    {items.map(item => (
                      <div key={item.id} style={styles.itemRow}>
                        <img src={item.img} style={styles.thumb} alt="" />
                        <div style={{flex: 1}}>
                          <div style={{fontWeight: '700', fontSize: '14px', color: '#0F4C81'}}>{item.name}</div>
                          <div style={{fontSize: '11px', color: '#94A3B8'}}>{item.state}</div>
                        </div>
                        <div style={styles.actionBtns}>
                          <button onClick={() => { setFormData(item); setCurrentId(item.id); setIsEditing(true); window.scrollTo(0,0); }} style={styles.editBtn}><Edit3 size={16}/></button>
                          <button onClick={() => handleDelete(item.id, item.is_hidden_gem ? 'gem' : 'place')} style={styles.delBtn}><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {activeTab === 'states' && (
              <div style={styles.stateContainer}>
                {statesList.map(st => (
                    <div key={st.id} style={styles.stateCard}>
                        <img src={st.img} style={styles.stateImg} alt="" />
                        <div style={styles.stateOverlay}>
                            <div style={{flex: 1}}>
                                <div style={styles.stTitle}>{st.name}</div>
                                <div style={styles.stCap}>{st.capital}</div>
                            </div>
                            <div style={styles.stActions}>
                                <button onClick={() => { setFormData({...st, zone: Object.keys(zoneMapping).find(k => zoneMapping[k] === st.zoneId)}); setCurrentId(st.id); setIsEditing(true); window.scrollTo(0,0); }} style={styles.stEdit}><Edit3 size={14}/></button>
                                <button onClick={() => handleDelete(st.id, 'state')} style={styles.stDel}><Trash2 size={14}/></button>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 4%', backgroundColor: '#fff', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 1000 },
  brand: { display: 'flex', alignItems: 'center', gap: '10px' },
  tabContainer: { display: 'flex', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '12px' },
  activeTab: { border: 'none', backgroundColor: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '800', color: '#FF7A00', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  inactiveTab: { border: 'none', backgroundColor: 'transparent', padding: '10px 20px', borderRadius: '10px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  searchWrap: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F1F5F9', padding: '10px 18px', borderRadius: '14px', flex: 0.4 },
  search: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: '600' },
  logout: { backgroundColor: '#FEF2F2', border: 'none', padding: '10px', borderRadius: '12px', color: '#EF4444', cursor: 'pointer' },
  wrapper: { display: 'grid', gridTemplateColumns: '420px 1fr', gap: '30px', padding: '30px 4%' },
  formSide: { position: 'sticky', top: '100px', height: 'fit-content' },
  card: { backgroundColor: '#fff', padding: '25px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  tabIndicator: { backgroundColor: '#FF7A0015', color: '#FF7A00', padding: '4px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: '900' },
  label: { display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748B', marginBottom: '6px', marginLeft: '4px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
  input: { width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '14px', backgroundColor: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontWeight: '600' },
  textarea: { width: '100%', height: '120px', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '15px', boxSizing: 'border-box', backgroundColor: '#F8FAFC', outline: 'none', fontWeight: '600' },
  saveBtn: { flex: 1, backgroundColor: '#1E293B', color: '#fff', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', transition: '0.3s' },
  cancelBtn: { backgroundColor: '#CBD5E1', color: '#475569', border: 'none', padding: '16px', borderRadius: '14px', cursor: 'pointer', marginLeft: '10px', fontWeight: '800' },
  btnRow: { display: 'flex' },
  listSide: { display: 'block' },
  accordion: { backgroundColor: '#fff', borderRadius: '20px', marginBottom: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' },
  accHead: { padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#F1F5F9', padding: '4px 12px', borderRadius: '10px', fontSize: '12px', color: '#0F4C81', fontWeight: '800' },
  accBody: { padding: '0 20px 20px 20px' },
  itemRow: { display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 0', borderBottom: '1px solid #F8FAFC' },
  thumb: { width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' },
  actionBtns: { display: 'flex', gap: '8px' },
  editBtn: { background: '#F0F9FF', border: 'none', color: '#0369A1', padding: '8px', borderRadius: '10px', cursor: 'pointer' },
  delBtn: { background: '#FEF2F2', border: 'none', color: '#EF4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' },
  stateContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  stateCard: { height: '160px', borderRadius: '24px', overflow: 'hidden', position: 'relative', elevation: 5 },
  stateImg: { width: '100%', height: '100%', objectFit: 'cover' },
  stateOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', flexDirection: 'row', display: 'flex', alignItems: 'center' },
  stTitle: { color: '#fff', fontWeight: '900', fontSize: '16px' },
  stCap: { color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '600' },
  stActions: { display: 'flex', gap: '6px' },
  stEdit: { backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '6px', borderRadius: '8px', cursor: 'pointer' },
  stDel: { backgroundColor: 'rgba(239,68,68,0.2)', border: 'none', color: '#FCA5A5', padding: '6px', borderRadius: '8px', cursor: 'pointer' },
  loader: { textAlign: 'center', padding: '100px', fontSize: '18px', fontWeight: '800', color: '#0F4C81' },
  bulkWrapper: { gridColumn: 'span 2', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
  bulkCard: { backgroundColor: '#fff', padding: '50px', borderRadius: '35px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', maxWidth: '500px', border: '1px solid #E2E8F0', width: '100%' }
};

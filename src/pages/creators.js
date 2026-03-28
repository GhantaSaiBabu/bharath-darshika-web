import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { 
  collection, onSnapshot, addDoc, deleteDoc, 
  updateDoc, doc, query, orderBy, serverTimestamp 
} from 'firebase/firestore';
import { 
  Trash2, Edit3, Youtube, Instagram, 
  ExternalLink, UserPlus, XCircle, CheckCircle, PlusCircle 
} from 'lucide-react';

export default function CreatorsTab() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // 👈 ఏ క్రియేటర్ ని ఎడిట్ చేస్తున్నామో గుర్తుపెట్టుకోవడానికి
  
  const [form, setForm] = useState({ 
    name: '', platform: 'YouTube', fans: '', img: '', link: '' 
  });

  // 1. 📖 READ: డేటాని ఫైర్‌స్టోర్ నుండి తెచ్చుకోవడం
  useEffect(() => {
    const q = query(collection(db, "Creators"), orderBy("fans", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setCreators(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  // 2. 📝 SAVE (Add or Update): డేటాని సేవ్ చేయడం
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE ఆపరేషన్
        await updateDoc(doc(db, "Creators", editingId), form);
        alert("Creator details updated, Boss! ✅");
      } else {
        // ADD ఆపరేషన్
        await addDoc(collection(db, "Creators"), {
          ...form,
          created_at: serverTimestamp()
        });
        alert("New Legend added to the Hub! 🚀");
      }
      resetForm();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // 3. ✍️ EDIT: ఎడిట్ మోడ్ స్టార్ట్ చేయడం
  const startEdit = (creator) => {
    setForm({ 
        name: creator.name, 
        platform: creator.platform, 
        fans: creator.fans, 
        img: creator.img, 
        link: creator.link 
    });
    setEditingId(creator.id);
    // పేజీ పైకి వెళ్తుంది, అప్పుడు ఈజీగా ఎడిట్ చేయొచ్చు
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. 🗑️ DELETE: క్రియేటర్ ని తీసేయడం
  const handleDelete = async (id, name) => {
    if (window.confirm(`Boss, are you sure you want to remove "${name}" from the Hub?`)) {
      try {
        await deleteDoc(doc(db, "Creators", id));
        alert("Deleted successfully! 🗑️");
      } catch (err) {
        alert("Delete error: " + err.message);
      }
    }
  };

  const resetForm = () => {
    setForm({ name: '', platform: 'YouTube', fans: '', img: '', link: '' });
    setEditingId(null);
  };

  return (
    <div style={styles.tabContainer}>
      {/* --- FORM SECTION --- */}
      <div style={{...styles.formSection, borderColor: editingId ? '#FF7A00' : '#F1F5F9'}}>
        <div style={styles.sectionHeader}>
          {editingId ? <Edit3 size={20} color="#FF7A00" /> : <UserPlus size={20} color="#FF7A00" />}
          <h3 style={styles.sectionTitle}>{editingId ? 'Update Profile' : 'Add New Legend'}</h3>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.formGrid}>
          <div style={styles.inputBox}>
            <label style={styles.label}>Name</label>
            <input style={styles.input} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Platform</label>
            <select style={styles.input} value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
              <option value="YouTube">YouTube</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Fans/Followers</label>
            <input style={styles.input} value={form.fans} onChange={e => setForm({...form, fans: e.target.value})} required />
          </div>

          <div style={{...styles.inputBox, gridColumn: 'span 2'}}>
            <label style={styles.label}>Channel Link</label>
            <input style={styles.input} value={form.link} onChange={e => setForm({...form, link: e.target.value})} required />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Image URL</label>
            <input style={styles.input} value={form.img} onChange={e => setForm({...form, img: e.target.value})} required />
          </div>

          <div style={styles.buttonArea}>
            {editingId && (
              <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                <XCircle size={16} /> Cancel
              </button>
            )}
            <button type="submit" style={styles.submitBtn}>
              {editingId ? <CheckCircle size={16} /> : <PlusCircle size={16} />}
              {editingId ? ' Save Changes' : ' Add to Hub'}
            </button>
          </div>
        </form>
      </div>

      {/* --- LIVE GRID --- */}
      <div style={styles.grid}>
        {creators.map(c => (
          <div key={c.id} style={{...styles.card, opacity: editingId === c.id ? 0.5 : 1}}>
            <img src={c.img} style={styles.cardImg} alt="creator" />
            <div style={styles.cardContent}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                 <h4 style={styles.nameText}>{c.name}</h4>
                 {c.platform === 'YouTube' ? <Youtube size={16} color="#FF0000" /> : <Instagram size={16} color="#E1306C" />}
              </div>
              <p style={styles.fansText}>{c.fans} Followers</p>
              
              <div style={styles.actionRow}>
                <button onClick={() => startEdit(c)} style={styles.editIconBtn} title="Edit"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(c.id, c.name)} style={styles.deleteIconBtn} title="Delete"><Trash2 size={16} /></button>
                <a href={c.link} target="_blank" rel="noreferrer" style={styles.linkIconBtn} title="Visit"><ExternalLink size={16} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  tabContainer: { animation: 'fadeIn 0.5s ease' },
  formSection: { backgroundColor: '#fff', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '30px', border: '2px solid #F1F5F9' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  sectionTitle: { fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' },
  inputBox: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', outline: 'none' },
  buttonArea: { gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  submitBtn: { display: 'flex', alignItems: 'center', gap: '5px', padding: '12px 25px', borderRadius: '10px', backgroundColor: '#FF7A00', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' },
  cancelBtn: { display: 'flex', alignItems: 'center', gap: '5px', padding: '12px 25px', borderRadius: '10px', backgroundColor: '#F1F5F9', color: '#64748B', border: 'none', fontWeight: '700', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid #F1F5F9', transition: '0.3s' },
  cardImg: { width: '100%', height: '130px', objectFit: 'cover' },
  cardContent: { padding: '15px' },
  nameText: { fontSize: '16px', fontWeight: '800', color: '#1E293B', margin: 0 },
  fansText: { fontSize: '12px', color: '#94A3B8', fontWeight: '600', marginBottom: '15px' },
  actionRow: { display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '12px' },
  editIconBtn: { flex: 1, height: '35px', borderRadius: '8px', border: 'none', backgroundColor: '#F0F9FF', color: '#3B82F6', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  deleteIconBtn: { flex: 1, height: '35px', borderRadius: '8px', border: 'none', backgroundColor: '#FEF2F2', color: '#EF4444', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  linkIconBtn: { width: '35px', height: '35px', borderRadius: '8px', border: 'none', backgroundColor: '#F8FAFC', color: '#64748B', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }
};

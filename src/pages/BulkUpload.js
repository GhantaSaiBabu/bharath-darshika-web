import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { FileJson, CheckCircle, AlertCircle } from 'lucide-react';

export default function BulkUpload({ refresh }) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (event) => {
      try {
        setUploading(true);
        setStatus('Reading File...');
        const json = JSON.parse(event.target.result);
        
        const batch = writeBatch(db);
        json.forEach((place) => {
          const newDocRef = doc(collection(db, "Places"));
          batch.set(newDocRef, place);
        });

        await batch.commit();
        setStatus('Success! All places uploaded 🎉');
        refresh();
      } catch (err) {
        setStatus('Error: JSON format invalid!');
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div style={styles.card}>
      <FileJson size={48} color="#FF7A00" />
      <h3 style={{margin: '15px 0'}}>Bulk Places Upload</h3>
      <p style={{color: '#64748B', fontSize: '14px', marginBottom: '20px'}}>
        Upload a JSON file containing an array of heritage places.
      </p>
      
      <input type="file" accept=".json" onChange={handleFileUpload} style={styles.fileInput} />
      
      {uploading && <p style={{color: '#0F4C81', fontWeight: '800'}}>Uploading... Don't close window.</p>}
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '30px', textAlign: 'center', maxWidth: '500px', margin: '40px auto', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  fileInput: { border: '2px dashed #CBD5E1', padding: '20px', borderRadius: '20px', width: '100%', boxSizing: 'border-box' },
  status: { marginTop: '20px', fontWeight: '700', color: '#059669' }
};

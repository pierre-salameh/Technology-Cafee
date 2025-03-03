import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShowComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/complaints');
      setComplaints(response.data); 
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError('حدث خطأ أثناء جلب الشكاوى');
    }
  }

 
  async function deleteAllComplaints() {
    try {
      await axios.delete('http://127.0.0.1:8000/api/complaints');
      setComplaints([]);
      setMessage('تم حذف جميع الشكاوى بنجاح');
    } catch (err) {
      console.error('Error deleting complaints:', err);
      setMessage('حدث خطأ أثناء حذف الشكاوى');
    }
  }

  
  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{textAlign:'center'}}>Show Complaints </h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: message.includes('نجاح') ? 'green' : 'red' }}>{message}</p>}

      {complaints.length === 0 ? (
        <p style={{textAlign:'center'}}>There are no Complaints currently</p>
      ) : (
        <>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Id</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Text</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{complaint.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{complaint.complaint_text}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                    {formatDate(complaint.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <br></br>
      <button
            onClick={deleteAllComplaints}
            className='btn'
            style={{marginLeft:'400px'}}
          >
            Delete All Complaints
          </button>
    </div>
  );
}

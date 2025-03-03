import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import backgroundImage from '../../Image/pic.jpg';
import Header from '../../component/header';
import "./complaints.css";

export default function Complaint() {
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");

  
  async function submitComplaint(complaintText) {

    const cookie = new Cookies();
  const token = cookie.get("Bearer");
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/complaints', {
            headers: {
                Authorization: "Bearer " + token,
              },
            complaint_text: complaintText,
        });
        setMessage('تم إرسال الشكوى بنجاح'); 
    } catch (error) {
        console.error('Error submitting complaint:', error);
        setMessage('حدث خطأ أثناء إرسال الشكوى'); 
    }
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    submitComplaint(complaint); 
    setComplaint(""); 
  }

  return (
    
    <div>
        <Header />
        <div
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    filter: 'contrast(1.2) brightness(1.1)', 
    
  }}
>
  <div
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      padding: '30px',
      borderRadius: '10px',
      textAlign: 'center',
      maxWidth: '500px',
      width: '90%',
      backdropFilter: 'blur(5px)', 
      marginTop: '40px',
    }}
  >
    <h2 style={{ marginBottom: '20px', color: 'white' ,textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Submit a Complaint</h2>
    <p style={{ marginBottom: '20px', fontSize: '16px', color: 'white' }}>
      We will endeavor to resolve this Complaint as quickly as possible...
    </p>
    <form onSubmit={handleSubmit}>
      
      <label htmlFor="complaint" style={{ textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px ',display: 'block', marginBottom: '10px', color: 'white',backgroundColor: 'transparent' }}>
        Complaint:
      </label>
      <textarea
        id="complaint"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        placeholder="اكتب شكواك هنا..."
        rows="6"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '2px solid #4b2e1e',
          outline: 'none',
          resize: 'none',
          backgroundColor: 'transparent', 
          color: 'white',
          direction: 'rtl', 
          textAlign: 'right',
        }}
        required
      />
      <button
        type="submit"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#4b2e1e', 
          color: '#fff', 
          cursor: 'pointer',
          transition: '0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#3a2114')} 
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4b2e1e')}
      >
        Submit a Complaint
      </button>
    </form>
    
    {message && (
      <p style={{ marginTop: '20px', fontSize: '14px', color: message.includes("نجاح") ? '#0f0' : '#f00' }}>
        {message}
      </p>
    )}

<p
      style={{
        marginTop: '20px',
        fontSize: '16px',
        color: 'white',
     
      }}
    >
        <span style={{fontWeight:'bold'}}>Note:</span>
        <br></br><br></br>
      If you have a problem with this Coffee, it is important that you tell us about it..
      However, if you have a problem with this application, Then at most this problem is yours..<br></br>
      Because the application creator does not make mistakes.<br></br>
      Thank you for Coming..

    </p>
  </div>
</div>

    </div>
  );
}

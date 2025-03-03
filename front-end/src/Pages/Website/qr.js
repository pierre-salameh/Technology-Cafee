import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Qr({ tableId = 1 }) {
    
    const loginUrl = `http://localhost:3000/welcome?table_id=${tableId}`;

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h3>QR Code for Table {tableId}</h3>
            
            <QRCodeCanvas value={loginUrl} size={128} />
        </div>
    );
}

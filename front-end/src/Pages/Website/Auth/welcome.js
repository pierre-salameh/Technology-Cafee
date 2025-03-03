import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../component/header";
import "./welcome.css";

import Snowfall from 'react-snowfall';

export default function Welcome() {
    const [tableId, setTableId] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tableIdFromQR = queryParams.get("table_id");

        
        if (tableIdFromQR) {
            setTableId(tableIdFromQR);
            localStorage.setItem("tableId", tableIdFromQR); 
        } else {
            
            const storedTableId = localStorage.getItem("tableId");
            setTableId(storedTableId || 1); 
        }
    }, []);

    const handleRegisterClick = () => {
        nav(`/register?table_id=${tableId}`);
    };

    const handleLoginClick = () => {
        nav(`/login?table_id=${tableId}`);
    };

    return (
        <div>
        
        <Snowfall/>
            <Header />
            <div className="street-lamp">
  <div className="light-beam"></div>
</div>
            
            <div className="welcome-container"    

>
                <div className="welcome-box" 
 >
                    <h2 style={{color:"white"}}>Welcome To PeeRaNo DeliCafé..</h2>
                    <p >الطاولة {tableId} جاهزة لاستقبالك. قم بتسجيل الدخول أو إنشاء حساب لبدء الطلب</p>
                    <div className="welcome-buttons">
                        <button  className="btnn welcome-register" onClick={handleRegisterClick}>إنشاء حساب</button>
                        <button  className="btnn welcome-login" onClick={handleLoginClick}>تسجيل الدخول</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

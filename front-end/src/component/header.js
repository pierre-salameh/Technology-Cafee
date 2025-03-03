import axios from "axios";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const cookie = new Cookies();
    const location = useLocation();
    const navigate = useNavigate();
    const token = cookie.get("Bearer");

    const [isTokenAvailable, setIsTokenAvailable] = useState(!!token);

    useEffect(() => {
        setIsTokenAvailable(!!cookie.get("Bearer"));
    }, [location.pathname]);

    async function handlelogout() {
        try {
            await axios.post("http://127.0.0.1:8000/api/logout", null, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            cookie.remove("Bearer");
            setIsTokenAvailable(false);
            navigate("/welcome");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const isHomePage = location.pathname === '/home';
    const isRegisterPage = location.pathname === '/register';
    const isLoginPage = location.pathname === '/login';
    const isWelcomePage = location.pathname === '/welcome';
    const isComplaintsPage = location.pathname === '/complaints';
    const isGamePage = location.pathname === '/game';
   

    
    const shouldShowLogout = isTokenAvailable && !isLoginPage && !isRegisterPage && !isWelcomePage;

    return (
        <nav style={{
            zIndex: '10000',
            padding: '15px 30px',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#f5f5f5',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' ,textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px'  }}>PeeRaNo DeliCafé..</span>

            <div style={{ display: 'flex', gap: '10px' }}>
                {isComplaintsPage && isTokenAvailable &&(
                    <Link to="/home" style={linkStyle}>
                        Home
                    </Link>
                )}

                {isHomePage && isTokenAvailable && (
                    <Link to="/complaints" style={linkStyle}>
                        Complaints
                    </Link>
                )}
                  {isHomePage && isTokenAvailable && (
                    <Link to="/game" style={linkStyle}>
                        Game
                    </Link>
                )}

                  {isGamePage && isTokenAvailable && (
                    <Link to="/home" style={linkStyle}>
                        Home
                    </Link>
                )}
                 
                {!isTokenAvailable ? (
                    <>
                        {isRegisterPage && (
                            <Link to="/login" style={linkStyle}>
                                Login
                            </Link>
                        )}
                        {isLoginPage && (
                            <Link to="/register" style={linkStyle}>
                                SignUp
                            </Link>
                        )}
                    </>
                ) : (
                    shouldShowLogout && (
                        <div
                            className="register-nav"
                            onClick={handlelogout}
                            style={linkStyle}>
                            Log out
                        </div>
                    )
                )}
            </div>
        </nav>
    );
}

const linkStyle = {
    backgroundColor: 'rgba(109, 76, 65, 0.5)',
    padding: '8px 16px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    border: '2px solid white',
    boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
};


import Header from "../../../component/header";
import { useContext,useState,useEffect } from "react";
import axios from "axios";
import "./login.css";
import { User } from "../Context/usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Login(){

   
   const [email,setemail] =useState("");
   const [password,setpassword]=useState("");
   
   const [accept,setaccept]=useState(false);
   const [err,seterr]=useState(false);
   const nav = useNavigate();

   const user=useContext(User);
   

   //cookie
   const cookie = new Cookies();


   const adminEmails = ["georgewakeem11@gmail.com", "molhamhaddad22@gmail.com", "soltanhaddad33@gmail.com"]
   

  
   

   async function submit(e) {
    e.preventDefault();
    setaccept(true);

    try{
        let res= await axios.post("http://127.0.0.1:8000/api/login",
            {
                email:email,
                password:password,
                
            }
        );
        const token=res.data.data.token;
        cookie.set("Bearer", token,{path:"/"});
        const userdetails=res.data.data.user;
        
        user.setauth({token,userdetails});
        



        if (adminEmails.includes(email)) {
            nav("/dashboard"); 
        } else {
            nav("/home"); 
        }

    }catch(err){
        if(err.response.status === 401){
            seterr(true);
        }
        setaccept(true);
       // console.log(err.response.data.message);
    }
   }
    return (
        <div>
            <Header/>
    <div className="parent login">
        <div className="register login">
            <form onSubmit={submit}>
              <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                placeholder="Email..."
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                />
              <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                />
                {password.length < 6 && accept && (
                    <p className="error">Password must be than 6 char</p>
                )}
                <div style={{textAlign:"center"}}>
                    <button type="submit">Login</button>
                </div>
                {accept && err && (
                    <p className="error">Wrong Email or Password</p>
                )}

            </form>
        </div>
      


    </div>
    </div>);
}
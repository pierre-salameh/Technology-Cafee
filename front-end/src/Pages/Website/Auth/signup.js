
import Header from "../../../component/header";
import { useContext,useState,useEffect } from "react";
import axios from "axios";
import "./login.css";
import { User } from "../Context/usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Signup(){

   const [name,setname]=useState("");
   const [email,setemail] =useState("");
   const [password,setpassword]=useState("");
   const [passwordconfirmation,setpasswordconfirmation]=useState("");
   const [accept,setaccept]=useState(false);
   const [emailerror,setemailerror]=useState(false);
   const [passwordError, setPasswordError] = useState("");
   const nav = useNavigate();

   const user=useContext(User);
   

   
   const cookie = new Cookies();


   useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tableId = queryParams.get("table_id");

    if (tableId) {
        localStorage.removeItem("tableId");

        if (user.auth && user.auth.token) {
            // سجل خروج المستخدم الحالي تلقائيًا
            user.setauth(null);
            cookie.remove("Bearer", { path: "/" }); 
            
        }

        // تعيين tableId في localStorage إذا كان موجودًا في الـ URL
        localStorage.setItem("tableId", tableId);
    }

   
    if (!localStorage.getItem("tableId")) {
        localStorage.setItem("tableId", 1); 
    }
}, [user, cookie]);

   async function submit(e) {
    e.preventDefault();
    setaccept(true);

    const tableId = localStorage.getItem("tableId");

    try{
        let res= await axios.post(`${process.env.REACT_APP_API_URL}/register`,
            {
                name: name,
                email:email,
                password:password,
                password_confirmation:passwordconfirmation,
                

            }
        );
        const token=res.data.data.token;
        cookie.set("Bearer", token,{path:"/"});
        const userdetails=res.data.data.user;
        user.setauth({token,userdetails});
        nav("/home");

    }catch (err) {
    console.log("FULL ERROR:", err);
    console.log("RESPONSE:", err.response);
    console.log("DATA:", err.response?.data);
    console.log("STATUS:", err.response?.status);

    if (err.response && err.response.status === 422) {
        const errorData = err.response.data.errors;

        if (errorData.email) {
            setemailerror(true);
        } else {
            setemailerror(false);
        }

        if (errorData.password) {
            setPasswordError("Password must be at least 8 characters.");
        } else {
            setPasswordError("");
        }
    }
}

   }
    return (
        <div>
            <Header/>
    <div  className="parent login">
        <div style={{borderTop:'100px'}} className="register login">
            <form onSubmit={submit}>
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                placeholder="Name..."
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                />
                {name.length < 2 && accept && (
                    <p className="error">Name must be more than 2 char</p>
                )}

               <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                placeholder="Email..."
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                />
                {accept && emailerror && (
                    <p className="error">Email is already been taken</p>
                )}
                   <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                />
               {password.length < 8 && accept && (
                            <p className="error">Password must be more than 7 characters</p>
                        )}

<label htmlFor="passwordco">Password Confirmation</label>
                <input
                type="password"
                id="passwordco"
                placeholder="Repeat Password..."
                
                value={passwordconfirmation}
                onChange={(e) => setpasswordconfirmation(e.target.value)}
                />
                {passwordconfirmation !== password && accept && (
                    <p className="error">Password does not match</p>
                )}

                <div style={{textAlign:"center"}}>
                    <button type="submit">SignUp</button>

                </div>

            </form>
        </div>
      


    </div>
    </div>);
}
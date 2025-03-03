import { useContext, useState } from "react";
import axios from "axios";
import "./user.css";


import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/usercontext";

export default function Createuser(){

   const [name,setname]=useState("");
   const [email,setemail] =useState("");
   const [password,setpassword]=useState("");
   const [passwordconfirmation,setpasswordconfirmation]=useState("");
   const [accept,setaccept]=useState(false);
   const [emailerror,setemailerror]=useState(false);
   const nav = useNavigate();

   
   const context = useContext(User);
   const token =(context.auth.token);


   

  

   async function submit(e) {
    e.preventDefault();
    setaccept(true);

    try{
        let res= await axios.post("http://127.0.0.1:8000/api/user/create",
            {
                name: name,
                email:email,
                password:password,
                password_confirmation:passwordconfirmation,

            },
            {
                headers:{
                    Authorization:"Bearer " + token,
                },
            }
        );
        nav("/dashboard/users");

    }catch(err){
        if(err.response.status === 422){
            setemailerror(true);
        }
        setaccept(true);
    }
   }
    return (
        <div >
            <h1 style={{textAlign:'center'}}>Create User</h1>
    <div>
        <div >
            <form style={{color:'white'}} onSubmit={submit} >
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
                {password.length < 6 && accept && (
                    <p className="error">Password must be than 6 char</p>
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
                    <button className="btn" type="submit">Create User</button>

                </div>

            </form>
        </div>
      


    </div>
    </div>);
}
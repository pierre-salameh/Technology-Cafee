import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/usercontext";
import Loadingscreen from "../../../component/loding";
import Cookies from "universal-cookie";

export default function Persistlogin(){

    const context = useContext(User);
    const token =(context.auth.token);
    const [loading,setloading]=useState(true);

    //cookie
    const cookie= new Cookies();
    const gettooken=cookie.get("Bearer");

     useEffect(() => {
    async function refresh() {
        try{
            await axios.post(`http://127.0.0.1:8000/api/refresh`,null ,{
                headers:{
                    Authorization: "Bearer " + gettooken,
                }
            })
            .then((data) =>{
                cookie.set("Bearer",data.data.token,{path:"/"})
                 context.setauth((prev) => {
                    return {userdetails: data.data.user, token: data.data.token};
                 });
                 });

        }catch(err) {
            console.log(err);}
        finally{
            setloading(false);
        }
    }


    !token ? refresh() : setloading(false);
},[]);

    return loading ? <Loadingscreen/> : <Outlet/>;
}
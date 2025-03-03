import {useContext, useEffect,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/usercontext";
export default function Users(){
    const [users,setusers]=useState([]);
    const [runuseeffect,setrun]=useState(0);

    const context = useContext(User);
    const token =(context.auth.token);
   

    useEffect(() => {
        axios
        .get("http://127.0.0.1:8000/api/user/show",{
            headers:{
                Accept:"application/json",
                Authorization:"Bearer " + token,
            },
        })
        
        .then((data) =>  setusers(data.data));
    },[runuseeffect]);

    async function deleteuser(id){
        try{
        const res= await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,{
            headers:{
                Authorization: "Bearer " + token,

            },
        }
        );
        if(res.status === 200){
        setrun((prev) => prev+1);
        }
        }catch{console.log("none")};
    }

  

    const showusers=users.map((user,index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{user.name}</td> 
      <td>{user.email}</td>
      <td>
      <Link to={`${user.id}`} > <i  className="fa-regular fa-pen-to-square" style={{color:"white" , fontSize:"20px" , paddingRight:"20px"}}></i></Link>
        <i onClick={() => deleteuser(user.id)} className="fa-solid fa-user-minus" style={{color: "white", fontSize:"20px" , cursor:"pointer"}}></i>
      </td>
    </tr>
));


    return(
        <div style={{padding:"20px"}}>
            <h1 style={{textAlign:'center'}}>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                     </tr>
                </thead>

                <tbody>
                        {showusers}
                </tbody>
            </table>
            
        </div>
    );
}




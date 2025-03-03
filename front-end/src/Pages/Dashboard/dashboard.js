import SideBar from "../../component/sidebar";
import TopBar from "../../component/topbar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard(){
    return(
        <div>
             <TopBar/>
           
            <div className="content-flex">
               
               
            <SideBar/>
            
            
            <div   style={{width:"80%", marginTop:'50px'}}>
            <h1 style={{textAlign : 'center' }}>PeeRaNo Administrator</h1>
            <div className="tah"></div>
            <Outlet/>
            
            </div>
            </div>
        </div>
    );
}
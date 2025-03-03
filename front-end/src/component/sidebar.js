import {  NavLink } from "react-router-dom"

export default function SideBar(){
    return(
        <div className="side-bar" style={{marginTop:'50px'}}>
          <br></br>
          <NavLink style={{color:'white'}} to="/home" className="item-link"><i className="fa-solid fa-users"></i>Go To Home</NavLink>
          <NavLink style={{color:'white'}} to="/dashboard/users" className="item-link"><i className="fa-solid fa-users"></i>Users</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/user/create" className="item-link"><i className="fa-solid fa-user-plus"></i>New Users</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/products" className="item-link"><i className="fa-brands fa-product-hunt" style={{color:"burlywood" ,marginLeft:'2px'}}></i>Products</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/products/create" className="item-link"><i className="fa-solid fa-sharp fa-solid fa-circle-plus"></i>New Products</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/order" className="item-link"><i className="fa-solid fa-sharp fa-solid fa-circle-plus"></i>Orders</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/complaints" className="item-link"><i className="fa-solid fa-sharp fa-solid fa-circle-plus"></i>Complaints</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/categories" className="item-link"><i className="fa-solid fa-sharp fa-solid fa-circle-plus"></i>Category</NavLink>
          <NavLink style={{color:'white'}}  to="/dashboard/categories/create" className="item-link"><i className="fa-solid fa-sharp fa-solid fa-circle-plus"></i>New Category</NavLink>
        </div>
    );
}

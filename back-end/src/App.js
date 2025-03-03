import Signup from "./Pages/Website/Auth/signup";
import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Website/Auth/login";
import Home from "./Pages/Website/home";
import Dashboard from "./Pages/Dashboard/dashboard";
import Users from "./Pages/Dashboard/Users/users";
import UpdateUser from "./Pages/Dashboard/Users/updateuser";
import CreateUser from "./Pages/Dashboard/Users/createuser";
import Requireauth from "./Pages/Website/Auth/requireauth";
import Persistlogin from "./Pages/Website/Auth/persistlogin";
import Products from "./Pages/Dashboard/Products/products";
import Newproducts from "./Pages/Dashboard/Products/newproduct";
import Updateproducts from "./Pages/Dashboard/Products/updateproduct";
import OrdersPage from "./Pages/Dashboard/Orders/order";
import QRPage from "./Pages/Website/qrpage";
import Welcome from "./Pages/Website/Auth/welcome";
import Complaint from "./Pages/Website/complaint";
import Showcomplints from "./Pages/Dashboard/showcomplaints";
import NewCategory from "./Pages/Dashboard/Categories/newcategory";
import ShowCategories from "./Pages/Dashboard/Categories/showcategory";
import DrinkGame from "./Pages/Website/Game/gamepage";



export default function App() {
  

  return (
    <div >
      
      

   <Routes>
        {/* الصفحة الترحيبية */}
        <Route path="/" element={<Welcome />} />

        {/* مسارات التسجيل وتسجيل الدخول */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login/>} />

        {/* إضافة صفحة Home ضمن عنصر Requireauth لحمايتها */}
        <Route element={<Persistlogin />}>
          <Route element={<Requireauth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/complaints" element={<Complaint />} />
            <Route path="/game" element={<DrinkGame />} />
            {/* مسارات لوحة التحكم */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<Newproducts />} />
              <Route path="products/:id" element={<Updateproducts />} />
              <Route path="order" element={<OrdersPage />} />
              <Route path="/dashboard/complaints" element={<Showcomplints />} />
              <Route path="/dashboard/categories/create" element={<NewCategory />} />
              <Route path="/dashboard/categories" element={<ShowCategories />} />

            </Route>
          </Route>
        </Route>
      </Routes>
      
      
    </div>
  );
}




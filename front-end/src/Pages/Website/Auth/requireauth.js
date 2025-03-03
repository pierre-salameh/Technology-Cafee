import { useContext } from "react";
import { User } from "../Context/usercontext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Requireauth() {
  const user = useContext(User);
  const location = useLocation();

  
  const adminEmails = ["georgewakeem11@gmail.com", "molhamhaddad22@gmail.com", "soltanhaddad33@gmail.com"];

  // تحقق من حالة المصادقة
  const isAuthenticated = user.auth.userdetails;

  // إذا كان المستخدم غير مسجل الدخول
  if (!isAuthenticated) {
    return <Navigate state={{ from: location }} replace to="/login" />;
  }

  
  if (location.pathname.includes("/dashboard") && !adminEmails.includes(user.auth.userdetails.email)) {
    return <Navigate replace to="/home" />;
  }

 
  return <Outlet />;
}

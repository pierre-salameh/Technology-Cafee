import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { User } from "../../Website/Context/usercontext"; 

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null); 
    const context = useContext(User);
    const token = context.auth.token; 

    useEffect(() => {
        
        axios
            .get("http://127.0.0.1:8000/api/orders", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`, 
                },
            })
            .then((response) => {
               // console.log(response.data);
                setOrders(response.data); 
            })
            .catch((error) => {
                setError("حدث خطأ أثناء جلب الطلبات");
                console.error("حدث خطأ أثناء جلب الطلبات:", error);
            });
    }, [token]);

    const handleDeleteOrder = (orderId) => {
        axios
            .delete(`http://127.0.0.1:8000/api/orders/${orderId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
               
                setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
                alert("تم حذف الطلب بنجاح");
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء حذف الطلب", error);
                alert("لم يتمكن من حذف الطلب، حاول مرة أخرى");
            });
    };

    const deleteAllOrders = () => {
        axios
            .delete("http://127.0.0.1:8000/api/orders", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                alert("تم حذف جميع الطلبات بنجاح!");
                setOrders([]); 
            })
            .catch((error) => {
                console.error("حدث خطأ أثناء حذف جميع الطلبات:", error);
                alert("لم يتمكن من حذف جميع الطلبات، حاول مرة أخرى.");
            });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    function groupOrdersByTable(orders) {
        const grouped = {};
        orders.forEach((order) => {
            if (!grouped[order.table_id]) {
                grouped[order.table_id] = [];
            }
            grouped[order.table_id].push(order);
        });
        return grouped;
    }

    const groupedOrders = groupOrdersByTable(orders);

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Orders </h1>
            

            {error && <p style={{ color: "red" }}>{error}</p>}

            {orders.length > 0 ? (
                Object.entries(groupedOrders).map(([tableId, tableOrders]) => (
                    <div key={tableId} style={{ marginBottom: "20px" }}>
                        <h3 style={{fontSize:'20px'}}>Table Number: {tableId}</h3>
                        <table border="1" style={{ width: "100%", textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                    <th>Order Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableOrders.map((order) => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.product_name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.product_price} S.P</td>
                                        <td>{order.total_price} S.P</td>
                                        <td>{formatDate(order.order_date)}</td>
                                        <td>
                                            <button onClick={() => handleDeleteOrder(order.order_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                    
                ))
                
            ) : (
                <p style={{textAlign:'center'}}>There are no Orders currently</p>
            )}
            <button className="btn" style={{marginLeft:'470px',textAlign:'center'}} onClick={deleteAllOrders}>Delete All Orders</button>
            
        </div>
    );
}

import { useContext, useEffect, useState } from "react";
import Header from "../../component/header";
import { User } from "./Context/usercontext";
import axios from "axios";
import "./home.css";
import Swal from 'sweetalert2';
import Snowfall from 'react-snowfall';
import { useNavigate } from "react-router-dom";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [isImageOpen, setIsImageOpen] = useState(false); 
    const [currentImage, setCurrentImage] = useState(""); 

    const navigate = useNavigate();
    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/public-products", {
            headers: {
                Accept: "application/json",
            },
        })
        .then((response) => {
            setProducts(response.data);
            const initialQuantities = {};
            response.data.forEach(product => {
                initialQuantities[product.id] = 1;
            });
            setQuantity(initialQuantities);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });

        axios.get("http://127.0.0.1:8000/api/categories", {
            headers: {
                Accept: "application/json",
            },
        })
        .then((response) => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
    }, []);

    const handleQuantityChange = (id, action) => {
        setQuantity(prevQuantity => ({
            ...prevQuantity,
            [id]: action === 'increment'
                ? prevQuantity[id] + 1
                : Math.max(prevQuantity[id] - 1, 1)
        }));
    };

    const addProductToOrder = (product) => {
        const orderedProduct = {
            productId: product.id,
            title: product.title,
            quantity: quantity[product.id],
            price: product.price,
            categoryId: product.category_id,
        };
        if (!orderedProducts.some(item => item.productId === product.id)) {
            setOrderedProducts(prevOrders => [...prevOrders, orderedProduct]);
            Swal.fire({
                title: 'تمت إضافة المنتج إلى قائمة الطلبات',
                icon: 'success',
                confirmButtonText: 'موافق',
                position: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                confirmButtonColor: '#6f4f1f',
                titleTextColor: '#fff',
                iconColor: '#fff',
                width: '300px',
                padding: '20px',
                customClass: { popup: 'custom-popup' }
            });
        } else {
            Swal.fire({
                title: 'المنتج موجود بالفعل في قائمة الطلبات',
                icon: 'warning',
                confirmButtonText: 'موافق',
                position: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                confirmButtonColor: '#6f4f1f',
                titleTextColor: '#fff',
                iconColor: '#fff',
                width: '300px',
                padding: '20px',
                customClass: { popup: 'custom-popup' }
            });
        }
    };

    const sendAllOrdersToManagement = () => {
        let storedTableId = localStorage.getItem("tableId") || 1;
        axios.post("http://127.0.0.1:8000/api/send-all-orders", {
            orders: orderedProducts,
            table_id: storedTableId,
        }, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            Swal.fire({
                title: 'تم إرسال جميع الطلبات بنجاح',
                icon: 'success',
                confirmButtonText: 'موافق',
                position: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                confirmButtonColor: '#6f4f1f',
                titleTextColor: '#fff',
                iconColor: '#fff',
                width: '300px',
                padding: '20px',
                customClass: { popup: 'custom-popup' }
            });
            setOrderedProducts([]); 
        })
        .catch(error => {
            console.error("حدث خطأ أثناء إرسال الطلبات:", error);
        });
    };

    const removeOrderItem = (index) => {
        setOrderedProducts(prevOrders => {
            const updatedOrders = [...prevOrders];
            updatedOrders.splice(index, 1); 
            return updatedOrders;
        });
    };

    const handleOrderedQuantityChange = (index, action) => {
        setOrderedProducts(prevOrders => {
            const updatedOrders = [...prevOrders];
            const order = updatedOrders[index];
            if (action === 'increment') {
                order.quantity += 1;
            } else if (action === 'decrement' && order.quantity > 1) {
                order.quantity -= 1;
            }
            return updatedOrders;
        });
    };

   
    const openImage = (image) => {
        setCurrentImage(image);
        setIsImageOpen(true);
    };

    
    const closeImage = () => {
        setIsImageOpen(false);
        setCurrentImage("");
    };

    const renderProductTable = (category) => {
        const filteredProducts = products.filter(product => product.category.name === category.name);
        
        return (
            <div  key={category.id}>
                <h3 style={{textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px ',textAlign:'center',fontSize:'25px'}}>{category.name} :</h3>
                <table>
                    <thead >
                        <tr >
                            <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px ' }}>Id</th>
                            <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Title</th>
                            <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Description</th>
                            <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Price</th>
                            {category.name !== "Additional Services" && (
                                <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Quantity</th>
                            )}
                            <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Actions</th>
                            <th style={{ width: '20%', textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Image</th>
                        </tr>
                    </thead>
                    <tbody >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr  key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price} S.P</td>
                                    {product.category_id !== 3 && (
                                        <td>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    gap: "10px", 
                                                    alignItems: "center", 
                                                }}
                                            >
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, "decrement")}
                                                    style={{
                                                        backgroundColor: "#4b2e1e",
                                                        color: "white",
                                                        padding: "5px 10px",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    --
                                                </button>
                                                <span style={{color:'white',marginTop:'50px'}}>{quantity[product.id]}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, "increment")}
                                                    style={{
                                                        backgroundColor: "#4b2e1e",
                                                        color: "white",
                                                        padding: "5px 10px",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                    <td>
                                        <button
                                            onClick={() => addProductToOrder(product)}
                                            style={{
                                                backgroundColor: "#4b2e1e", 
                                                color: "white", 
                                                padding: "10px 20px", 
                                                border: "none", 
                                                borderRadius: "4px"
                                            }}
                                        >
                                            Add
                                        </button>
                                    </td>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{
                                                width: "100px",
                                                height: "auto",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => openImage(product.image)} 
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td style={{textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}} colSpan="6">No products available.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="home-container content">
            <Snowfall />
            <Header />
            <div className="street-lamp">
                <div className="light-beam"></div>
            </div>

           
            {isImageOpen && (
                <div className="image-popup" onClick={closeImage}>
                    <img src={currentImage} alt="Product" className="popup-image" />
                </div>
            )}

            <div className="container">
                <div className="gh"></div>
                <div className="text">
                    <h1 style={{marginTop: '40px',color:'white'}}>have a good day..</h1>
                </div>
            </div>

            <div style={{ textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px ',marginLeft:'310px', fontSize: '1.8rem', color: '#f5f5f5', marginBottom: '0px', marginTop: '-4px' }}>
                Menu :
            </div>

            <div style={{ padding: "30px" }}>
                {categories.length > 0 ? (
                    categories.map(category => renderProductTable(category))
                ) : (
                    <p style={{textAlign:'center'}}>Loading...</p>
                )}
            </div>

            {/* عرض المنتجات المطلوبة تحت جميع الجداول */}
            {orderedProducts.length > 0 && (
                <div 
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)", 
                        padding: "20px",
                        marginTop: "20px",
                        borderRadius: "10px"
                    }}
                >
                    <h3 style={{textShadow: '0px 0px 15px #ffcc00, 0px 0px 30px '}}>Products Added to Order:</h3>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {orderedProducts.map((product, index) => {
                            return (
                                <li key={index} style={{ marginBottom: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{marginRight:'20px'}}>{product.title}</span>
                                        <span>{product.quantity} x {product.price} S.P</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                                        {product.categoryId !== 3 && (
                                            <>
                                                <button
                                                    onClick={() => handleOrderedQuantityChange(index, 'decrement')}
                                                    style={{
                                                        backgroundColor: "#6f4f1f", 
                                                        color: "white", 
                                                        padding: "5px 10px", 
                                                        border: "none", 
                                                        borderRadius: "4px", 
                                                        opacity: 0.8
                                                    }}
                                                >
                                                    --
                                                </button>
                                                <span style={{ color: "white", fontSize: "1.2rem" }}>{product.quantity}</span>
                                                <button 
                                                    onClick={() => handleOrderedQuantityChange(index, 'increment')}
                                                    style={{
                                                        backgroundColor: "#6f4f1f", 
                                                        color: "white", 
                                                        padding: "5px 10px", 
                                                        border: "none", 
                                                        borderRadius: "4px", 
                                                        opacity: 0.8
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => removeOrderItem(index)}
                                            style={{
                                                backgroundColor: "#6f4f1f", 
                                                color: "white", 
                                                padding: "5px 10px", 
                                                border: "none", 
                                                borderRadius: "4px", 
                                                marginLeft: "10px"
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <button
                            onClick={sendAllOrdersToManagement}
                            style={{
                                backgroundColor: "#6f4f1f", 
                                color: "white", 
                                padding: "15px 30px", 
                                border: "none", 
                                borderRadius: "4px", 
                                marginTop: "20px"
                            }}
                        >
                            Send All Orders To Management
                        </button>
                    </div>
                </div>
            )}



        </div>
        
    );
}

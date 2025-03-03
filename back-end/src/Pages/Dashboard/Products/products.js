import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/usercontext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [runUseEffect, setRun] = useState(0);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
       
        axios
            .get("http://127.0.0.1:8000/api/product/show", {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => {
                setProducts(data.data);
                // استخراج أسماء الفئات من المنتجات
                const uniqueCategories = [...new Set(data.data.map((product) => product.category?.name))].filter(Boolean);
                setCategories(uniqueCategories);
            })
            .catch((err) => console.log(err));
    }, [runUseEffect]);

    async function deleteProduct(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if (res.status === 200) {
                setRun((prev) => prev + 1);
            }
        } catch (err) {
            console.log(err);
        }
    }

    
    const renderTable = (categoryName, products) => (
        <div style={{ marginBottom: "20px" }} key={categoryName}>
            <h2>{categoryName}</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
                <thead>
                    <tr >
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Id</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{index + 1}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.title}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.description}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.price}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                <Link to={`${product.id}`}>
                                    <i
                                        className="fa-regular fa-pen-to-square"
                                        style={{
                                            color: "white",
                                            fontSize: "20px",
                                            paddingRight: "20px",
                                        }}
                                    ></i>
                                </Link>
                                <i
                                    onClick={() => deleteProduct(product.id)}
                                    className="fa-solid fa-minus"
                                    style={{
                                        color: "white",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                    }}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{textAlign:'center'}}>Products</h1>
            {categories.map((category) => {
                const filteredProducts = products.filter((product) => product.category?.name === category);
                return filteredProducts.length > 0 ? (
                    renderTable(category, filteredProducts)
                ) : (
                    <h3 key={category} style={{ color: "gray", textAlign: "center" }}>
                        No {category} products available.
                    </h3>
                );
            })}
        </div>
    );
}

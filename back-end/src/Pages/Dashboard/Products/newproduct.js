import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/usercontext";

export default function Newproducts() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [categoryId, setCategoryId] = useState(""); 
    const [categories, setCategories] = useState([]); 
    const [accept, setAccept] = useState(false);

    const navigate = useNavigate();
    const context = useContext(User);
    const token = context.auth.token;

    
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/categories", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setCategories(response.data);
                setCategoryId(response.data[0]?.id || ""); 
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, [token]);

    
    async function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("image", image);
            formData.append("category_id", categoryId); 

            await axios.post("http://127.0.0.1:8000/api/product/create", formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            navigate("/dashboard/products");
        } catch (err) {
            console.error("Error creating product:", err);
        }
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Create Product</h1>
            <form style={{color:'white'}} onSubmit={handleSubmit}>
                
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter product title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {accept && title.length < 1 && (
                    <p className="error">Title is required and must be more than 2 characters.</p>
                )}

               
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Enter product description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Enter product price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />

                
                <label  htmlFor="category">Category</label>
                <br></br>
                <br></br>
                <select style={{width:'100%', textAlign:'center',height:'40px',borderRadius:'10px'}}
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option  value="">Select a category</option>
                    {categories.map((cat) => (
                        <option  key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <br></br>
                <br></br>

               
                <div style={{ textAlign: "center" }}>
                    <button className="btn" type="submit">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}

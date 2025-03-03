import { useContext, useState } from "react";
import axios from "axios";
import { User } from "../../Website/Context/usercontext";

export default function NewCategory() {
    const [name, setName] = useState(""); 
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState(""); 
    const context = useContext(User);
    const token = context.auth.token;
    
    async function submitCategory(e) {
        e.preventDefault(); 
        setMessage("");
        setError("");

        try {
            
            const response = await axios.post(
                "http://127.0.0.1:8000/api/categories/create",
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("Category created successfully!"); 
            setName(""); 
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Failed to create category."); 
            } else {
                setError("An unexpected error occurred."); 
            }
            console.error(err);
        }
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Create Category</h1>
            <form style={{color:'white'}} onSubmit={submitCategory}>
                <label htmlFor="name">Category Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <button style={{marginLeft:'400px'}} className="btn" type="submit">Add Category</button>
            </form>
            
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

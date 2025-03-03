import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowCategories() {
    const [categories, setCategories] = useState([]); 
    const [error, setError] = useState(""); 
    const [message, setMessage] = useState(""); 

    
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/categories");
                setCategories(response.data); 
            } catch (err) {
                setError("Failed to load categories."); 
                console.error(err);
            }
        }
        fetchCategories();
    }, []);

   
    async function deleteCategory(id) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
            setCategories(categories.filter((category) => category.id !== id)); 
            setMessage("Category deleted successfully."); 
        } catch (err) {
            setError("Failed to delete category.");
            console.error(err);
        }
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Categories</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            {message && <p style={{ color: "green" }}>{message}</p>} 
            {categories.length === 0 ? (
                <p style={{textAlign:'center'}}>No categories found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button
                                        onClick={() => deleteCategory(category.id)} 
                                        style={{ color: "white", cursor: "pointer" }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

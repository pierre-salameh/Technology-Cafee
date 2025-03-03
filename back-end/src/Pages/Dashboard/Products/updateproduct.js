import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../Website/Context/usercontext";

export default function Updateproducts(){

   const [title,settitle]=useState("");
   const [description,setdescription] =useState("");
   const [price,setprice]=useState("");
   const [categoryId,setCategoryId]=useState("");
   const [image,setimage] =useState("");
   const [accept,setaccept]=useState(false);
   
   
   const id = window.location.pathname.split("/").slice(-1)[0];
   
   const context = useContext(User);
   const token =(context.auth.token);
   const nav = useNavigate();



   useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    })
    .then((response) => {
        if (response.data) {
            settitle(response.data.title);
            setdescription(response.data.description);
            setprice(response.data.price);
            setCategoryId(response.data.category_id);
        } else {
            console.log('No product data found');
        }
    })
    .catch((error) => {
        console.error('Error fetching product data:', error);
    });
    
}, [id, token]);

  

   async function submit(e) {
    e.preventDefault();
    setaccept(true);

    try{
        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('price', price);
        formdata.append('category_id', categoryId);
        formdata.append('image', image);

        let res= await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
               formdata,
            {
                headers:{
                    Authorization:"Bearer " + token,
                },
            }
        );
        nav("/dashboard/products");

    }catch(err){
        console.log(err);
        setaccept(true);
    }
   }
    return (
        <div >
            <h1 style={{textAlign:'center'}}>Update Product</h1>
    <div>
        <div >
            <form style={{color:'white'}} onSubmit={submit} >
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                placeholder="Title..."
                required
                value={title}
                onChange={(e) => settitle(e.target.value)}
                />
                {title.length < 1 && accept && (
                    <p className="error">Title must be more than 2 char</p>
                )}

             <label htmlFor="description">Description</label>
                <input
                type="text"
                id="description"
                placeholder="Description..."
                required
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                />
           


<label htmlFor="price">Price</label>
                <input
                type="number"
                id="price"
                placeholder="Price..."
                required
                value={price}
                onChange={(e) => setprice(e.target.value)}
                />







                   <label htmlFor="image">Image</label>
                <input
                type="file"
                id="image"
                placeholder="Image..."
             
                onChange={(e) => setimage(e.target.files.item(0))}
                />
          


                <div style={{textAlign:"center"}}>
                    <button className="btn" type="submit">Update Product</button>

                </div>

            </form>
        </div>
      


    </div>
    </div>);
}
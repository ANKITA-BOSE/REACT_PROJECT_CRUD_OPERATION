import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Create = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: []
    });

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function fetchCategories() {
            try {
                setCategoriesLoading(true);
                const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
                if (mounted) setCategories(res.data || []);
            } catch (err) {
                console.error('Failed to fetch categories', err);
                toast.error('Failed to load categories');
            } finally {
                if (mounted) setCategoriesLoading(false);
            }
        }
        fetchCategories();
        return () => { mounted = false; };
    }, []);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    };
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            if (!product.title.trim() || !product.price || !product.categoryId) {
                toast.error("Title, price, and category are required");
                return;
            }
            
            // Build image URL - use provided URL or placeholder
            const imageUrl = product.images && product.images[0] ? product.images[0] : "https://via.placeholder.com/400x300?text=Product";
            
            // Prepare payload exactly like Update component
            const payload = {
                title: product.title.trim(),
                price: Number(product.price),
                description: product.description.trim(),
                categoryId: Number(product.categoryId),
                images: [imageUrl]
            };
            
            console.log("Sending payload:", JSON.stringify(payload, null, 2));
            
            const response = await axios.post("https://api.escuelajs.co/api/v1/products", payload);
            
            console.log("Product created successfully:", response.data);
            toast.success("Product Created Successfully");
            
            // Reset form
            setProduct({
                title: "",
                price: "",
                description: "",
                categoryId: "1",
                images: []
            });
            
            setTimeout(() => navigate("/admin/view"), 1500);
        }
        catch(error){
            console.error("Error:", error.response?.data || error.message);
            
            if (error.response?.status === 400) {
                const errMsg = error.response?.data?.message || "Invalid input";
                console.error("Validation error:", errMsg);
                toast.error(errMsg);
            } else if (error.response?.status === 401) {
                toast.error("Authentication failed. Please login again.");
            } else {
                toast.error("Failed to create product. Please try again.");
            }
        }
    }

  return (
    <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Add New Product</h2>
            
            <div style={styles.formGroup}>
                <label htmlFor="title" style={styles.label}>Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={product.title}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Enter product title"
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="categoryId" style={styles.label}>Category</label>
                <select 
                    name="categoryId" 
                    id="categoryId" 
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    disabled={categoriesLoading || categories.length === 0}
                >
                    <option value="">{categoriesLoading ? 'Loading categories...' : 'Select a category'}</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="price" style={styles.label}>Price ($)</label>
                <input 
                    type="number" 
                    name="price" 
                    id="price" 
                    value={product.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    style={styles.input}
                    placeholder="Enter product price"
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="images" style={styles.label}>Image URL</label>
                <select 
                    name="images" 
                    id="images" 
                    value={product.images && product.images[0] ? product.images[0] : ""}
                    onChange={(e) => setProduct({...product, images: e.target.value ? [e.target.value] : []})}
                    required
                    style={styles.input}
                >
                    <option value="">Select an image or enter custom URL below</option>
                    <option value="https://via.placeholder.com/400x300?text=Electronics">Electronics</option>
                    <option value="https://via.placeholder.com/400x300?text=Furniture">Furniture</option>
                    <option value="https://via.placeholder.com/400x300?text=Shoes">Shoes</option>
                    <option value="https://via.placeholder.com/400x300?text=Clothes">Clothes</option>
                    <option value="https://via.placeholder.com/400x300?text=Accessories">Accessories</option>
                </select>
                <small style={styles.helpText}>Or enter a custom URL below:</small>
                <input 
                    type="text" 
                    placeholder="Enter custom image URL (e.g., https://example.com/image.jpg)"
                    value={product.images && product.images[0] ? product.images[0] : ""}
                    onChange={(e) => setProduct({...product, images: e.target.value ? [e.target.value] : []})}
                    style={{...styles.input, marginTop: '8px'}}
                />
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="description" style={styles.label}>Description (Optional)</label>
                <textarea 
                    name="description" 
                    id="description" 
                    value={product.description}
                    onChange={handleChange}
                    style={{...styles.input, minHeight: '100px', resize: 'vertical'}}
                    placeholder="Enter product description"
                />
            </div>

            <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>Create Product</button>
                <button type="button" onClick={() => navigate("/admin/view")} style={styles.cancelButton}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    marginBottom: '25px',
    fontSize: '24px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: '500',
    fontSize: '14px',
  },
  helpText: {
    display: 'block',
    marginTop: '8px',
    color: '#888',
    fontSize: '12px',
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '25px',
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Create;
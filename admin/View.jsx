import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const View = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        async function fetch(){
            try{
                setLoading(true);
                const {data} = await axios.get("https://api.escuelajs.co/api/v1/products");
                setData(data);
            }
            catch(error){
                toast.error("Failed to fetch products");
            }
            finally {
                setLoading(false);
            }
        }
        fetch();
    },[])
    
    const handleDelete = async(id)=>{
        try {
            await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
            setData(data.filter(item => item.id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Failed to delete product");
        }
    }
    
    const navigate = useNavigate();

  if (loading) return <div style={styles.container}><p>Loading products...</p></div>;

  return (
    <div style={styles.container}>
        <div style={styles.header}>
            <h1>Manage Products</h1>
            <button onClick={() => navigate("/admin/create")} style={styles.createButton}>
                + Add New Product
            </button>
        </div>
        
        <div style={styles.tableContainer}>
            {data.length === 0 ? (
                <p style={styles.empty}>No products found</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product) => (
                            <tr key={product.id} style={styles.tableRow}>
                                <td style={{...styles.td, maxWidth: '80px'}}>
                                    <img 
                                        src={product.category.image} 
                                        alt={product.title}
                                        style={styles.tableImage}
                                    />
                                </td>
                                <td style={{...styles.td, maxWidth: '250px'}}>
                                    <div style={styles.truncate}>{product.title}</div>
                                </td>
                                <td style={styles.td}>{product.category.name}</td>
                                <td style={styles.td}>${product.price}</td>
                                <td style={{...styles.td, minWidth: '150px'}}>
                                    <button 
                                        onClick={() => navigate(`/admin/update/${product.id}`)}
                                        style={styles.editButton}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (window.confirm("Are you sure?")) {
                                                handleDelete(product.id);
                                            }
                                        }}
                                        style={styles.deleteButton}
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
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px',
    borderBottom: '2px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '15px',
    fontSize: '14px',
    color: '#666',
  },
  tableImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  editButton: {
    marginRight: '10px',
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#888',
    fontSize: '16px',
  },
};

export default View;
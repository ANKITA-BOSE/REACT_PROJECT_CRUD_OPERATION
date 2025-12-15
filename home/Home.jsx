import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    async function fetch(){
      try {
        setLoading(true);
        const {data} = await axios.get("https://api.escuelajs.co/api/v1/products");
        setData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  },[]);

  if (loading) return <div style={styles.loadingContainer}><p>Loading products...</p></div>;
  if (error) return <div style={styles.errorContainer}><p>{error}</p></div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Product Catalog</h1>
        <p>Browse our collection of quality products</p>
      </header>
      
      <div style={styles.grid}>
        {data.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <div style={styles.imageContainer}>
              <img 
                src={product.category.image} 
                alt={product.title}
                style={styles.image}
              />
            </div>
            <div style={styles.productInfo}>
              <h3 style={styles.productTitle}>{product.title}</h3>
              <p style={styles.category}>{product.category.name}</p>
              <p style={styles.description}>{product.description?.substring(0, 100)}...</p>
              <div style={styles.footer}>
                <span style={styles.price}>${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '16px',
  },
  productTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  category: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  description: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#28a745',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#666',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#dc3545',
  },
};

export default Home;

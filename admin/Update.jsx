import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Update = () => {
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: "https://triprindia.com/cdn/shop/files/133close2.jpg?v=1741861567&width=1200"
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
        const product = res.data
        setData({
          title: product.title || "",
          price: product.price ?? "",
          description: product.description || "",
          categoryId: product.category?.id ?? product.categoryId ?? "",
          images: Array.isArray(product.images) ? (product.images[0] || "") : (product.images || "")
        })
      } catch (err) {
        setError('Failed to load product')
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!data.title.trim()) {
      setError('Title is required')
      return
    }
    if (!data.price || Number(data.price) <= 0) {
      setError('Price must be a positive number')
      return
    }

    try {
      setLoading(true)
      const payload = {
        title: data.title,
        price: Number(data.price),
        description: data.description,
        categoryId: Number(data.categoryId) || 1,
        images: [data.images]
      }

      await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, payload)
      toast.success('Product updated successfully')
      navigate('/admin/view')
    } catch (err) {
      setError('Failed to update product')
      toast.error('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={styles.loadingContainer}>Loading...</div>

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Update Product</h2>
        
        {error && <div style={styles.errorMessage}>{error}</div>}

        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input 
            name="title" 
            value={data.title} 
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter product title"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price ($)</label>
          <input 
            name="price" 
            type="number" 
            value={data.price} 
            onChange={handleChange}
            required
            step="0.01"
            style={styles.input}
            placeholder="Enter product price"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea 
            name="description" 
            value={data.description} 
            onChange={handleChange}
            rows="4"
            style={{...styles.input, resize: 'vertical'}}
            placeholder="Enter product description"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category ID</label>
          <input 
            name="categoryId" 
            type="number" 
            value={data.categoryId} 
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL</label>
          <input 
            name="images" 
            value={data.images} 
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter image URL"
          />
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading}
            style={{...styles.submitButton, opacity: loading ? 0.6 : 1}}
          >
            {loading ? 'Saving...' : 'Update Product'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/admin/view')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
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
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #f5c6cb',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#666',
  },
};

export default Update

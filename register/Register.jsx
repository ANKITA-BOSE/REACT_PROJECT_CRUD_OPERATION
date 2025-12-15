import axios from 'axios';
import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = ()=>{
    const [register, setRegister] = useState({
        name:"",
        email:"",
        password:"",
        avatar:"https://treesforall.nl/app/uploads/2022/03/Bos-Nederland-Epe-e1719389547661-0x1400-c-default.webp"
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRegister({...register, [name]:value});
    }

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            if (!register.name.trim() || !register.email.trim() || !register.password.trim()) {
                toast.error("All fields are required");
                return;
            }
            await axios.post("https://api.escuelajs.co/api/v1/users/", register);
            toast.success("Registration Successful");
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    }
    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Create Account</h2>
                
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={register.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Enter your full name"
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={register.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Enter your email"
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={register.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Enter a strong password"
                    />
                </div>

                <button type="submit" style={styles.button}>Register</button>
                
                <p style={styles.link}>
                    Already have an account? <a href="/login" style={styles.anchor}>Login here</a>
                </p>
            </form>
        </div>
    );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '28px',
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
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  link: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  anchor: {
    color: '#28a745',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Register;

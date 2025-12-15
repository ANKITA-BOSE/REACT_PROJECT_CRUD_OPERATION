import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        window.localStorage.removeItem("token");
        navigate("/login");
    }
    
  return (
    <div style={styles.container}>
        <nav style={styles.navbar}>
            <div style={styles.navContent}>
                <h1 style={styles.logo}>Admin Panel</h1>
                <ul style={styles.navMenu}>
                    <li style={styles.navItem}>
                        <Link to="/admin/create" style={styles.navLink}>Create Product</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/admin/view" style={styles.navLink}>View Products</Link>
                    </li>
                    <li style={styles.navItem}>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
        <div style={styles.content}>
            <Outlet/>
        </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    backgroundColor: '#333',
    padding: '0 20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '700',
    margin: 0,
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '15px',
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '15px 20px',
    transition: 'background-color 0.3s',
    fontWeight: '500',
    fontSize: '14px',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  content: {
    flex: 1,
  },
};

export default Nav;
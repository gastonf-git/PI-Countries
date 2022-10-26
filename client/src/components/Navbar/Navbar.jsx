import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to='/' className={styles.linkLanding} >Countries App</Link>
      <ul className={styles.menu}>
        <li><Link to="/countries">Home</Link></li>
        <li><Link to="/countries/create">Create Activity</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
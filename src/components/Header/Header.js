import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.scss';

const Header = () => (
  <div className={styles.header}>
    <Link className={`${styles.link} ${styles.logo}`} to="/">Hacker News</Link>
    <Link className={styles.link} to="/top">top</Link>
    <Link className={styles.link} to="/new">new</Link>
    <Link className={styles.link} to="/show">show</Link>
    <Link className={styles.link} to="/ask">ask</Link>
    <Link className={styles.link} to="/jobs">jobs</Link>
  </div>
);

export default Header;

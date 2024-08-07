import React from 'react';

export default function HeaderLab() {
  return (
    <div style={styles.header}>
      <ul style={styles.navList}>
        <li style={{ ...styles.navItem, ...styles.navItemHome }}>Home</li>
        <li style={styles.navItem}>Search</li>
        <li style={styles.navItem}>Contact</li>
        <li style={{ ...styles.navItem, ...styles.navItemLogin }}>Login</li>
      </ul>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: 'gray',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '20px',
    marginLeft: 10,
    margin: 0,
    padding: 0,
  },
  navItem: {
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.3s, background-color 0.3s',
    padding: '10px',
  },
  navItemHome: {
    backgroundColor: 'lightGreen',
  },
  navItemLogin: {
    backgroundColor: 'black',
  },
};

// Add hover effect using a CSS-in-JS approach
const hoverStyles = document.createElement('style');
hoverStyles.innerHTML = `
  li:hover {
    color: lightgray !important;
  }
`;
document.head.appendChild(hoverStyles);

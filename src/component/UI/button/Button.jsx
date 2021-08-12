import React from 'react';
import styles from './Button.module.css';

const Button = ({children, ...props}) => {
    return (
        <button {...props} className={styles.myBtn}>
            {children}
        </button>
    );
};

export default Button;
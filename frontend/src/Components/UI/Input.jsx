import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({ label, type = 'text', id, placeholder, error, ...props }, ref) => {
    return (
        <div className={styles.inputGroup}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <input
                ref={ref}
                id={id}
                type={type}
                className={`${styles.input} ${error ? styles.error : ''}`}
                placeholder={placeholder}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;

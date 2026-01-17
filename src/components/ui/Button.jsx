import React from 'react';
import { motion } from 'framer-motion';
import css from './Button.module.css';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${css.button} ${css[variant]} ${className}`}
            onClick={onClick}
        >
            <span className={css.content}>{children}</span>
            <div className={css.glow} />
        </motion.button>
    );
};

export default Button;

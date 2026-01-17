import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import css from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
                <div className={css.top}>
                    <div className={css.brand}>
                        <h2>FARMFIT<span className={css.dot}>.</span></h2>
                        <p>Forging elite bodies since 2024.</p>
                    </div>

                    <div className={css.links}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Support</a>
                    </div>

                    <div className={css.socials}>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Youtube size={20} /></a>
                    </div>
                </div>

                <div className={css.bottom}>
                    <p>&copy; {new Date().getFullYear()} FarmFit. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

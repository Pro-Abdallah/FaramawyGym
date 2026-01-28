import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import css from './Navbar.module.css';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: 'Training Splits', href: '/#splits', type: 'anchor' },
        { name: 'Diet Plans', href: '/#diet', type: 'anchor' },
        { name: 'Results', href: '/#results', type: 'anchor' },
        { name: 'Coaching', href: '/#plans', type: 'anchor' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleNav = (link) => {
        if (link.type === 'route') {
            navigate(link.href);
        } else {
            if (location.pathname === '/') {
                const element = document.querySelector(link.href.replace('/', ''));
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(link.href.replace('/', ''));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`${css.navbar} ${scrolled ? css.scrolled : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={css.container}>
                    <Link to="/" className={css.logo}>
                        FARAMAWY<span className={css.dot}></span>
                    </Link>

                    <div className={css.desktopMenu}>
                        {navLinks.map((link) => (
                            <button key={link.name} onClick={() => handleNav(link)} className={css.link}>
                                {link.name}
                            </button>
                        ))}
                    </div>

                    <div className={css.cta}>
                        <button onClick={toggleLang} className={css.langBtn}>
                            <Globe size={20} color="#fff" />
                            <span className={css.langCode}>{i18n.language === 'en' ? 'AR' : 'EN'}</span>
                        </button>
                        <Button variant="primary" onClick={() => navigate('/plans')} className={css.joinBtn}>{t('nav.join')}</Button>
                        <button
                            className={css.hamburger}
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu color="#fff" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className={css.mobileOverlay}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <div className={css.mobileHeader}>
                            <div className={css.logo}>FARAMAWY</div>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X color="#fff" />
                            </button>
                        </div>
                        <div className={css.mobileLinks}>
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    className={css.mobileLink}
                                    onClick={() => handleNav(link)}
                                >
                                    {link.name}
                                </button>
                            ))}
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <button onClick={toggleLang} style={{ color: '#fff', fontSize: '1.2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <Globe size={24} /> {i18n.language === 'en' ? 'Arabic' : 'English'}
                                </button>
                            </div>
                            <Button variant="primary" className={css.mobileBtn}>{t('nav.join')}</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

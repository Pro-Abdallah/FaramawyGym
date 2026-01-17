import React from 'react';
import Button from '../ui/Button';
import Section from '../ui/Section';
import css from './Contact.module.css';

const Contact = () => {
    return (
        <Section id="contact" className={css.section}>
            <div className={css.container}>
                <div className={css.info}>
                    <h2 className={css.title}>Start Your Journey</h2>
                    <p className={css.text}>
                        Ready to change your life? Visit us or drop a message.
                        Our team is ready to guide you to your peak performance.
                    </p>

                    <div className={css.details}>
                        <div className={css.detailItem}>
                            <h3>Location</h3>
                            <p>123 Iron Street, Muscle City, CA 90210</p>
                        </div>
                        <div className={css.detailItem}>
                            <h3>Hours</h3>
                            <p>Mon - Fri: 5am - 11pm<br />Sat - Sun: 7am - 9pm</p>
                        </div>
                        <div className={css.detailItem}>
                            <h3>Contact</h3>
                            <p>+1 (555) 123-4567<br />join@farmfit.com</p>
                        </div>
                    </div>
                </div>

                <form className={css.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={css.formGroup}>
                        <input type="text" placeholder="Name" className={css.input} />
                    </div>
                    <div className={css.formGroup}>
                        <input type="email" placeholder="Email" className={css.input} />
                    </div>
                    <div className={css.formGroup}>
                        <select className={css.select}>
                            <option>Goal: Muscle Gain</option>
                            <option>Goal: Weight Loss</option>
                            <option>Goal: General Fitness</option>
                        </select>
                    </div>
                    <div className={css.formGroup}>
                        <textarea placeholder="Message" className={css.textarea} rows="4"></textarea>
                    </div>
                    <Button variant="primary" className={css.btn}>Send Message</Button>
                </form>
            </div>
        </Section>
    );
};

export default Contact;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    FileText,
    CheckCircle,
    Clock,
    Download,
    Eye,
    LogOut,
    Filter,
    Search,
    X,
    ExternalLink,
    ChevronRight,
    Smartphone
} from 'lucide-react';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton/Skeleton';
import css from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
    const [selectedClient, setSelectedClient] = useState(null);

    // Login handler
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            fetchSubmissions();
        }
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/submissions');
            const data = await response.json();
            setSubmissions(data.submissions);

            // Calculate stats
            const total = data.submissions.length;
            const pending = data.submissions.filter(s => s.status === 'Pending').length;
            const completed = data.submissions.filter(s => s.status === 'Done').length;
            setStats({ total, pending, completed });
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/submissions/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                fetchSubmissions();
                if (selectedClient && selectedClient._id === id) {
                    setSelectedClient(prev => ({ ...prev, status: newStatus }));
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={css.loginContainer}>
                <div className={css.loginBg}>
                    <div className={css.loginGlow}></div>
                </div>
                <motion.div
                    className={css.loginCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                >
                    <div className={css.loginHeader}>
                        <div className={css.loginIcon}>
                            <Users size={32} />
                        </div>
                        <h1>FARAMAWY ELITE</h1>
                        <span>Admin Access Portal</span>
                    </div>
                    <form onSubmit={handleLogin} className={css.loginForm}>
                        <div className={css.inputWrapper}>
                            <input
                                type="password"
                                placeholder="Master Access Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                        <Button variant="primary" type="submit" className={css.loginSubmit}>
                            Connect to Dashboard <ChevronRight size={18} />
                        </Button>
                    </form>
                    <div className={css.loginFooter}>
                        System secured with AES-256 for biometric data
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={css.dashboard}>
            <div className={css.sidebar}>
                <div className={css.logo}>FARAMAWY Elite</div>
                <nav>
                    <button className={css.navBtnActive}><Users size={20} /> Clients</button>
                    <button className={css.navBtn}><FileText size={20} /> PDF Archives</button>
                    <button className={css.navBtn}><CheckCircle size={20} /> Success Stories</button>
                </nav>
                <button className={css.logout} onClick={() => setIsAuthenticated(false)}>
                    <LogOut size={20} /> Logout
                </button>
            </div>

            <main className={css.main}>
                <header className={css.header}>
                    <h2>Submissions Management</h2>
                    <div className={css.statsGrid}>
                        <div className={css.statItem}>
                            <Users size={20} color="#FF1E1E" />
                            <div><span>Total Traffic</span><strong>{stats.total}</strong></div>
                        </div>
                        <div className={css.statItem}>
                            <Clock size={20} color="#FFA500" />
                            <div><span>Awaiting Review</span><strong>{stats.pending}</strong></div>
                        </div>
                        <div className={css.statItem}>
                            <CheckCircle size={20} color="#00FF00" />
                            <div><span>Confirmed Trans.</span><strong>{stats.completed}</strong></div>
                        </div>
                    </div>
                </header>

                <div className={css.tableSection}>
                    <div className={css.tableHeader}>
                        <div className={css.search}>
                            <Search size={18} />
                            <input type="text" placeholder="Filter by name..." />
                        </div>
                    </div>

                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Plan Selected</th>
                                <th>Review Status</th>
                                <th>Received On</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan="6"><Skeleton height="50px" /></td></tr>
                                ))
                            ) : (
                                submissions.map(sub => (
                                    <tr key={sub._id} onClick={() => setSelectedClient(sub)} className={css.clickableRow}>
                                        <td>{sub.personalInfo.name}</td>
                                        <td><span className={css.serviceTag}>{sub.service.name}</span></td>
                                        <td>
                                            <span className={`${css.statusBadge} ${css[sub.status.toLowerCase()]}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                                        <td>{sub.payment.status}</td>
                                        <td className={css.actions}>
                                            <button className={css.reviewBtn} onClick={(e) => { e.stopPropagation(); setSelectedClient(sub); }}>
                                                Review <ChevronRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Client Detail Modal */}
            <AnimatePresence>
                {selectedClient && (
                    <motion.div
                        className={css.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={css.modal}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                        >
                            <div className={css.modalHeader}>
                                <div>
                                    <h3>Client Profile: {selectedClient.personalInfo.name}</h3>
                                    <span className={css.modalSubtitle}>Applied for {selectedClient.service.name}</span>
                                </div>
                                <button className={css.closeBtn} onClick={() => setSelectedClient(null)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className={css.modalContent}>
                                <div className={css.modalGrid}>
                                    <section className={css.infoSection}>
                                        <h4>Biometric Data</h4>
                                        <div className={css.biometricGrid}>
                                            <div className={css.bioItem}><span>Age</span><strong>{selectedClient.personalInfo.age}</strong></div>
                                            <div className={css.bioItem}><span>Phone</span><strong>{selectedClient.personalInfo.phone}</strong></div>
                                            <div className={css.bioItem}><span>Gender</span><strong>{selectedClient.personalInfo.gender}</strong></div>
                                        </div>

                                        <h4>Health & Preferences</h4>
                                        <div className={css.healthInfo}>
                                            <div className={css.healthItem}>
                                                <label>Injuries/Diseases</label>
                                                <p>{selectedClient.healthStats.diseaseDetail || 'None reported'}</p>
                                            </div>
                                            <div className={css.healthItem}>
                                                <label>Allergies</label>
                                                <p>{selectedClient.healthStats.allergies || 'No allergies'}</p>
                                            </div>
                                            <div className={css.healthItem}>
                                                <label>Carbs Preference</label>
                                                <p>{selectedClient.healthStats.carbPreferences?.join(', ') || 'Not specified'}</p>
                                            </div>
                                            <div className={css.healthItem}>
                                                <label>Protein Preference</label>
                                                <p>{selectedClient.healthStats.proteinPreferences?.join(', ') || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section className={css.mediaSection}>
                                        <h4>Uploaded Media</h4>
                                        <div className={css.imageGallery}>
                                            {selectedClient.bodyImages.front && (
                                                <div className={css.galleryItem}>
                                                    <label>Front View</label>
                                                    <img src={`http://localhost:5000${selectedClient.bodyImages.front}`} alt="Front" />
                                                </div>
                                            )}
                                            {selectedClient.bodyImages.side && (
                                                <div className={css.galleryItem}>
                                                    <label>Side View</label>
                                                    <img src={`http://localhost:5000${selectedClient.bodyImages.side}`} alt="Side" />
                                                </div>
                                            )}
                                            {selectedClient.bodyImages.back && (
                                                <div className={css.galleryItem}>
                                                    <label>Back View</label>
                                                    <img src={`http://localhost:5000${selectedClient.bodyImages.back}`} alt="Back" />
                                                </div>
                                            )}
                                            {selectedClient.bodyImages.aimBody && (
                                                <div className={css.galleryItem}>
                                                    <label>Aim Body Goal</label>
                                                    <img src={`http://localhost:5000${selectedClient.bodyImages.aimBody}`} alt="Aim Body" />
                                                </div>
                                            )}
                                            {selectedClient.payment.proofUrl && (
                                                <div className={css.galleryItem}>
                                                    <label>Payment Proof</label>
                                                    <img src={`http://localhost:5000${selectedClient.payment.proofUrl}`} alt="Payment" />
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                <div className={css.modalFooter}>
                                    <div className={css.statusActions}>
                                        <label>Management Status:</label>
                                        <div className={css.statusBtns}>
                                            <button
                                                className={`${css.statusBtn} ${selectedClient.status === 'Pending' ? css.activePending : ''}`}
                                                onClick={() => updateStatus(selectedClient._id, 'Pending')}
                                            >
                                                Pending
                                            </button>
                                            <button
                                                className={`${css.statusBtn} ${selectedClient.status === 'Processing' ? css.activeProcessing : ''}`}
                                                onClick={() => updateStatus(selectedClient._id, 'Processing')}
                                            >
                                                Processing
                                            </button>
                                            <button
                                                className={`${css.statusBtn} ${selectedClient.status === 'Done' ? css.activeDone : ''}`}
                                                onClick={() => updateStatus(selectedClient._id, 'Done')}
                                            >
                                                Mark Done
                                            </button>
                                        </div>
                                    </div>
                                    <div className={css.primaryActions}>
                                        <Button
                                            variant="outline"
                                            className={css.pdfBtn}
                                            onClick={() => selectedClient.pdfUrl && window.open(`http://localhost:5000${selectedClient.pdfUrl}`, '_blank')}
                                            disabled={!selectedClient.pdfUrl}
                                        >
                                            <Download size={18} /> {selectedClient.pdfUrl ? 'Download Client PDF' : 'PDF Generating...'}
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => window.open(`https://wa.me/${selectedClient.personalInfo.phone}`, '_blank')}
                                        >
                                            <Smartphone size={18} /> Contact via WhatsApp
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;

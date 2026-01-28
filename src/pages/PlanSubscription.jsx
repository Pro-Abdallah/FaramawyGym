import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ChevronRight,
    ChevronLeft,
    Camera,
    Upload,
    CheckCircle2,
    AlertCircle,
    Smartphone,
    CreditCard,
    Info
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import css from './PlanSubscription.module.css';

const STEPS = [
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Body Images' },
    { id: 3, title: 'Health & Preferences' },
    { id: 4, title: 'Payment' },
    { id: 5, title: 'Success' }
];

const PlanSubscription = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const plan = location.state?.plan;
    const mode = location.state?.mode || 'full'; // 'full' or 'quick'
    const isRtl = i18n.language === 'ar';

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        personalInfo: { name: '', age: '', gender: '', phone: '' },
        healthStats: {
            weight: '',
            height: '',
            diseases: 'NO',
            diseaseDetail: '',
            allergies: '',
            carbPreferences: [],
            proteinPreferences: [],
            supplements: ''
        },
        bodyImages: { front: null, side: null, back: null, aimBody: null },
        previews: { front: null, side: null, back: null, aimBody: null },
        paymentMethod: 'Vodafone Cash',
        paymentProof: null,
        paymentProofPreview: null
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!plan) navigate('/plans');
    }, [plan, navigate]);

    // Step mapping for quick mode
    const getSTEPS = () => {
        if (mode === 'quick') {
            return [
                { id: 1, label: 'Info' },
                { id: 2, label: 'Payment' },
                { id: 3, label: 'Success' }
            ];
        }
        return [
            { id: 1, label: 'Info' },
            { id: 2, label: 'Images' },
            { id: 3, label: 'Health' },
            { id: 4, label: 'Payment' },
            { id: 5, label: 'Success' }
        ];
    };

    const steps = getSTEPS();
    const totalSteps = steps.length;

    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
    };

    const validateStep = () => {
        let newErrors = {};
        if (currentStep === 1) {
            if (!formData.personalInfo.name) newErrors.name = 'Required';
            if (!formData.personalInfo.age) newErrors.age = 'Required';
            if (!formData.personalInfo.phone) newErrors.phone = 'Required';
        } else if (mode === 'full' && currentStep === 2) {
            if (!formData.bodyImages.front) newErrors.front = 'Front image required';
            if (!formData.bodyImages.side) newErrors.side = 'Side image required';
            if (!formData.bodyImages.back) newErrors.back = 'Back image required';
        } else if ((mode === 'full' && currentStep === 4) || (mode === 'quick' && currentStep === 2)) {
            if (!formData.paymentProof) newErrors.paymentProof = 'Payment proof required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'paymentProof') {
                    setFormData(prev => ({
                        ...prev,
                        paymentProof: file,
                        paymentProofPreview: reader.result
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        bodyImages: { ...prev.bodyImages, [field]: file },
                        previews: { ...prev.previews, [field]: reader.result }
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const togglePreference = (category, value) => {
        setFormData(prev => {
            const currentPrefs = prev.healthStats[category];
            let newPrefs;

            if (value === 'All') {
                // If "All" is selected, we might want to clear others or just handle it as a special case
                // For this implementation, let's say "All" toggles all relevant items or just stays as "All"
                newPrefs = currentPrefs.includes('All') ? [] : ['All'];
            } else {
                if (currentPrefs.includes(value)) {
                    newPrefs = currentPrefs.filter(p => p !== value);
                } else {
                    // Remove "All" if a specific item is selected
                    newPrefs = [...currentPrefs.filter(p => p !== 'All'), value];
                }
            }

            return {
                ...prev,
                healthStats: { ...prev.healthStats, [category]: newPrefs }
            };
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});

        try {
            const data = new FormData();

            // Append files
            if (formData.paymentProof) data.append('paymentProof', formData.paymentProof);
            if (formData.bodyImages.front) data.append('front', formData.bodyImages.front);
            if (formData.bodyImages.side) data.append('side', formData.bodyImages.side);
            if (formData.bodyImages.back) data.append('back', formData.bodyImages.back);
            if (formData.bodyImages.aimBody) data.append('aimBody', formData.bodyImages.aimBody);

            // Append JSON data
            const submissionData = {
                personalInfo: formData.personalInfo,
                healthStats: formData.healthStats,
                paymentMethod: formData.paymentMethod,
                service: {
                    type: plan.type,
                    name: plan.title,
                    price: plan.price || plan.priceMonthly
                }
            };
            data.append('data', JSON.stringify(submissionData));

            const response = await fetch('http://localhost:5000/api/submit', {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed');
            }

            setLoading(false);
            setCurrentStep(totalSteps);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: error.message });
            setLoading(false);
        }
    };

    const renderProgressBar = () => (
        <div className={css.progressBarContainer}>
            <div className={css.progressLabels}>
                {steps.map(step => (
                    <span
                        key={step.id}
                        className={`${css.stepLabel} ${currentStep >= step.id ? css.activeLabel : ''}`}
                    >
                        {step.id}
                    </span>
                ))}
            </div>
            <div className={css.progressBar}>
                <motion.div
                    className={css.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
            </div>
        </div>
    );

    const renderStep = () => {
        const step = currentStep;

        // Step 1 is always Personal Info
        if (step === 1) {
            return (
                <div className={css.stepContent}>
                    <h2>{t('subscription.steps.personal.title', 'Personal Info')}</h2>
                    <div className={css.inputGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={formData.personalInfo.name}
                            onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, name: e.target.value } })}
                            placeholder="Your full name"
                        />
                        {errors.name && <span className={css.error}>{errors.name}</span>}
                    </div>
                    <div className={css.grid2}>
                        <div className={css.inputGroup}>
                            <label>Age</label>
                            <input
                                type="number"
                                value={formData.personalInfo.age}
                                onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, age: e.target.value } })}
                                placeholder="25"
                            />
                            {errors.age && <span className={css.error}>{errors.age}</span>}
                        </div>
                        <div className={css.inputGroup}>
                            <label>Gender</label>
                            <select
                                value={formData.personalInfo.gender}
                                onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, gender: e.target.value } })}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className={css.inputGroup}>
                        <label>Phone Number/WhatsApp</label>
                        <input
                            type="tel"
                            value={formData.personalInfo.phone}
                            onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, phone: e.target.value } })}
                            placeholder="01XXXXXXXXX"
                        />
                        {errors.phone && <span className={css.error}>{errors.phone}</span>}
                    </div>
                </div>
            );
        }

        // Success step
        if (step === totalSteps) {
            return (
                <div className={css.successStep}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10 }}
                    >
                        <CheckCircle2 size={80} color="#FF1E1E" />
                    </motion.div>
                    <h2>Done!</h2>
                    <p>We received your request. You will be contacted shortly via WhatsApp to receive your {plan.type}.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
                </div>
            );
        }

        // Mode specific middle steps
        if (mode === 'quick') {
            // In quick mode, Step 2 is payment
            if (step === 2) return renderPaymentStep();
        } else {
            // In full mode
            if (step === 2) return renderImageStep();
            if (step === 3) return renderHealthStep();
            if (step === 4) return renderPaymentStep();
        }
        return null;
    };

    const renderImageStep = () => (
        <div className={css.stepContent}>
            <h2>{t('subscription.steps.images.title', 'Body Images')}</h2>
            <div className={css.imageGrid}>
                {['front', 'side', 'back', 'aimBody'].map((pos) => (
                    <div key={pos} className={css.uploadBox}>
                        <label>{pos.charAt(0).toUpperCase() + pos.slice(1)} {pos === 'aimBody' && '(Optional)'}</label>
                        <div className={css.previewContainer}>
                            {formData.previews[pos] ? (
                                <div className={css.previewWrapper}>
                                    <img src={formData.previews[pos]} alt={pos} />
                                    <button onClick={() => setFormData({ ...formData, previews: { ...formData.previews, [pos]: null }, bodyImages: { ...formData.bodyImages, [pos]: null } })}>
                                        Retake
                                    </button>
                                </div>
                            ) : (
                                <div className={css.dropzone} onClick={() => document.getElementById(`upload-${pos}`).click()}>
                                    <Camera size={24} />
                                    <span>Click to upload or take photo</span>
                                    <input
                                        id={`upload-${pos}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, pos)}
                                        hidden
                                    />
                                </div>
                            )}
                        </div>
                        {errors[pos] && <span className={css.error}>{errors[pos]}</span>}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderHealthStep = () => (
        <div className={css.stepContent}>
            <h2>{t('subscription.steps.health.title', 'Health & Preferences')}</h2>

            <div className={css.inputGroup}>
                <label>Diseases or Injuries?</label>
                <div className={css.radioGroup}>
                    <button className={formData.healthStats.diseases === 'YES' ? css.active : ''} onClick={() => setFormData({ ...formData, healthStats: { ...formData.healthStats, diseases: 'YES' } })}>Yes</button>
                    <button className={formData.healthStats.diseases === 'NO' ? css.active : ''} onClick={() => setFormData({ ...formData, healthStats: { ...formData.healthStats, diseases: 'NO' } })}>No</button>
                </div>
            </div>
            {formData.healthStats.diseases === 'YES' && (
                <div className={css.inputGroup}>
                    <label>Please specify</label>
                    <textarea
                        value={formData.healthStats.diseaseDetail}
                        onChange={(e) => setFormData({ ...formData, healthStats: { ...formData.healthStats, diseaseDetail: e.target.value } })}
                        placeholder="Detail your injuries or health conditions"
                    />
                </div>
            )}

            <div className={css.inputGroup}>
                <label>Any food allergies?</label>
                <textarea
                    value={formData.healthStats.allergies}
                    onChange={(e) => setFormData({ ...formData, healthStats: { ...formData.healthStats, allergies: e.target.value } })}
                    placeholder="List any food allergies here"
                />
            </div>

            <div className={css.inputGroup}>
                <label>Carb Preferences</label>
                <div className={css.preferenceGrid}>
                    {['Oats', 'Rice', 'Potatoes', 'All'].map(pref => (
                        <button
                            key={pref}
                            className={`${css.prefBtn} ${formData.healthStats.carbPreferences.includes(pref) ? css.prefBtnActive : ''}`}
                            onClick={() => togglePreference('carbPreferences', pref)}
                        >
                            {pref}
                        </button>
                    ))}
                </div>
            </div>

            <div className={css.inputGroup}>
                <label>Protein Preferences</label>
                <div className={css.preferenceGrid}>
                    {['Chicken', 'Meat', 'Fish', 'Eggs', 'All'].map(pref => (
                        <button
                            key={pref}
                            className={`${css.prefBtn} ${formData.healthStats.proteinPreferences.includes(pref) ? css.prefBtnActive : ''}`}
                            onClick={() => togglePreference('proteinPreferences', pref)}
                        >
                            {pref}
                        </button>
                    ))}
                </div>
            </div>

            <div className={css.inputGroup}>
                <label>Supplements (If applicable)</label>
                <textarea
                    value={formData.healthStats.supplements}
                    onChange={(e) => setFormData({ ...formData, healthStats: { ...formData.healthStats, supplements: e.target.value } })}
                    placeholder="List supplements you currently use"
                />
            </div>
        </div>
    );

    const renderPaymentStep = () => (
        <div className={css.stepContent}>
            <h2>{t('subscription.steps.payment.title', 'Payment')}</h2>
            <div className={css.paymentMethods}>
                <div
                    className={`${css.methodCard} ${formData.paymentMethod === 'Vodafone Cash' ? css.activeMethod : ''}`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'Vodafone Cash' })}
                >
                    <Smartphone size={24} />
                    <span>Vodafone Cash</span>
                </div>
                <div
                    className={`${css.methodCard} ${formData.paymentMethod === 'InstaPay' ? css.activeMethod : ''}`}
                    onClick={() => setFormData({ ...formData, paymentMethod: 'InstaPay' })}
                >
                    <CreditCard size={24} />
                    <span>InstaPay</span>
                </div>
            </div>
            <div className={css.amountBox}>
                <p>Transfer {plan.title}:</p>
                <h3>EGP {plan.price || plan.priceMonthly}</h3>
                <p className={css.pNumber}>Send to: <strong>01123456789</strong></p>
            </div>
            <div className={css.uploadBox}>
                <label>Upload Payment Proof (Screenshot)</label>
                {formData.paymentProofPreview ? (
                    <div className={css.previewWrapper}>
                        <img src={formData.paymentProofPreview} alt="Proof" />
                        <button onClick={() => setFormData({ ...formData, paymentProof: null, paymentProofPreview: null })}>Change</button>
                    </div>
                ) : (
                    <div className={css.dropzone} onClick={() => document.getElementById('upload-proof').click()}>
                        <Upload size={24} />
                        <span>Upload proof/screenshot</span>
                        <input id="upload-proof" type="file" onChange={(e) => handleFileChange(e, 'paymentProof')} hidden />
                    </div>
                )}
                {errors.paymentProof && <span className={css.error}>{errors.paymentProof}</span>}
            </div>
        </div>
    );

    return (
        <div className={css.page}>
            <Navbar />
            <div className={css.container}>
                {renderProgressBar()}
                <div className={css.formCard}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>

                    {currentStep < totalSteps && (
                        <div className={css.controls}>
                            {currentStep > 1 && (
                                <button className={css.backBtn} onClick={handleBack}>
                                    <ChevronLeft size={20} /> Back
                                </button>
                            )}
                            <Button
                                variant="primary"
                                className={css.nextBtn}
                                onClick={currentStep === totalSteps - 1 ? handleSubmit : handleNext}
                                loading={loading}
                            >
                                {currentStep === totalSteps - 1 ? 'Submit' : 'Continue'} <ChevronRight size={20} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PlanSubscription;

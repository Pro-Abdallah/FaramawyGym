import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String },
        phone: { type: String, required: true }
    },
    bodyImages: {
        front: { type: String }, // Optional for quick mode
        side: { type: String },
        back: { type: String },
        aimBody: { type: String }
    },
    healthStats: {
        weight: { type: Number },
        height: { type: Number },
        diseases: { type: String },
        diseaseDetail: { type: String },
        allergies: { type: String },
        carbPreferences: [{ type: String }],
        proteinPreferences: [{ type: String }],
        supplements: { type: String }
    },
    payment: {
        method: { type: String, required: true }, // 'InstaPay' or 'Vodafone Cash'
        proofUrl: { type: String, required: true },
        status: { type: String, enum: ['Pending', 'Confirmed', 'Rejected'], default: 'Pending' }
    },
    service: {
        type: { type: String, required: true }, // 'Diet Plan', 'Split Plan', 'Coaching Package'
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    pdfUrl: { type: String },
    status: { type: String, enum: ['Pending', 'Processing', 'Done'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);

import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { submissionDB } from '../utils/jsonDb.js';
import { generateClientPDF } from '../utils/pdfGenerator.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Storage Config - Using Disk Storage for Robust Testing
const uploadDir = path.join(__dirname, '../uploads/submissions');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Multi-step form submission
router.post('/submit', upload.fields([
    { name: 'front', maxCount: 1 },
    { name: 'side', maxCount: 1 },
    { name: 'back', maxCount: 1 },
    { name: 'aimBody', maxCount: 1 },
    { name: 'paymentProof', maxCount: 1 }
]), async (req, res) => {
    try {
        const body = JSON.parse(req.body.data);
        const files = req.files;

        const getFileUrl = (fileName) => fileName ? `/uploads/submissions/${fileName}` : null;

        const newSubmission = {
            personalInfo: body.personalInfo,
            healthStats: body.healthStats,
            service: body.service,
            status: 'Pending',
            payment: {
                method: body.paymentMethod,
                proofUrl: files['paymentProof'] ? getFileUrl(files['paymentProof'][0].filename) : null,
                status: 'Pending'
            },
            bodyImages: {
                front: files['front'] ? getFileUrl(files['front'][0].filename) : null,
                side: files['side'] ? getFileUrl(files['side'][0].filename) : null,
                back: files['back'] ? getFileUrl(files['back'][0].filename) : null,
                aimBody: files['aimBody'] ? getFileUrl(files['aimBody'][0].filename) : null
            }
        };

        const savedSubmission = await submissionDB.save(newSubmission);

        // Generate PDF
        try {
            const pdfUrl = await generateClientPDF(savedSubmission);
            await submissionDB.findByIdAndUpdate(savedSubmission._id, { pdfUrl });
        } catch (pdfErr) {
            console.error('PDF Generation failed:', pdfErr);
        }

        res.status(201).json({ success: true, message: 'Submission received successfully' });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update Submission Status
router.patch('/submissions/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const submission = await submissionDB.findByIdAndUpdate(
            req.params.id,
            { status }
        );
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Dashboard Data
router.get('/submissions', async (req, res) => {
    try {
        const { status } = req.query;
        const submissions = await submissionDB.find({ status });
        const count = await submissionDB.countDocuments({ status });

        res.json({
            submissions,
            total: count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

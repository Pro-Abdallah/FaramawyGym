import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateClientPDF = async (submission) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const fileName = `Client_${submission._id}.pdf`;
            const dir = path.join(__dirname, '../uploads/pdfs');

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const filePath = path.join(dir, fileName);
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            // Brand Header
            doc.fillColor('#FF1E1E').fontSize(25).text('FARAMAWY ELITE', { align: 'center' });
            doc.fillColor('#444').fontSize(10).text('OFFICIAL CLIENT SUBMISSION REPORT', { align: 'center' });
            doc.moveDown(2);

            // Divider
            doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#eee').stroke();
            doc.moveDown(2);

            // Client Info
            doc.fillColor('#000').fontSize(16).text('Client Information', { underline: true });
            doc.moveDown();
            doc.fontSize(12).text(`Name: ${submission.personalInfo.name}`);
            doc.text(`Age: ${submission.personalInfo.age}`);
            doc.text(`Phone: ${submission.personalInfo.phone}`);
            doc.text(`Gender: ${submission.personalInfo.gender}`);
            doc.moveDown();

            // Service Info
            doc.fillColor('#000').fontSize(16).text('Selected Program', { underline: true });
            doc.moveDown();
            doc.fontSize(12).text(`Program: ${submission.service.name}`);
            doc.text(`Type: ${submission.service.type}`);
            doc.text(`Price: EGP ${submission.service.price}`);
            doc.moveDown();

            // Health Info
            doc.fillColor('#000').fontSize(16).text('Biometrics & Health', { underline: true });
            doc.moveDown();
            doc.fontSize(12).text(`Diseases/Injuries: ${submission.healthStats.diseases === 'YES' ? submission.healthStats.diseaseDetail : 'None'}`);
            doc.text(`Allergies: ${submission.healthStats.allergies || 'None'}`);
            doc.text(`Carb Preferences: ${submission.healthStats.carbPreferences.join(', ') || 'N/A'}`);
            doc.text(`Protein Preferences: ${submission.healthStats.proteinPreferences.join(', ') || 'N/A'}`);
            doc.text(`Supplements: ${submission.healthStats.supplements || 'None'}`);
            doc.moveDown(2);

            // Media Links (Cloudinary or Local URLs)
            doc.fillColor('#000').fontSize(16).text('Uploaded Media Links', { underline: true });
            doc.moveDown();
            const baseUrl = 'http://localhost:5000';
            if (submission.bodyImages.front) doc.fillColor('blue').text('Front View Image', { link: baseUrl + submission.bodyImages.front });
            if (submission.bodyImages.side) doc.fillColor('blue').text('Side View Image', { link: baseUrl + submission.bodyImages.side });
            if (submission.bodyImages.back) doc.fillColor('blue').text('Back View Image', { link: baseUrl + submission.bodyImages.back });
            if (submission.payment.proofUrl) doc.fillColor('blue').text('Payment Proof Screenshot', { link: baseUrl + submission.payment.proofUrl });

            // Footer
            doc.moveDown(4);
            doc.fillColor('#999').fontSize(8).text(`Generated on ${new Date().toLocaleString()} | ID: ${submission._id}`, { align: 'center' });

            doc.end();

            stream.on('finish', () => {
                resolve(`/uploads/pdfs/${fileName}`);
            });

        } catch (error) {
            reject(error);
        }
    });
};

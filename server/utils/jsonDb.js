import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

class JsonDB {
    async find(query = {}) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        let data = JSON.parse(raw);

        if (query.status) {
            data = data.filter(s => s.status === query.status);
        }

        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    async findById(id) {
        const data = await this.find();
        return data.find(s => s._id === id);
    }

    async save(submission) {
        const data = await this.find();
        const newSubmission = {
            ...submission,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        data.push(newSubmission);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return newSubmission;
    }

    async findByIdAndUpdate(id, update, options = {}) {
        const data = await this.find();
        const index = data.findIndex(s => s._id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...update };
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
            return data[index];
        }
        return null;
    }

    async countDocuments(query = {}) {
        const data = await this.find(query);
        return data.length;
    }
}

export const submissionDB = new JsonDB();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import getVideoRoute from './api/getVideo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/getVideo', getVideoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

// server.js
import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint ดาวน์โหลดวิดีโอ Facebook
app.get('/api/facebook', (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !videoURL.startsWith('http')) {
    return res.status(400).json({ error: 'ลิงก์ไม่ถูกต้อง' });
  }

  const filename = `facebook_video_${Date.now()}.mp4`;
  const outputFile = path.join(__dirname, filename);
  const command = `yt-dlp -f best -o "${outputFile}" "${videoURL}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('เกิดข้อผิดพลาด:', stderr);
      return res.status(500).json({ error: 'ไม่สามารถดาวน์โหลดวิดีโอได้' });
    }

    // ส่งไฟล์วิดีโอกลับไปให้ดาวน์โหลด
    res.download(outputFile, 'facebook-video.mp4', (err) => {
      fs.unlink(outputFile, () => {}); // ลบไฟล์หลังส่งเสร็จ
      if (err) console.error('ส่งไฟล์ไม่สำเร็จ:', err);
    });
  });
});

app.listen(port, () => {
  console.log(`Facebook video downloader server running at http://localhost:${port}`);
});

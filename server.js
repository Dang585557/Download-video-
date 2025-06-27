// ✅ server.js (ฝั่ง Backend Node.js จริง)

import express from 'express'; import cors from 'cors'; import { exec } from 'child_process';

const app = express(); const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ API ดาวน์โหลดวิดีโอ Facebook จริง app.get('/api/getVideo', async (req, res) => { const videoURL = req.query.url;

if (!videoURL || !videoURL.includes('facebook.com')) { return res.status(400).json({ error: 'ลิงก์ไม่ถูกต้อง ต้องเป็นลิงก์ Facebook เท่านั้น' }); }

const cmd = yt-dlp -J "${videoURL}"; exec(cmd, (error, stdout, stderr) => { if (error) { console.error('เกิดข้อผิดพลาด:', stderr); return res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' }); }

try {
  const json = JSON.parse(stdout);
  const formats = json.formats
    .filter(f => f.ext === 'mp4' && f.url)
    .map(f => ({
      quality: f.format_note || f.height + 'p',
      url: f.url
    }));

  res.json({ title: json.title, thumbnail: json.thumbnail, formats });
} catch (parseError) {
  return res.status(500).json({ error: 'แปลงข้อมูลวิดีโอล้มเหลว' });
}

}); });

// ✅ Start Server app.listen(PORT, () => { console.log(Server is running on port ${PORT}); });


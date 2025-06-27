// server.js
import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

fetch('/api/video')
  .then(async res => {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    } else {
      const text = await res.text();
      throw new Error('Unexpected response: ' + text);
    }
  })
  .then(data => { /* ... */ })
  .catch(err => console.error(err));
  }

  exec(`yt-dlp -J "${videoUrl}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('yt-dlp error:', stderr);
      return res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' });
    }

    try {
      const data = JSON.parse(stdout);
      const formats = data.formats
        .filter(f => f.ext === 'mp4' && f.url)
        .map(f => ({
          quality: f.format_note || `${f.height}p`,
          url: f.url
        }));
      res.json({ title: data.title, formats });
    } catch (e) {
      res.status(500).json({ error: 'วิดีโอไม่ถูกต้องหรือแปลงข้อมูลไม่ได้' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

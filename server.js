import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getVideo', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) return res.status(400).json({ error: "กรุณาใส่ลิงก์วิดีโอ" });

  const cmd = `yt-dlp -F "${videoURL}" --print-json`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลวิดีโอได้" });
    }

    try {
      const jsonOutput = JSON.parse(stdout);
      const formats = jsonOutput.formats
        .filter(f => f.ext === 'mp4' && f.format_note)
        .map(f => ({
          url: f.url,
          ext: f.ext,
          format_note: f.format_note,
          height: f.height
        }));

      res.json({ formats });
    } catch (e) {
      return res.status(500).json({ error: "ไม่สามารถแปลงข้อมูลวิดีโอได้" });
    }
  });
});

app.listen(PORT, () => console.log(`✅ Server started on http://localhost:${PORT}`));

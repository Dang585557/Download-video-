// File: api/getVideo.js
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('facebook.com')) {
    return res.status(400).json({ error: 'กรุณาใส่ลิงก์ Facebook ให้ถูกต้อง' });
  }

  const outputPath = path.resolve('/tmp', `fbvideo_${Date.now()}.json`);
  const command = `yt-dlp -j --no-warnings "${url}" > "${outputPath}"`;

  exec(command, (error) => {
    if (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      return res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' });
    }

    fs.readFile(outputPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'ไม่สามารถอ่านข้อมูลวิดีโอ' });
      }

      try {
        const info = JSON.parse(data);
        const formats = info.formats
          .filter(f => f.ext === 'mp4' && f.url)
          .map(f => ({
            url: f.url,
            ext: f.ext,
            height: f.height,
            format_note: f.format_note || f.quality_label || '',
          }));
        res.status(200).json({ formats });
      } catch (parseErr) {
        return res.status(500).json({ error: 'แปลงข้อมูลไม่สำเร็จ' });
      }
    });
  });
}

// api/getVideo.js (เฉพาะ Facebook)
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('facebook.com')) {
    return res.status(400).json({ error: 'URL ไม่ถูกต้อง หรือไม่ใช่ลิงก์ Facebook' });
  }

  try {
    const command = `yt-dlp -j "${url}"`;
    const { stdout } = await execAsync(command, { timeout: 20000 });

    const json = JSON.parse(stdout);

    const formats = json.formats
      .filter(f => f.url && f.format_note)
      .map(f => ({
        url: f.url,
        quality: f.format_note,
        ext: f.ext,
        height: f.height
      }));

    res.status(200).json({ formats });
  } catch (err) {
    console.error('เกิดข้อผิดพลาด:', err.message);
    res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' });
  }
}

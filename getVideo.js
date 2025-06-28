import { Router } from 'express';
import ytdlp from 'yt-dlp-exec';

const router = Router();

router.get('/', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const output = await ytdlp(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
    });

    const formats = output.formats
      .filter(f => f.ext === 'mp4' && f.acodec !== 'none' && f.vcodec !== 'none' && f.url)
      .map(f => ({
        quality: f.format_note || f.height + 'p',
        url: f.url
      }));

    res.json({ title: output.title, formats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' });
  }
});

export default router;

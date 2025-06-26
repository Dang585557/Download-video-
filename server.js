// server.js
import ytdlp from 'yt-dlp-exec';

app.get('/api/getVideo', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !videoURL.startsWith('http')) {
    return res.status(400).json({ error: 'URL ไม่ถูกต้อง' });
  }

  try {
    const output = await ytdlp(videoURL, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
    });

    const formats = output.formats
      .filter(f => f.ext === 'mp4' && f.url)
      .map(f => ({
        url: f.url,
        height: f.height,
        format_note: f.format_note
      }));

    res.json({ formats });
  } catch (err) {
    res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' });
  }
});

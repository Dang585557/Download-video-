const fbDownloader = require('facebook-video-downloader');
const fs = require('fs');
const https = require('https');

// Facebook video URL (must be public)
const facebookUrl = 'https://www.facebook.com/watch?v=xxxxxxx'; // Replace with your own

async function downloadFacebookVideo(url) {
  try {
    // Fetch direct video URL(s)
    const videoData = await fbDownloader(url);

    // videoData can be a string or an object with multiple qualities
    let videoUrl = '';
    if (typeof videoData === 'string') {
      videoUrl = videoData;
    } else if (videoData && videoData.hd) {
      videoUrl = videoData.hd;
      console.log('เลือกดาวน์โหลดคุณภาพ HD');
    } else if (videoData && videoData.sd) {
      videoUrl = videoData.sd;
      console.log('เลือกดาวน์โหลดคุณภาพ SD');
    } else {
      console.error('ไม่พบลิงก์วิดีโอ กรุณาตรวจสอบลิงก์ Facebook อีกครั้ง');
      return;
    }

    // Set file name
    const file = fs.createWriteStream('facebook-video.mp4');
    console.log('เริ่มดาวน์โหลดวิดีโอ...');

    https.get(videoUrl, (response) => {
      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;

      response.pipe(file);

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        process.stdout.write(`\rดาวน์โหลดแล้ว: ${((downloaded / totalSize) * 100).toFixed(2)}%`);
      });

      file.on('finish', () => {
        file.close();
        console.log('\nดาวน์โหลดเสร็จสิ้น!');
      });
    }).on('error', (err) => {
      fs.unlink('facebook-video.mp4', () => {});
      console.error('เกิดข้อผิดพลาดระหว่างดาวน์โหลด:', err.message);
    });
  } catch (err) {
    console.error('เกิดข้อผิดพลาด:', err.message);
  }
}

// Run the function
downloadFacebookVideo(facebookUrl);

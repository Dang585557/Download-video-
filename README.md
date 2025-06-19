<DOCTYPE htm1>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ดาวน์โหลดวิดีโอ Facebook</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #00b4d8, #90e0ef);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      color: #0077b6;
    }
    .container {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 500px;
      width: 90%;
      animation: fadeIn 1s ease-in-out;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    input[type="text"] {
      padding: 10px;
      width: 80%;
      border: 1px solid #0077b6;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    button {
      padding: 10px 20px;
      background-color: #0077b6;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #023e8a;
    }
    .download-btn {
      display: inline-block;
      margin: 10px;
      padding: 10px 20px;
      background-color: #0096c7;
      color: white;
      text-decoration: none;
      border-radius: 8px;
    }
    .download-btn:hover {
      background-color: #0077b6;
    }
    .ads {
      margin-top: 30px;
      padding: 15px;
      background-color: #caf0f8;
      border-radius: 10px;
    }
    .video-ad-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      display: none;
      flex-direction: column;
      color: white;
    }
    .video-ad-overlay video {
      max-width: 90%;
      border-radius: 12px;
    }
    .close-ad-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #ff4d4d;
      border: none;
      border-radius: 8px;
      cursor: not-allowed;
      font-size: 16px;
      opacity: 0.6;
    }
    .close-ad-btn.enabled {
      cursor: pointer;
      opacity: 1;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>ดาวน์โหลดวิดีโอ Facebook</h1>
    <input type="text" id="videoURL" placeholder="วางลิงก์วิดีโอ Facebook ที่นี่">
    <br>
    <button onclick="simulateDownload()">ดึงวิดีโอ</button>
    <div id="result"></div>
    <div class="ads">
      <p>พื้นที่โฆษณาของคุณ ✨</p>
      <!-- ใส่โค้ด Google AdSense ได้ที่นี่ -->
    </div>
  </div>
  <!-- โฆษณาวิดีโอ -->
  <div class="video-ad-overlay" id="videoAd">
    <video id="adVideo" controls autoplay>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      วิดีโอไม่สามารถเล่นได้
    </video>
    <button class="close-ad-btn" id="closeAdBtn" onclick="closeAd()" disabled>ข้ามโฆษณา (5)</button>
  </div>
  <script>
    let selectedDownloadLink = '';
    let countdown = 5;
    let countdownInterval;
    function simulateDownload() {
      const url = document.getElementById('videoURL').value.trim();
      const result = document.getElementById('result');
      if (!url) {
        result.innerHTML = '<p style="color:red;">กรุณาวางลิงก์ก่อน</p>';
        return;
      }
      // จำลองลิงก์ (แบบยังไม่เชื่อมต่อเซิร์ฟเวอร์จริง)
      result.innerHTML = `
        <h3>เลือกระดับความคมชัด:</h3>
        <a class="download-btn" href="#" onclick="showAd('https://example.com/video-720p.mp4')">720p</a>
        <a class="download-btn" href="#" onclick="showAd('https://example.com/video-1080p.mp4')">1080p</a>
        <a class="download-btn" href="#" onclick="showAd('https://example.com/video-4k.mp4')">4K</a>
      `;
    }
    function showAd(downloadLink) {
      selectedDownloadLink = downloadLink;
      document.getElementById('videoAd').style.display = 'flex';
      document.getElementById('adVideo').currentTime = 0;
      document.getElementById('adVideo').play();
      // เริ่มนับถอยหลัง
      countdown = 5;
      const closeAdBtn = document.getElementById('closeAdBtn');
      closeAdBtn.innerText = `ข้ามโฆษณา (${countdown})`;
      closeAdBtn.disabled = true;
      closeAdBtn.classList.remove('enabled');
      countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          closeAdBtn.innerText = `ข้ามโฆษณา (${countdown})`;
        } else {
          clearInterval(countdownInterval);
          closeAdBtn.innerText = 'ข้ามโฆษณา';
          closeAdBtn.disabled = false;
          closeAdBtn.classList.add('enabled');
        }
      }, 1000);
    }
    function closeAd() {
      const closeAdBtn = document.getElementById('closeAdBtn');
      if (closeAdBtn.disabled) return;
      document.getElementById('videoAd').style.display = 'none';
      window.open(selectedDownloadLink, '_blank');
    }
  </script>

</body>

</html>

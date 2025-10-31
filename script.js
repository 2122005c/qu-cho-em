const heart = document.querySelector('.heart');
const video = document.getElementById('loveVideo');
const bg = document.getElementById('background');

// Tạo các ngôi sao
function createStars() {
  // Số lượng sao (tăng mật độ gấp 4 lần)
  const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 2500);
  
  // Xóa các sao cũ (nếu có)
  const oldStars = document.querySelectorAll('.star');
  oldStars.forEach(star => star.remove());
  
  // Tạo sao mới
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Vị trí ngẫu nhiên
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;
    
    // Kích thước ngẫu nhiên (tăng kích thước tối đa)
    const size = Math.random() * 4 + 1.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Thời gian nhấp nháy ngẫu nhiên (giảm thời gian để nhấp nháy nhanh hơn)
    const duration = Math.random() * 1.5 + 0.8;
    star.style.setProperty('--twinkle-duration', `${duration}s`);
    
    // Độ trễ ngẫu nhiên
    star.style.animationDelay = `${Math.random() * 2}s`;
    
    document.body.appendChild(star);
  }
}

// Tạo sao khi trang web load và khi thay đổi kích thước màn hình
window.addEventListener('load', createStars);
window.addEventListener('resize', createStars);

heart.addEventListener('dblclick', () => {
  if (!video) {
    console.error("Không tìm thấy phần tử video!");
    return;
  }

  // Đảm bảo video được hiển thị
  video.style.display = 'block';
  video.controls = true;
  
  // Đặt lại opacity và phát video
  setTimeout(() => {
    video.style.opacity = '1';
    video.play().catch(err => {
      console.error("Lỗi khi phát video:", err);
      alert("Có lỗi khi phát video. Vui lòng kiểm tra console để biết thêm chi tiết.");
    });
  }, 50);

  // Khi video phát → chạy hiệu ứng theo thời gian
  const totalTime = 35; // tổng 35 giây
  console.log("Video đã bắt đầu phát");
  
  video.ontimeupdate = () => {
    console.log("Thời gian hiện tại:", video.currentTime);
    const t = video.currentTime;

    // Màu đêm đậm dần từ 0-27s
    if (t < 27) {
      // Tính toán độ đậm của màu dựa vào thời gian
      const progress = t / 27; // từ 0 đến 1
      const brightness = 1 - (progress * 0.4); // giảm độ sáng từ 1 xuống 0.6
      
      // Màu nền tối dần
      const dark1 = Math.floor(15 - (progress * 5)); // từ 15 xuống 10
      const dark2 = Math.floor(26 - (progress * 8)); // từ 26 xuống 18
      const dark3 = Math.floor(47 - (progress * 15)); // từ 47 xuống 32
      
      bg.style.background = `radial-gradient(circle, #0f1016, #${dark1}${dark1}${dark2}e, #2f2f${dark3})`;
      bg.style.filter = `brightness(${brightness})`;
    }
    // ⭐ Đêm đầy sao (27s trở đi)
    else {
      bg.style.background = "radial-gradient(circle, #0f1016, #1a1b2e, #2f2f4f)";
      bg.style.filter = "brightness(0.8)";
    }
  };
});

// Khi video kết thúc
video.addEventListener('ended', () => {
  video.style.opacity = '0';
  setTimeout(() => {
    video.style.display = 'none';
    heart.classList.add('spin');
    bg.style.background = "radial-gradient(circle at center, #000, #111)";
    
    // Hiển thị dòng chữ sau khi trái tim bắt đầu xoay
    setTimeout(() => {
      const loveText = document.querySelector('.love-text');
      loveText.classList.add('visible');
    }, 1000);
  }, 1500);
});

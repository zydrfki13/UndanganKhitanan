const params = new URLSearchParams(window.location.search);
let nama = params.get('to');

if(nama){
  document.querySelectorAll(".nama-tamu").forEach(el => {
    el.innerText = decodeURIComponent(nama);
  });
}

let musik = document.getElementById("musik");
let isMusicPlaying = false;

function bukaUndangan(){
  const cover = document.getElementById("cover");
  const content = document.getElementById("content");
  
  cover.style.opacity = "0";
  cover.style.transform = "scale(1.1)";
  
  setTimeout(() => {
    cover.style.display = "none";
    content.classList.remove("hidden");
    window.scrollTo(0, 0);
    
    // Play music
    if(musik && !isMusicPlaying){
      musik.play().catch(e => console.log("Autoplay blocked:", e));
      isMusicPlaying = true;
      document.getElementById("musicControl").classList.remove("muted");
    }
  }, 800);
}

function toggleMusik(){
  if(!musik) return;
  
  if(isMusicPlaying){
    musik.pause();
    document.getElementById("musicControl").classList.add("muted");
    isMusicPlaying = false;
  } else {
    musik.play().catch(e => console.log("Play error:", e));
    document.getElementById("musicControl").classList.remove("muted");
    isMusicPlaying = true;
  }
}

/* COUNTDOWN PREMIUM */
const tgl = new Date("Juni 03, 2026 09:00:00").getTime();

setInterval(() => {
  let now = new Date().getTime();
  let d = tgl - now;
  
  if(d < 0) {
    document.getElementById("countdown").innerHTML = '<div class="countdown-box"><span>Acara</span><small>Telah Tiba</small></div>';
    return;
  }
  
  let hari = Math.floor(d / (1000 * 60 * 60 * 24));
  let jam = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let menit = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
  let detik = Math.floor((d % (1000 * 60)) / 1000);
  
  document.getElementById("hari").innerText = String(hari).padStart(2, '0');
  document.getElementById("jam").innerText = String(jam).padStart(2, '0');
  document.getElementById("menit").innerText = String(menit).padStart(2, '0');
  document.getElementById("detik").innerText = String(detik).padStart(2, '0');
}, 1000);

/* ANIMASI SCROLL */
const fades = document.querySelectorAll('.fade');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

fades.forEach(el => observer.observe(el));

function copyRek(){
  navigator.clipboard.writeText("6510495932");
  
  // Tampilkan notifikasi custom
  const btn = event.target.closest('.btn-copy');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
  btn.style.background = "#28a745";
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = "";
  }, 2000);
}

// Inisialisasi nama tamu tambahan
document.addEventListener("DOMContentLoaded", () => {
  if(!nama){
    document.querySelectorAll(".nama-tamu").forEach(el => {
      el.innerText = "Keluarga & Sahabat";
    });
  }
});

// ========== FUNGSI RSVP SINGKAT ==========
function getNamaTamu() {
  const params = new URLSearchParams(window.location.search);
  let nama = params.get('to');
  if (!nama) {
    nama = document.querySelector(".nama-tamu")?.innerText || "Tamu Undangan";
  }
  return decodeURIComponent(nama);
}

function rsvpHadir() {
  let namaTamu = getNamaTamu();
  let nomorWA = "6281234567890"; // GANTI DENGAN NOMOR WA ANDA!
  
  let pesan = `Assalamu'alaikum, saya *${namaTamu}* %0A✅ *HADIR* khitanan Arkana Syabil, Rabu 3 Juni 2026. %0A%0AWaalaikumsalam.`;
  
  let urlWA = `https://wa.me/${nomorWA}?text=${pesan}`;
  window.open(urlWA, '_blank');
}

function rsvpTidakHadir() {
  let namaTamu = getNamaTamu();
  let nomorWA = "6281234567890"; // GANTI DENGAN NOMOR WA ANDA!
  
  let pesan = `Assalamu'alaikum, saya *${namaTamu}* %0A❌ *TIDAK BISA HADIR* khitanan Arkana Syabil. %0A%0AMohon maaf & semoga acara lancar. Waalaikumsalam.`;
  
  let urlWA = `https://wa.me/${nomorWA}?text=${pesan}`;
  window.open(urlWA, '_blank');
}

// TAMBAHKAN EFEK KLIK YANG LEBIH INTERAKTIF (opsional)
document.querySelectorAll('.rsvp-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Tambah efek ripple
    let ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255,215,0,0.3)';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    
    let rect = this.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.style.width = '300px';
      ripple.style.height = '300px';
      ripple.style.transition = 'all 0.5s ease-out';
      ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
});

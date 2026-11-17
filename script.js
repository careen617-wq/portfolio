// ========== 导航滚动状态 ==========
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  backTop.classList.toggle("show", window.scrollY > 600);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ========== 作品页阅读进度条 ==========
const readProgress = document.getElementById("readProgress");
if (readProgress) {
  const updateProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    readProgress.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

// ========== 移动端菜单 ==========
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ========== 打字机效果 ==========
const phrases = ["影视配乐作曲 🎬", "声音设计师 🎛️", "音乐制作人 🎹"];
const el = document.getElementById("typewriter");
let pi = 0, ci = 0, deleting = false;
if (el) (function type() {
  const current = phrases[pi];
  el.textContent = current.slice(0, ci);
  if (!deleting) {
    if (ci < current.length) { ci++; setTimeout(type, 115); }
    else { deleting = true; setTimeout(type, 1800); }
  } else {
    if (ci > 0) { ci--; setTimeout(type, 45); }
    else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); }
  }
})();

// ========== 首屏声波动画条 ==========
const waveform = document.getElementById("waveform");
if (waveform) {
  const BAR_COUNT = 64;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement("span");
    bar.style.animationDuration = (0.8 + Math.random() * 1.4).toFixed(2) + "s";
    bar.style.animationDelay = (Math.random() * 1.6).toFixed(2) + "s";
    bar.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
    frag.appendChild(bar);
  }
  waveform.appendChild(frag);
}

// ========== 作品页调音台氛围条 ==========
const consoleBars = document.getElementById("consoleBars");
if (consoleBars) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 52; i++) {
    const bar = document.createElement("span");
    bar.style.animationDuration = (0.7 + Math.random() * 1.3).toFixed(2) + "s";
    bar.style.animationDelay = (Math.random() * 1.5).toFixed(2) + "s";
    bar.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);
    frag.appendChild(bar);
  }
  consoleBars.appendChild(frag);
}

// ========== Rose 音频可视化声浪条 ==========
document.querySelectorAll(".media-audio .m-visual").forEach((vis) => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 40; i++) {
    const bar = document.createElement("span");
    bar.style.animationDuration = (0.6 + Math.random() * 1.1).toFixed(2) + "s";
    bar.style.animationDelay = (Math.random() * 1.2).toFixed(2) + "s";
    bar.style.opacity = (0.45 + Math.random() * 0.55).toFixed(2);
    frag.appendChild(bar);
  }
  vis.appendChild(frag);
});

// ========== 滚动显现 + 技能条动画 ==========
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skill-col")) {
        entry.target.querySelectorAll(".skill").forEach((s) => s.classList.add("animated"));
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((n) => observer.observe(n));

// ========== 媒体播放器（视频 / 封面音频 通用） ==========
function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;
  return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
}

function initMedia(frame) {
  const media = frame.querySelector("video, audio");
  if (!media) return;
  const trackEl = frame.querySelector(".m-track");
  const fill = frame.querySelector(".m-fill");
  const knob = frame.querySelector(".m-knob");
  const timeEl = frame.querySelector(".m-time");
  const muteBtn = frame.querySelector(".m-mute");
  const fullBtn = frame.querySelector(".m-full");

  function render() {
    const d = media.duration || 0;
    const pct = d ? (media.currentTime / d) * 100 : 0;
    fill.style.width = pct + "%";
    knob.style.left = "calc(" + pct + "% - 6px)";
    timeEl.textContent = fmtTime(media.currentTime) + " / " + fmtTime(d);
  }

  function pauseOthers() {
    document.querySelectorAll(".media-frame video, .media-frame audio").forEach((m) => {
      if (m !== media) m.pause();
    });
  }

  function togglePlay() {
    if (media.paused || media.ended) {
      pauseOthers();
      media.play();
    } else {
      media.pause();
    }
  }

  media.addEventListener("loadedmetadata", render);
  media.addEventListener("timeupdate", render);
  media.addEventListener("play", () => {
    pauseOthers();
    frame.classList.add("playing");
    frame.classList.remove("ended");
  });
  media.addEventListener("pause", () => frame.classList.remove("playing"));
  media.addEventListener("ended", () => {
    media.currentTime = 0;
    frame.classList.remove("playing");
    frame.classList.add("ended");
    render();
  });

  // 点击画面 / 大播放键 切换播放（避开控制条区域）
  frame.addEventListener("click", (e) => {
    if (e.target.closest(".m-bar")) return;
    togglePlay();
  });
  const toggleBtn = frame.querySelector(".m-toggle");
  if (toggleBtn) toggleBtn.addEventListener("click", togglePlay);

  // 进度条：点击 / 拖拽跳转
  function seek(clientX) {
    const rect = trackEl.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    if (media.duration) {
      media.currentTime = ratio * media.duration;
      render();
    }
  }
  trackEl.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    trackEl.setPointerCapture(e.pointerId);
    seek(e.clientX);
    const move = (ev) => seek(ev.clientX);
    const up = () => {
      trackEl.removeEventListener("pointermove", move);
      trackEl.removeEventListener("pointerup", up);
    };
    trackEl.addEventListener("pointermove", move);
    trackEl.addEventListener("pointerup", up);
  });

  // 静音（仅视频）
  if (muteBtn) {
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      media.muted = !media.muted;
      frame.classList.toggle("muted", media.muted);
    });
  }

  // 全屏（仅视频）
  if (fullBtn) {
    fullBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (frame.requestFullscreen) {
        frame.requestFullscreen();
      }
    });
  }

  render();
}
document.querySelectorAll(".media-frame").forEach(initMedia);


// ========== 首页卡片视频预览（悬停播放） ==========
document.querySelectorAll(".work-thumb video").forEach((v) => {
  const card = v.closest("a");
  if (!card) return;
  card.addEventListener("mouseenter", () => { v.play().catch(() => {}); });
  card.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
});

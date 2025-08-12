// 年の自動更新
document.getElementById("year").textContent = new Date().getFullYear().toString();

// モバイルナビ開閉
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.getElementById("global-nav");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(open));
  });
  // リンククリックで閉じる
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }));
}

// 現在セクションをナビに反映
const links = Array.from(document.querySelectorAll("#global-nav a"));
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
const io = new IntersectionObserver((es) => {
  es.forEach(e => {
    const i = sections.indexOf(e.target);
    if (i >= 0 && e.isIntersecting) {
      links.forEach(l => l.classList.remove("is-active"));
      links[i].classList.add("is-active");
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });
sections.forEach(s => s && io.observe(s));

// テーマ切替（ローカル保存）
const themeToggle = document.getElementById("themeToggle");
const applyTheme = (t) => {
  document.documentElement.classList.toggle("light", t === "light");
};
const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);
themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.classList.contains("light") ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// 簡易フォーム検証（ダミー送信）
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const body = (data.get("message") || "").toString().trim();

  if (!name || !email || !body) {
    msg.textContent = "未入力の項目があります．";
    msg.style.color = "tomato";
    return;
  }
  // ここで実際の送信処理（フォームサービス等）に置き換え可
  msg.textContent = "ありがとうございます．内容を受け付けました（ダミー）．";
  msg.style.color = "inherit";
  form.reset();
});

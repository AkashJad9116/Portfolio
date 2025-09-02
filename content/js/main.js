// content/js/main.js
// Purpose: initialize animations, typed/backspace effect, year, and form UX tweaks
document.addEventListener("DOMContentLoaded", function () {
  // AOS
  AOS.init({ once: true, offset: 80, duration: 700, easing: "ease-out" });

  // Typed.js role rotator
  // Backspace effect with slightly faster cadence for snappier feel
	new Typed("#typed-role", {
	  strings: [
		"Data Engineer",
		"Data Scientist",
		"Data Analytics Developer",
		"Machine Learning Developer",
		"Software Engineer"
	  ],
	  typeSpeed: 60,
	  backSpeed: 40,
	  backDelay: 1400,
	  smartBackspace: true,
	  loop: true
	});

  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Bootstrap validation styling for contact form
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });
});

// --- Hero canvas particles (vanilla, lightweight) ---
(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, dpr, parts, mouse={x:null,y:null}, running=true;

  const DPR_CAP = 1.5;
  const N_BASE = 50;
  const LINK = 120;
  const SPEED = 0.25;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function create(){
    const n = Math.floor((window.innerWidth < 768) ? N_BASE * 0.6 : N_BASE);
    parts = Array.from({length:n}, ()=>({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*SPEED, vy: (Math.random()-0.5)*SPEED,
      r: 1 + Math.random()*1.5
    }));
  }

  function frame(){
    if (!running) return;
    ctx.clearRect(0,0,w,h);

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for (const p of parts){
      if (mouse.x!=null){
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d2 = dx*dx + dy*dy;
        if (d2 < 200*200){ const f = 0.0006; p.vx += dx * f; p.vy += dy * f; }
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w+10; if (p.x > w+10) p.x = -10;
      if (p.y < -10) p.y = h+10; if (p.y > h+10) p.y = -10;

      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    }

    for (let i=0;i<parts.length;i++){
      for (let j=i+1;j<parts.length;j++){
        const a=parts[i], b=parts[j];
        const dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
        if (dist < LINK){
          const alpha = 1 - (dist / LINK);
          ctx.strokeStyle = `rgba(110,168,254,${alpha*0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', ()=>{ resize(); create(); });
  document.addEventListener('click', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;

    setTimeout(() => { mouse.x = mouse.y = null; }, 800);
  });
  document.addEventListener('visibilitychange', ()=>{
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });

  requestAnimationFrame(()=>{ resize(); create(); frame(); });
})();

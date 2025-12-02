document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update URL hash without jumping
        history.pushState(null, '', href);
      }
    });
  });

  // Intersection Observer for reveal and skill bars
  const revealItems = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // animate skill bars inside this section
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          const level = bar.getAttribute('data-level') || bar.dataset.level || 0;
          bar.style.setProperty('--percent', `${level}%`);
        });
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  revealItems.forEach(item => revealObserver.observe(item));

  // Pre-animate .hero (not within reveal) skill bars if any at top
  document.querySelectorAll('.skill-bar').forEach(bar => bar.style.setProperty('--percent', '0%'));

  const projectModal = document.getElementById('project-modal');
  const modalContent = projectModal.querySelector('.modal-content');
  const modalClose = projectModal.querySelector('.modal-close');
  let lastFocused = null;

  const projects = {
    1: {
      title: '專案 A — 儀表板平台',
      description: '<p>打造一個即時資料可視化平台，使用 React + D3 處理大量資料，並且支援可即時更新的圖表與套用設計系統。</p><ul><li>技術：React, D3, TypeScript</li><li>職責：技術選型、核心元件實作、效能優化</li></ul>'
    },
    2: {
      title: '專案 B — 電商介面',
      description: '<p>為新創公司建立響應式商品頁與購物流程，導入 A/B 測試回饋與改善註冊轉換。</p><ul><li>技術：Vue 3, Vite, Node.js</li><li>職責：前端開發、UI/UX 評估</li></ul>'
    },
    3: {
      title: '專案 C — 個人網站',
      description: '<p>使用靜態站點生成器搭配輕量化的資產優化，達成高 SEO 與低載入時間目標。</p><ul><li>技術：Next.js / SSG</li><li>職責：全端開發、部署、SEO 優化</li></ul>'
    }
  };

  // open project modal
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      lastFocused = card;
      const pid = card.getAttribute('data-project');
      openModal(pid);
    });
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lastFocused = card;
        const pid = card.getAttribute('data-project');
        openModal(pid);
      }
    });
  });

  function openModal(pid){
    const info = projects[pid];
    if(!info) return;
    modalContent.innerHTML = `<h3>${info.title}</h3>${info.description}`;
    projectModal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
    document.documentElement.style.overflow = 'hidden';
  }

  function closeModal(){
    projectModal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
    document.documentElement.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if(e.target === projectModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      if(projectModal.getAttribute('aria-hidden') === 'false') closeModal();
    }
  });

  // Theme toggle with animated transition
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      // add a helper class to enable CSS transitions
      html.classList.add('theme-transition');
      const current = html.getAttribute('data-theme');
      if (current === 'light') {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
      } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
      }
      // remove the helper class after the transition finishes
      window.setTimeout(() => html.classList.remove('theme-transition'), 520);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on nav link click
    nav.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form simple message
  const contactForm = document.querySelector('.contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[name=name]').value || '朋友';
      const notification = document.createElement('div');
      notification.className = 'toast';
      notification.textContent = `感謝 ${name}，訊息已送出！`;
      document.body.appendChild(notification);
      setTimeout(()=>notification.remove(), 3500);
      contactForm.reset();
    });
  }

  // toast style
  const style = document.createElement('style');
  style.innerHTML = `.toast{position:fixed;right:1rem;bottom:1rem;background:#111;padding:0.85rem 1rem;border-radius:8px;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,0.6);z-index:9999}`;
  document.head.appendChild(style);

  // Progressive enhancement: animate skill bars in hero if any
  const hero = document.querySelector('.hero');
  if(hero){
    hero.querySelectorAll('.skill-bar').forEach(bar => {
      const level = bar.getAttribute('data-level') || 0;
      bar.style.setProperty('--percent', `${level}%`);
    });
  }
});

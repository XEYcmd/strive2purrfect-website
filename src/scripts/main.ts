/* 猫二杯 · STRIVE "2" PURRFFECT — interactions */
(() => {
  const doc = document;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky header ---------- */
  const header = doc.querySelector<HTMLElement>('.site-header');
  const onScroll = (): void => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const navToggle = doc.querySelector<HTMLButtonElement>('.nav-toggle');
  const siteNav = doc.querySelector<HTMLElement>('#site-nav');

  function setNav(open: boolean): void {
    if (!navToggle || !siteNav) return;
    doc.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    if (open) {
      const first = siteNav.querySelector<HTMLAnchorElement>('a');
      if (first) first.focus({ preventScroll: true });
    }
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      setNav(!doc.body.classList.contains('nav-open'));
    });

    siteNav.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('a')) setNav(false);
    });

    doc.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && doc.body.classList.contains('nav-open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) setNav(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = doc.querySelectorAll<HTMLElement>('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => {
        el.classList.add('is-visible');
      });
    } else {
      let revealObserver: IntersectionObserver;
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      reveals.forEach((el) => {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- Cold mode easter egg ---------- */
  const coldButtons = doc.querySelectorAll<HTMLButtonElement>('[data-cold-toggle]');
  const storageKey = 's2p-cold';

  function getCold(): boolean {
    try {
      return window.localStorage.getItem(storageKey) === '1';
    } catch {
      return false;
    }
  }

  function applyCold(cold: boolean): void {
    coldButtons.forEach((button) => {
      button.classList.toggle('is-cold', cold);
      button.setAttribute('aria-pressed', String(cold));
      button.setAttribute(
        'aria-label',
        cold ? '赛事状态：冰冷筹备中，点击切换' : '赛事状态：火热筹备中，点击切换'
      );
      const label = button.querySelector<HTMLElement>('[data-status-label]');
      if (label) {
        label.textContent = cold ? '当前状态：冰冷筹备中' : '当前状态：火热筹备中';
      }
    });
  }

  if (coldButtons.length) {
    applyCold(getCold());
    coldButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const next = !button.classList.contains('is-cold');
        applyCold(next);
        try {
          window.localStorage.setItem(storageKey, next ? '1' : '0');
        } catch {
          /* localStorage can be unavailable; the page still works. */
        }
      });
    });
  }

  /* ---------- Poster dialog ---------- */
  const posterTrigger = doc.querySelector<HTMLElement>('[data-poster-open]');
  const posterDialog = doc.getElementById('poster-dialog') as HTMLDialogElement | null;
  if (posterTrigger && posterDialog && typeof posterDialog.showModal === 'function') {
    posterTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      posterDialog.showModal();
      doc.body.classList.add('dialog-open');
    });
    posterDialog.addEventListener('close', () => {
      doc.body.classList.remove('dialog-open');
    });
    posterDialog.addEventListener('click', (event) => {
      if (event.target === posterDialog) posterDialog.close();
    });
    const closeBtn = posterDialog.querySelector<HTMLButtonElement>('.dialog-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        posterDialog.close();
      });
    }
  }

  /* ---------- Rules table of contents ---------- */
  const tocLinks = doc.querySelectorAll<HTMLAnchorElement>(".toc a[href^='#']");
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const sections: Array<{ link: HTMLAnchorElement; section: HTMLElement }> = [];
    tocLinks.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const section = doc.getElementById(id);
      if (section) sections.push({ link, section });
    });

    if (sections.length) {
      const tocObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            sections.forEach((item) => {
              item.link.classList.toggle('is-active', item.section === entry.target);
            });
          });
        },
        { rootMargin: '-18% 0px -68% 0px', threshold: 0 }
      );
      sections.forEach((item) => {
        tocObserver.observe(item.section);
      });
    }
  }

  /* ---------- Subtle hero mark parallax ---------- */
  const mark = doc.querySelector<HTMLElement>('.lockup-mark');
  const hero = doc.querySelector<HTMLElement>('.hero');
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (mark && hero && finePointer && !reduceMotion) {
    let raf: number | null = null;
    hero.addEventListener('mousemove', (event: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        mark.style.transform = `translate(${x * 12}px, ${y * 10}px)`;
        raf = null;
      });
    });
    hero.addEventListener('mouseleave', () => {
      mark.style.transform = '';
    });
  }

  /* ---------- Anchor links: close mobile nav after jump ---------- */
  doc.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as Element | null;
    const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (anchor && doc.body.classList.contains('nav-open')) setNav(false);
  });
})();

/* Theme switch, mobile navigation, reveal-on-scroll, and subtle pointer tilt. */
$(function () {
  const $root = $('html');
  const $themeToggle = $('#themeToggle');
  const $themeIcon = $('.theme-icon');
  const $themeLabel = $('.theme-label');

  function setTheme(theme) {
    $root.attr('data-theme', theme);
    const isDark = theme === 'dark';
    $themeIcon.text(isDark ? '☼' : '☾');
    $themeLabel.text(isDark ? 'Light mode' : 'Dark mode');
    $themeToggle.attr('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    $('meta[name="theme-color"]').attr('content', isDark ? '#090b16' : '#f5f5fa');
    try { localStorage.setItem('deepa-portfolio-theme', theme); } catch (e) {}
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('deepa-portfolio-theme'); } catch (e) {}
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  $themeToggle.on('click', function () {
    setTheme($root.attr('data-theme') === 'dark' ? 'light' : 'dark');
  });

  $('#menuToggle').on('click', function () {
    const isOpen = $('#navLinks').toggleClass('open').hasClass('open');
    $(this).attr('aria-expanded', isOpen ? 'true' : 'false').attr('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  $('#navLinks a').on('click', function () {
    $('#navLinks').removeClass('open');
    $('#menuToggle').attr('aria-expanded', 'false').attr('aria-label', 'Open navigation');
  });

  $('#year').text(new Date().getFullYear());
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Gentle 3D tilt on the portrait for pointer devices only.
  const frame = document.querySelector('.photo-frame');
  if (frame && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const visual = document.querySelector('.hero-visual');
    visual.addEventListener('mousemove', event => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `rotateY(${x * 12 - 5}deg) rotateX(${-y * 8 + 2}deg)`;
    });
    visual.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  }
});
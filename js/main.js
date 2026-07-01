document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Mobile nav toggle
  if (toggle) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

  // Close nav on link click
  if (nav) {
    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      });
      var href = a.getAttribute('href');
      if (href === currentPath) { a.classList.add('active'); }
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
  });

  // Scroll animations
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

  // FAQ toggle
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var item = q.parentElement;
      item.classList.toggle('active');
    });
  });

  // Contact form handling
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var btn = form.querySelector('.btn');
      var origText = btn.innerHTML;
      btn.innerHTML = '发送中...'; btn.disabled = true;

      var data = new FormData(form);
      var json = {};
      data.forEach(function(v, k) { json[k] = v; });

      // Send via Formspree or fallback
      fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }).then(function(r) {
        if (r.ok) {
          status.className = 'form-status success';
          status.textContent = '感谢您的留言！我们会尽快与您联系。';
          status.style.display = 'block';
          form.reset();
        } else {
          throw new Error('Network response was not ok.');
        }
      }).catch(function() {
        status.className = 'form-status success';
        status.textContent = '感谢您的留言！我们会尽快与您联系。';
        status.style.display = 'block';
        form.reset();
      }).finally(function() {
        btn.innerHTML = origText; btn.disabled = false;
        setTimeout(function() { status.style.display = 'none'; }, 5000);
      });
    });
  }
});

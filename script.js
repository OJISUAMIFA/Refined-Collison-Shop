document.addEventListener('DOMContentLoaded', () => {
  // ---------- Mobile menu open/close ----------
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobile = document.getElementById('closeMobile');

  if (menuToggle && mobileMenu) {
    function setMobile(open) {
      if (open) {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');

        // lock scroll behind menu
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // focus first focusable element in mobile menu
        setTimeout(() => {
          const first = mobileMenu.querySelector('a, button, input, textarea, select');
          if (first) first.focus();
        }, 160);
      } else {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');

        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        menuToggle.focus();
      }
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      setMobile(!isOpen);
    });

    if (closeMobile) {
      closeMobile.addEventListener('click', () => setMobile(false));
    }

    // close when clicking any link inside the mobile menu
    mobileMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      setMobile(false);
    });

    // close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMobile(false);
      }
    });
  }

  // ---------- Testimonials Slider (Prev / Next) ----------
  const testimonials = Array.from(document.querySelectorAll('.testimonial'));
  const prevBtn = document.querySelector('.t-prev');
  const nextBtn = document.querySelector('.t-next');

  if (testimonials.length && prevBtn && nextBtn) {
    let current = 0;

    function showTestimonial(index) {
      testimonials.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    }

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    });

    showTestimonial(current);
  }
});

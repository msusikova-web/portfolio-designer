import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Сбрасываем скролл немедленно
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const init = () => {
  // Повторный сброс при инициализации
  window.scrollTo(0, 0);

  // Preloader Logic
  const tl = gsap.timeline();
  
  // Burger Menu Logic
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__list a');

  const toggleMenu = () => {
    burger.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navList.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  tl.to('.preloader__text', {
    duration: 1,
    text: "UX UI Designer",
    ease: "none",
    delay: 0.5
  })
  .to('.preloader', {
    duration: 0.8,
    yPercent: -100,
    ease: "power4.inOut",
  });

  // Stacking Cards Animation
  const cases = document.querySelectorAll('.case-item');
  
  cases.forEach((caseItem, index) => {
    // Анимация появления контента внутри карточки
    const visual = caseItem.querySelector('.case-visual');
    const info = caseItem.querySelector('.case-info');

    gsap.from([visual, info], {
      scrollTrigger: {
        trigger: caseItem,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Эффект "стопки" (Stacking effect) - только для десктопа
    if (index < cases.length - 1) {
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 1025px)", () => {
        ScrollTrigger.create({
          trigger: caseItem,
          start: "top top",
          endTrigger: cases[index + 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        gsap.to(caseItem, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: cases[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      });
    }
  });

  // Hover Effect on Buttons
  const buttons = document.querySelectorAll('.btn--outline');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.3 });
    });
  });
};

// Запуск после полной загрузки всех ресурсов
window.addEventListener('load', init);

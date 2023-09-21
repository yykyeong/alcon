gsap.registerPlugin(ScrollTrigger);

  /* visual */
  const visualInner = document.querySelector('.visual-inner');
  const visualArea = document.querySelector('.visual-area');
  let visualInnerWidth, scrollLength;

  function calculateScrollLength() {
    visualInnerWidth = visualInner.offsetWidth;
    scrollLength = visualInnerWidth - window.innerWidth;
  }

  calculateScrollLength();

  window.addEventListener("resize", calculateScrollLength);

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(visualInner, {
    x: -scrollLength,
    scrollTrigger: {
      trigger: visualArea,
      scrub: 1,
      pin: true,
      start: "top",
      end: () => `+=${visualInnerWidth}`
    },
    
  })


const decoTxt = document.querySelector('.deco-txt')
const decoBar = document.querySelector('.deco-bar')
let decoTxtWidth = decoTxt.offsetWidth;

gsap.timeline({
  delay: 0.2,
})
.set(decoTxt, {
  color: '#fff',
  fontWeight: 'bold',
  opacity: 0,
  x: 0
})
.set(decoBar, {
  left: 1,
  backgroundColor: '#fff',
  immediateRender: true
})
.to(decoBar, {
  duration: 0.05,
  backgroundColor: '#fff'
}, '+=0.15')
.to(decoBar, {
  duration: 1,
  width: decoTxtWidth + 22,
  ease: Power2.easeInOut
}, '+=0.1')
.to(decoTxt, {
  duration: 0.4,
  opacity: 1
}, '-=0.1')
.to(decoBar, {
  duration: 0.9,
  x: decoTxtWidth + 22,
  width: 0,
  ease: Power2.easeIn
})
.timeScale(1.5);



/* search */
const searchBtn = document.querySelector('.search')
const searchModal = document.querySelector('.search-modal')
const searchCloseBtn = document.querySelector('.search-close')

searchBtn.addEventListener('click',()=> {
  searchModal.classList.toggle('active')
})
searchCloseBtn.addEventListener('click',()=> {
  searchModal.classList.remove('active')
})


/* mobile */
const body = document.body;
const triggerBtn = document.querySelector('.trigger')
const navArea =document.querySelector('.nav-area')
const dimmedLayer = document.querySelector('.dimmed-layer')


triggerBtn.addEventListener('click',()=> {
  triggerBtn.classList.toggle('active')
  navArea.classList.toggle('active')
  dimmedLayer.classList.toggle('hidden')
  body.classList.toggle('fixed');
})


const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(navItem => {
  const navTitle = navItem.querySelector('.nav-title');


  navTitle.addEventListener('click', () => {
    navItem.classList.toggle('active');

  })
})




/* lense */

const lense01Bg = 'linear-gradient(150deg, #3c212a 0%,#6b4653 61%,#e9c14e 100%)'
const lense02Bg = 'linear-gradient(150deg, #6bcaba 0%, #2c5697 55%, #84329b 100%)';
const lense03Bg = 'linear-gradient(150deg, #772ea5 0%,#a847ba 61%,#f59856 100%)'

const swiper = new Swiper('.lense-area .swiper', {
  autoplay: true,
  loop: true,
  parallax: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  grabCursor: true,
  speed: 500,
  spaceBetween: 100,

  on: {
    transitionStart: function () {
      const activeSlide = document.querySelector(".swiper-slide-active");
      const lenseArea = document.querySelector(".lense-area");

      if (activeSlide.classList.contains("lense01")) {
        lenseArea.style.background = lense01Bg;
      } else if (activeSlide.classList.contains("lense02")) {
        lenseArea.style.background = lense02Bg;
      } else {
        lenseArea.style.background = lense03Bg;
      }
    }
  }
})



  /* guide */

  const guideItems = gsap.utils.toArray('.guide-item');

  guideItems.forEach((item) => {
    const guideNums = item.querySelectorAll('.guide-num');
    const guideOrderItems = item.querySelectorAll('.guide-order-item');
    
    guideNums.forEach((guideNum, index) => {
      gsap.to(guideNum, {
        '--progress': `${(index + 1) * 25}%`,
        duration: 4,
        ease: 'expo.out',
        delay: index * 0.5,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'center 80%',
          toggleActions: 'restart none none none'
        },
      });
    });
  
    guideOrderItems.forEach((orderItem) => {
      gsap.from(orderItem, {
        opacity: 0,
        y: -30,
        duration: 1,
        scrollTrigger: {
          trigger: orderItem,
          start: 'top 80%',
          end: 'center 80%',
          toggleActions: 'restart none none none'
        },
      });
    })
  });
  




/* sns */
const snsBall = document.querySelector('.sns-ball')

snsBall.addEventListener('click', () => {
  snsBall.classList.toggle('active')
});

document.addEventListener('click', (event) => {
  if (!snsBall.contains(event.target)) {
    snsBall.classList.remove('active')
  }
});


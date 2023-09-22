'use strict '

gsap.registerPlugin(ScrollTrigger)


/* header */
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    gsap.to('header', {
      backgroundColor: 'rgb(255,255,255)',
      duration: 0.3, 
    })
  } else {

    gsap.to('header', {
      backgroundColor: 'rgba(255, 255, 255, 0)', 
      duration: 0.3, 
    })
  }
})

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
const body = document.body
const triggerBtn = document.querySelector('.trigger')
const navArea =document.querySelector('.nav-area')
const dimmedLayer = document.querySelector('.dimmed-layer')


triggerBtn.addEventListener('click',()=> {
  triggerBtn.classList.toggle('active')
  navArea.classList.toggle('active')
  dimmedLayer.classList.toggle('hidden')
  body.classList.toggle('fixed')
})


const navItems = document.querySelectorAll('.nav-item')
navItems.forEach(navItem => {
  const navTitle = navItem.querySelector('.nav-title')


  navTitle.addEventListener('click', () => {
    navItem.classList.toggle('active')

  })
})


/* visual */
const slidersContainer = document.querySelector('.visual-content')

// icon
const visualIcons = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'visual-icons',
    range: [0, 3],
    rangeContent: function (i) {
        const icons = [
            'fa-clock',
            'fa-clock',
            'fa-calendar-days',
            'fa-bottle-droplet'
        ]
        return '<i class="fa-solid ' + icons[i] + '"></i>'
    },
    style: {
        transform: [{scale: [0.4, 1]}],
        opacity: [0, 1]
    },
    interactive: false
})

// title
const titles = [
    '매일착용 소프트콘택트렌즈<br>DAILIES',
    '매일착용 소프트콘택트렌즈<br>DAILIES ILLUMINATE',
    '연속착용 소프트콘택트렌즈<br>AIR OPTIX',
    '렌즈관리용액<br>OPTI FREE'
]
const visualName = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'visual-titles',
    range: [0, 3],
    rangeContent: function (i) {
        return '<h3 class="visual-title">'+ titles[i] +'</h3>'
    },
    vertical: true,
    reverse: true,
    style: {
        opacity: [0, 1]
    },
    interactive: false
})

// link
const visualLink = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'visual-links',
    range: [0, 3],
    rangeContent: function () {
        return '<a class="visual-link">제품 자세히 보기</a>'
    },
    vertical: true,
    interactive: false
})

// page & autoplay
const pagination = document.querySelector('.pagination')
const paginationItems = [].slice.call(pagination.children)
let visualCurrentIndex = 0 
let autoPlayInterval 


// image
const visualImgs = new MomentumSlider({
    el: slidersContainer,
    cssClass: 'visual-imgs', 
    range: [0, 3], 
    rangeContent: function () {
        return '<div class="visual-imgbox"><div class="visual-img"></div></div>'
    },
    sync: [visualIcons, visualName, visualLink],
    style: {
        '.visual-img': {
            transform: [{scale: [1.5, 1]}]
        }
    },
    change: function(newIndex, oldIndex) {
        if (typeof oldIndex !== 'undefined') {
            paginationItems[oldIndex].classList.remove('pagination-item--active')
        }
        paginationItems[newIndex].classList.add('pagination-item--active')
    }
})

function clickPaginationItem(index) {
    const prevIndex = visualCurrentIndex
    paginationItems[prevIndex].classList.remove('pagination-item--active')
    paginationItems[index].classList.add('pagination-item--active')
    visualImgs.select(index)
    visualCurrentIndex = index
}

pagination.addEventListener('click', function(e) {
    if (e.target.matches('.pagination-button')) {
        const index = paginationItems.indexOf(e.target.parentNode)
        clickPaginationItem(index) 
        clearInterval(autoPlayInterval) 
        setTimeout(function () {
            autoPlayInterval = setInterval(autoPlay, 3000)
        }, 1000)
    }
})

// autoplay
function autoPlay() {
    const nextIndex = (visualCurrentIndex + 1) % paginationItems.length
    clickPaginationItem(nextIndex)
}

autoPlayInterval = setInterval(autoPlay, 3000)

/* lense */

const lense01Bg = 'linear-gradient(150deg, #3c212a 0%,#6b4653 61%,#e9c14e 100%)'
const lense02Bg = 'linear-gradient(150deg, #6bcaba 0%, #2c5697 55%, #84329b 100%)'
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
      const activeSlide = document.querySelector(".swiper-slide-active")
      const lenseArea = document.querySelector(".lense-area")

      if (activeSlide.classList.contains("lense01")) {
        lenseArea.style.background = lense01Bg
      } else if (activeSlide.classList.contains("lense02")) {
        lenseArea.style.background = lense02Bg
      } else {
        lenseArea.style.background = lense03Bg
      }
    }
  }
})



  /* guide */

  const guideItems = gsap.utils.toArray('.guide-item')

  guideItems.forEach((item) => {
    const guideNums = item.querySelectorAll('.guide-num')
    const guideOrderItems = item.querySelectorAll('.guide-order-item')
    
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
      })
    })
  
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
      })
    })
  })
  




/* sns */
const snsBall = document.querySelector('.sns-ball')

snsBall.addEventListener('click', () => {
  snsBall.classList.toggle('active')
})

document.addEventListener('click', (event) => {
  if (!snsBall.contains(event.target)) {
    snsBall.classList.remove('active')
  }
})


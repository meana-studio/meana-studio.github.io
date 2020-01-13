var mySwiper = new Swiper ('.swiper-container', {
	loop: true,
	slidesPerView: 1,
	speed: 600,
	autoplay: {
		delay: 3000,
	},
	fadeEffect: {
		crossFade: true
	},
	spaceBetween: 0,
	centeredSlides : false,
    scrollbar: {
		el: '.swiper-scrollbar',
	},
  })
var mySwiper = new Swiper ('#gallery-container', {
	loop: true,
	slidesPerView: 2,
	speed: 600,
	centeredSlides: true,
	spaceBetween: 40,
	lazyLoading: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: true
	},
	pagination: {
		el: '.swiper-pagination',
	},
    navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
		  slidesPerView: 1,
		  spaceBetween: 0
		},
		// when window width is >= 480px
		480: {
		  slidesPerView: 1,
		  spaceBetween: 0
		},
		// when window width is >= 640px
		720: {
		  slidesPerView: 2,
		  spaceBetween: 40
		}
	  }
})
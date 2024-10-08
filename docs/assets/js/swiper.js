const mySwiper = new Swiper("#gallery-container", {
	loop: !0,
	slidesPerView: 2,
	speed: 600,
	centeredSlides: !0,
	spaceBetween: 40,
	lazyLoading: !0,
	autoplay: {
		delay: 3e3,
		disableOnInteraction: !0
	},
	pagination: {
		el: ".swiper-pagination"
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0
		},
		480: {
			slidesPerView: 1,
			spaceBetween: 0
		},
		720: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

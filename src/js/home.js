const el = document.getElementById('main-cover-image')
const message = document.getElementById('message')
const scroll = document.getElementById('scroll')

// カバー画像
TweenLite.set(el, {
	alpha: 0,
	visibility: 'hidden'
})

TweenLite.set(message, {
	alpha: 0,
	display: 'none',
	ease: Power2.easeIn
})

TweenLite.to(message, 0.5, {
	alpha: 1,
	display: 'block',
	ease: Power2.easeIn,
	onComplete: fadeCover
});

function fadeCover() {
	TweenLite.to(el, 0.9, {
		alpha: 1,
		visibility: 'visible',
		delay: 1.7,
		ease: Power2.easeIn,
		onComplete: colorChange
	})
}

function colorChange() {
	el.classList.add('active')
	document.body.classList.add('animation-end')
	TweenLite.to(message, 0.8, {
		color: '#FFF',
		ease: Power2.easeIn,
		onComplete: appendScroll
	});
}

function appendScroll() {
	TweenLite.to(scroll, 0.8, {
		visibility: 'visible',
		delay: 0.7,
		ease: Power2.easeIn
	});
}

inView.offset(200)
inView('#main-cover')
.on('enter', el=>{
	document.body.classList.add('home')
})
.on('exit', el=>{
	document.body.classList.remove('home')
})
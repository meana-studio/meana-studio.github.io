"use strict";document.documentElement.style.setProperty("--vh","".concat(.01*window.innerHeight,"px"));
"use strict";var el=document.getElementById("main-cover-image"),message=document.getElementById("message"),scroll=document.getElementById("scroll");function fadeCover(){TweenLite.to(el,.9,{alpha:1,visibility:"visible",delay:1.7,ease:Power2.easeIn,onComplete:colorChange})}function colorChange(){el.classList.add("active"),document.body.classList.add("animation-end"),TweenLite.to(message,.8,{color:"#FFF",ease:Power2.easeIn,onComplete:appendScroll})}function appendScroll(){TweenLite.to(scroll,.8,{visibility:"visible",delay:.7,ease:Power2.easeIn})}TweenLite.set(el,{alpha:0,visibility:"hidden"}),TweenLite.set(message,{alpha:0,display:"none",ease:Power2.easeIn}),TweenLite.to(message,.5,{alpha:1,display:"block",ease:Power2.easeIn,onComplete:fadeCover}),inView("#main-cover").on("enter",(function(e){document.body.classList.add("home")})).on("exit",(function(e){document.body.classList.remove("home")}));
"use strict";var mySwiper=new Swiper("#gallery-container",{loop:!0,slidesPerView:2,speed:600,centeredSlides:!0,spaceBetween:40,lazyLoading:!0,autoplay:{delay:3e3,disableOnInteraction:!0},pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{320:{slidesPerView:1,spaceBetween:0},480:{slidesPerView:1,spaceBetween:0},720:{slidesPerView:2,spaceBetween:40}}});
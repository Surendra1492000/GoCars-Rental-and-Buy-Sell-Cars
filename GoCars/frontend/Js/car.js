// alert("Hii Vividh");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
// -----Open-------
navToggle.addEventListener("click",()=>{
    navMenu.classList.toggle("show-menu");
});
// -----Close------
navClose.addEventListener("click",()=>{
    navMenu.classList.toggle("show-menu");
});
//Change The BACKGORUND ON SCROLL-----------
function changeHeaderColor(){
    const header=document.getElementById("header");
    if(this.scrollY >= 200){
        header.classList.add("scroll-header");}else{
            header.classList.remove("scroll-header");
        }
}
window.addEventListener("scroll",changeHeaderColor);
// Rmove Menu ON CLICK FOR Mobile----------------
const navLink = document.querySelectorAll(".nav_link");
function linkAction(){
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
}
navLink.forEach((link) => link.addEventListener("click",linkAction));
// Active Link----------------
const sections = document.querySelectorAll("section[id]");
function scrollLink(){
    const scrollY = window.scrollY;
    sections.forEach((section)=>{
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        sectionId = section.getAttribute("id");
         // Select the navigation link that corresponds to the section ID
         const navLink = document.querySelector(".nav_menu a[href*=" + sectionId + "]");
         if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        }
    });
}
window.addEventListener("scroll",scrollLink);
// SWIPER-JS
var swiper = new Swiper(".popular_container", {
    loop:true,
    spaceBetween:24,
    slidesPerView:"auto",
    grabCursor:true,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints:{
        768:{
            slidesPerView:3,
        },
        1024:{
            spaceBetween:48,
        },
    },
  });
//********MIXITUP-JS ***********
var mixerProducts = mixitup(".products_content", {
    selectors: {
        target: '.product__card'
    },
    animation: {
        duration: 300
    }
});

//********* LINK ACTIVE PRODUCTS ***********
const linkProduct=document.querySelectorAll(".products__item");

function activeProduct(){
    linkProduct.forEach((link) =>link.classList.remove("active-product"));
    this.classList.add("active-product");
}
linkProduct.forEach((link)=> link.addEventListener("click",activeProduct));
// *******SCROLLUP**********
function scrollUp(){
   const scrollUp = document.getElementById("scroll-up");
   if(this.scrollY >= 350){scrollUp.classList.add("show-scroll");}
   else{scrollUp.classList.remove("show-scroll");}
}
window.addEventListener("scroll",scrollUp);
// Scroll reveal animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay:400,
});

sr.reveal(".home__sub");
sr.reveal(".home__title", {delay:500});
sr.reveal(".home__description", {delay:600});
sr.reveal(".home__btn", {delay:700});
sr.reveal(".home__value-number,.home__value-description", {delay:800,interval:100});
sr.reveal(".line-h", {delay:800});
sr.reveal(".home__img", {delay:900,origin:'bottom'});

sr.reveal(".about__data", {origin:'right'});
sr.reveal(".about-img", {origin:'left'});

sr.reveal(".brand__content", {interal:100});

sr.reveal(".why__data");

sr.reveal(".popular h2");
sr.reveal(".popular__cards",{delay:500,origin:'right'});

sr.reveal(".newsletter__data",{origin:'bottom'});

sr.reveal(".product_subtittle");
sr.reveal(".product h2",{delay:500});//
sr.reveal(".products_filters",{delay:600});
sr.reveal(".product__card",{delay:700,interval:100});

sr.reveal(".app_contain",{orign:"bottom"});
sr.reveal(".app_data",{delay:500,origin:"left"});
sr.reveal(".app_img",{delay:600,origin:"right"});

sr.reveal(".footer-box",{interval:100});
sr.reveal(".copyright",{delay:500});
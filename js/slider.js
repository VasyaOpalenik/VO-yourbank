const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    centeredSlides: false,
    // Navigation arrows
    navigation: {
        nextEl: '.tab-slider-button-next',
        prevEl: '.tab-slider-button-prev',
    },
    breakpoints: {
        // when window width is >= 640px
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: false,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 60,
            centeredSlides: true,
        }
    },
});
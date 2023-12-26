const burger = document.querySelector(".burger");
if (burger) {
    burger.onclick = () => {
        const burgerMenu = document.querySelector(".header__nav");
        if (burgerMenu) {
            burgerMenu.classList.toggle("open");
            burger.classList.toggle("open");
            if (document.body.style.overflow !== "hidden") {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = ""
            }
        }
    }
}
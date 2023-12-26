const animationItemList = document.querySelectorAll("[data-anim]");
if (animationItemList.length > 0) {
    animation(animationItemList);
    window.addEventListener("scroll", (e) => {
        animation(animationItemList);
    });
}
function animation(animationItemList) {
    Array.from(animationItemList).forEach((animationItem) => {
        const animationItemHeight = animationItem.offsetHeight;
        const animationItemOffset = animationItem.getBoundingClientRect().top + scrollY;
        const animationStart = 4;

        let animationPoint = window.innerHeight - animationItemHeight / animationStart;
        if (animationItemHeight > window.innerHeight) {
            animationPoint = window.innerHeight - window.innerHeight / animationStart;
        }

        if (scrollY > (animationItemOffset - animationPoint) &&
            scrollY < (animationItemOffset + animationItemHeight)) {
            animationItem.classList.add("anim");
        } else {
            if (animationItem.dataset.anim === "true") {
                animationItem.classList.remove("anim");
            }
        }
    })
}
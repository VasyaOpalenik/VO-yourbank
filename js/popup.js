function openPopup(someText) {
    const popups = document.querySelectorAll(".popup");
    for (let popup of popups) {
        popup.classList.add("open");
        popup.querySelector(".popup__info").textContent = `${someText}.`;

        // popupButton
        const popupButton = popup.querySelector(".popup__close-button");
        popupButton.onclick = (e) => {
            popup.classList.remove("open");
        };
    }
}
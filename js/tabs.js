const tabConteiners = document.querySelectorAll("[data-tab-conteiner]");
if (tabConteiners.length) {
    Array.from(tabConteiners).forEach(tabConteiner => {
        const tabButtons = tabConteiner.querySelectorAll("[data-tab-button]");
        if (tabButtons.length > 0) {
            Array.from(tabButtons).forEach(tabButton => {
                tabButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    const tabId = e.currentTarget.dataset.tabButton;
                    tabOpen(tabId, tabButton, tabConteiner);
                });
            });
        }
    });
}
function tabOpen(tabId, tabButton, tabConteiner) {
    const tab = tabConteiner.querySelector(`[data-tab-id="${tabId}"]`);
    if (tab && !tabConteiner.querySelector(".tab-open")) {
        tab.classList.add("tab-open");
        tabButton.classList.add("button-active");
    } else {
        const openTabNow = tabConteiner.querySelector(".tab-open");
        const activeButtonTabNow = tabConteiner.querySelector(`[data-tab-button="${openTabNow.dataset.tabId}"]`);
        // remove old classes
        openTabNow.classList.remove("tab-open");
        activeButtonTabNow.classList.remove("button-active");

        // add new classes
        tab.classList.add("tab-open");
        tabButton.classList.add("button-active");
    }
}
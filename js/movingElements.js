// data-move-item="main" data-move-width="992"
// data-move-item куди будим переміщювати. Важливо без крапки!!!
// data-move-width після якої ширини.

const moveItems = document.querySelectorAll("[data-move-item]");
if (moveItems.length > 0) {
    moveItem(moveItems);
}

function moveItem(moveItems) {
    if (moveItems.length > 0) {
        Array.from(moveItems).forEach(item => {
            if (item.dataset.moveWidth) {
                const moveWidth = item.dataset.moveWidth;
                if (window.innerWidth <= moveWidth) {
                    const whereToInsert = document.querySelector(`.${item.dataset.moveItem}`);
                    if (!item.closest(`.${item.dataset.moveItem}`)) {
                        // Створюємо і Розміщуємо заглушку
                        item.insertAdjacentHTML("afterend", `
                            <span style='display:none;' class='replacement'></span>
                        `);

                        // Розміщуємо елемент
                        whereToInsert.append(item);
                    }
                } else {
                    if (document.querySelector(".replacement")) {
                        const replacement = document.querySelector(".replacement");
                        replacement.after(item);
                        replacement.remove();
                    }
                }
            }
        });
    }
}
// && moveItems.dataset.moveWidth

window.addEventListener("resize", (e) => {
    moveItem(moveItems);
})
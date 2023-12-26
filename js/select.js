const selects = document.querySelectorAll("[data-select-conteiner]");
if (selects.length > 0) {
    Array.from(selects).forEach(select => {
        const list = select.querySelector("[data-select-list]");
        // function open select
        select.onclick = (e) => {
            openAndCloseSelect(select, e);
            // function select item
            if (e.target.closest(`${list.dataset.selectList}`)) {
                const item = e.target.closest(`${list.dataset.selectList}`);
                selectItem(item, select);
                e.preventDefault();
            }
        };
    });
}

function openAndCloseSelect(select, e) {
    if (!e.target.closest("[data-select-list]")) {
        select.classList.toggle("open");
    }
}

function selectItem(selectItem, select) {
    const selectedItem = select.querySelector("[data-select-item]");
    selectedItem.innerHTML = selectItem.innerHTML;
    select.classList.remove("open");
}
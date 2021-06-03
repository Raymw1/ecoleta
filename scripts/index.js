const modalBlock = document.querySelector("#modal");
const Modal = {
    open() {
        modalBlock.classList.remove("hide");
    },
    close() {
        modalBlock.classList.add("hide");
    }
}

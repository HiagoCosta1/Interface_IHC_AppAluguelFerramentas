function abrirMenu(){
    const menu = document.getElementById("menu-lateral");
    menu.classList.add("aberto");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("ativo");
}

function fecharMenu() {
    const menu = document.getElementById("menu-lateral");
    menu.classList.remove("aberto");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("ativo");
}
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

function mostrarPagina(nomePagina, produtoId) {
    const todasPaginas = document.querySelectorAll('.pagina');
    todasPaginas.forEach(pagina => {
        pagina.classList.remove('ativa');
    });

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    if (nomePagina === 'catalogo'){
        renderizarProdutos();
    }

    if(nomePagina === 'detalhes' && produtoId){
        carregarDetalhes(produtoId);
    }
}



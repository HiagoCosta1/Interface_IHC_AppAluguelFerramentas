// ========================================
// DADOS DOS PRODUTOS
// ========================================
const produtos = [
  {
    id: 1,
    nome: "Furadeira Profissional Dewalt",
    categoria: "furadeira",
    preco: 45.00,
    disponivel: true,
    descricao: "Furadeira de impacto profissional com alta potência. Ideal para perfurações em concreto, alvenaria e madeira.",
    imagem: "https://img.lojadomecanico.com.br/IMAGENS/21/221/419344/1738603903490.JPG",
    specs: [
      "Potência: 850W",
      "Voltagem: 127V/220V",
      "Velocidade: 0-3000 RPM",
      "Mandril: 13mm",
      "Função impacto: Sim",
      "Peso: 2.3kg"
    ]
  },
  {
    id: 2,
    nome: "Parafusadeira de Impacto",
    categoria: "parafusadeira",
    preco: 40.00,
    disponivel: true,
    descricao: "Parafusadeira e furadeira de impacto sem fio. Inclui 2 baterias de 20V e maleta completa com acessórios.",
    imagem: "https://lojawap.vtexassets.com/arquivos/ids/176102/parafusadeira-e-furadeira-de-impacto--wap-k21-id02_03.jpg?v=638793658462170000",
    specs: [
      "Bateria: 20V Li-ion",
      "Torque: 180 Nm",
      "Velocidade: 0-2800 RPM",
      "Mandril: 13mm",
      "Inclui: 2 baterias + carregador",
      "Peso: 1.8kg"
    ]
  },
  {
    id: 3,
    nome: "Serra Mármore Bosch",
    categoria: "serra",
    preco: 50.00,
    disponivel: false,
    descricao: "Serra mármore profissional para cortes precisos em cerâmica, porcelanato e mármore. Inclui disco diamantado.",
    imagem: "https://img.lojadomecanico.com.br/IMAGENS/21/224/104991/1728312709281.JPG",
    specs: [
      "Potência: 1400W",
      "Voltagem: 220V",
      "Disco: 110mm",
      "Rotação: 13000 RPM",
      "Profundidade corte: 30mm",
      "Peso: 3.2kg"
    ]
  },
  {
    id: 4,
    nome: "Furadeira de Bancada",
    categoria: "furadeira",
    preco: 60.00,
    disponivel: true,
    descricao: "Furadeira de bancada robusta para trabalhos de precisão. Ideal para oficinas e marcenarias.",
    imagem: "https://img.lojadomecanico.com.br/IMAGENS/21/221/419344/1738603903490.JPG",
    specs: [
      "Potência: 500W",
      "Voltagem: 220V",
      "Curso do fuso: 50mm",
      "Mandril: 16mm",
      "Velocidades: 5 estágios",
      "Peso: 28kg"
    ]
  },
  {
    id: 5,
    nome: "Serra Circular",
    categoria: "serra",
    preco: 55.00,
    disponivel: true,
    descricao: "Serra circular portátil para cortes retos em madeira. Potente e precisa.",
    imagem: "https://img.lojadomecanico.com.br/IMAGENS/21/224/104991/1728312709281.JPG",
    specs: [
      "Potência: 1200W",
      "Voltagem: 127V/220V",
      "Disco: 185mm",
      "Profundidade corte 90°: 65mm",
      "Profundidade corte 45°: 45mm",
      "Peso: 4.1kg"
    ]
  },
  {
    id: 6,
    nome: "Parafusadeira Manual",
    categoria: "parafusadeira",
    preco: 25.00,
    disponivel: true,
    descricao: "Parafusadeira sem fio compacta, ideal para uso doméstico e pequenos reparos.",
    imagem: "https://lojawap.vtexassets.com/arquivos/ids/176102/parafusadeira-e-furadeira-de-impacto--wap-k21-id02_03.jpg?v=638793658462170000",
    specs: [
      "Bateria: 12V Li-ion",
      "Torque: 30 Nm",
      "Velocidade: 0-450 RPM",
      "Mandril: 10mm",
      "Peso: 0.9kg",
      "Tempo de carga: 1 hora"
    ]
  }
];

// ========================================
// FUNÇÕES DO MENU LATERAL
// ========================================
function abrirMenu() {
  const menu = document.getElementById("menu-lateral");
  menu.classList.add("aberto");
  const overlay = document.getElementById("overlay");
  overlay.classList.add("ativo");
  document.body.style.overflow = 'hidden';
}

function fecharMenu() {
  const menu = document.getElementById("menu-lateral");
  menu.classList.remove("aberto");
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("ativo");
  document.body.style.overflow = 'auto'; 
}

// ========================================
// NAVEGAÇÃO ENTRE PÁGINAS
// ========================================
function mostrarPagina(nomePagina, produtoId) {
  const todasPaginas = document.querySelectorAll('.pagina');
  todasPaginas.forEach(pagina => {
    pagina.classList.remove('ativa');
  });

  const paginaAtiva = document.getElementById(`pagina-${nomePagina}`);
  if (paginaAtiva) {
    paginaAtiva.classList.add('ativa');
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  if (nomePagina === 'catalogo') {
    renderizarProdutos();
    configurarFiltros(); // ✅ CONFIGURA OS FILTROS!
  }

  if (nomePagina === 'detalhes' && produtoId) {
    carregarDetalhes(produtoId);
  }
}

// ========================================
// RENDERIZAÇÃO DO CATÁLOGO
// ========================================
function renderizarProdutos() {
  const container = document.getElementById('lista-produtos');
  container.innerHTML = '';

  
  const filtroCategoria = document.getElementById('filtro-categoria').value;
  const filtroDisponibilidade = document.getElementById('filtro-disponibilidade').value;

  const produtosFiltrados = produtos.filter(produto => {
    const passaCategoria = !filtroCategoria || produto.categoria === filtroCategoria;
    const passaDisponibilidade = !filtroDisponibilidade ||
      (filtroDisponibilidade === 'disponivel' && produto.disponivel) ||
      (filtroDisponibilidade === 'alugado' && !produto.disponivel);

    return passaCategoria && passaDisponibilidade;
  });


  if (produtosFiltrados.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros</p>
      </div>
    `;
    return;
  }

  produtosFiltrados.forEach(produto => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-md-6 col-lg-4';

    colDiv.innerHTML = `
      <div class="card h-100 card-produto">
        <img src="${produto.imagem}" 
             class="card-img-top" 
             alt="${produto.nome}">
        
        ${produto.disponivel ?
        '<span class="badge-disponivel">✓ Disponível</span>' :
        '<span class="badge-alugado">✕ Alugado</span>'}
        
        <div class="card-body">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">${produto.descricao.substring(0, 80)}...</p>
          <div class="preco">R$ ${produto.preco.toFixed(2)}<span>/dia</span></div>
          
          <button class="btn btn-custom w-100 mt-3" 
                  onclick="mostrarPagina('detalhes', ${produto.id})"
                  ${!produto.disponivel ? 'disabled' : ''}>
            ${produto.disponivel ? 'Ver Detalhes' : 'Indisponível'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(colDiv);
  });
}

// ========================================
// CONFIGURAÇÃO DOS FILTROS
// ========================================
function configurarFiltros() {
  const filtroCategoria = document.getElementById('filtro-categoria');
  const filtroDisponibilidade = document.getElementById('filtro-disponibilidade');

  if (filtroCategoria && filtroDisponibilidade) {
    filtroCategoria.removeEventListener('change', renderizarProdutos);
    filtroDisponibilidade.removeEventListener('change', renderizarProdutos);

    filtroCategoria.addEventListener('change', renderizarProdutos);
    filtroDisponibilidade.addEventListener('change', renderizarProdutos);

    console.log('✓ Filtros configurados e funcionando!');
  }
}

// ========================================
// PÁGINA DE DETALHES
// ========================================
function carregarDetalhes(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);

  if (!produto) {
    console.error("Produto não encontrado!");
    return;
  }

  const imgElemento = document.getElementById('detalhe-imagem');
  imgElemento.src = produto.imagem;
  imgElemento.alt = produto.nome;

  const badgeElemento = document.getElementById('detalhe-badge');
  if (produto.disponivel) {
    badgeElemento.className = 'badge-disponivel mb-3';
    badgeElemento.textContent = '✓ Disponível';
  } else {
    badgeElemento.className = 'badge-alugado mb-3';
    badgeElemento.textContent = '✕ Alugado';
  }

  document.getElementById('detalhe-titulo').textContent = produto.nome;
  document.getElementById('detalhe-preco').innerHTML =
    `R$ ${produto.preco.toFixed(2)}<span>/dia</span>`;
  document.getElementById('detalhe-descricao').textContent = produto.descricao;

  const specsContainer = document.getElementById('detalhe-specs');
  specsContainer.innerHTML = '';
  produto.specs.forEach(spec => {
    const li = document.createElement('li');
    li.textContent = spec;
    specsContainer.appendChild(li);
  });

  const btnAlugar = document.getElementById('detalhe-btn-alugar');
  if (produto.disponivel) {
    btnAlugar.textContent = 'Alugar Agora';
    btnAlugar.disabled = false;
    btnAlugar.onclick = () => {
      const mensagem = `Olá! Gostaria de alugar: ${produto.nome}`;
      const url = `https://wa.me/5515999999999?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
    };
  } else {
    btnAlugar.textContent = 'Indisponível';
    btnAlugar.disabled = true;
  }
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function validarTelefone(telefone) {
  const apenasNumeros = telefone.replace(/\D/g, '');
  return apenasNumeros.length === 10 || apenasNumeros.length === 11;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ========================================
// INICIALIZAÇÃO PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', function () {

  mostrarPagina('home');

  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();

      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
      const mensagem = document.getElementById('mensagem').value;

      const mensagemWhatsApp = `
*Nova mensagem do site:*

*Nome:* ${nome}
*Telefone:* ${telefone}
*Email:* ${email}

*Mensagem:*
${mensagem}
      `;

      const url = `https://wa.me/5515999999999?text=${encodeURIComponent(mensagemWhatsApp)}`;
      window.open(url, '_blank');
      form.reset();
      alert('Mensagem enviada! Você será redirecionado ao WhatsApp.');
    });
  }

  const btnTopo = document.createElement('button');
  btnTopo.innerHTML = '↑';
  btnTopo.className = 'btn-topo';
  btnTopo.setAttribute('aria-label', 'Voltar ao topo');

  btnTopo.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--cor-primaria);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 998;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  `;

  document.body.appendChild(btnTopo);

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      btnTopo.style.display = 'block';
    } else {
      btnTopo.style.display = 'none';
    }
  });

  btnTopo.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  btnTopo.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.1)';
    this.style.backgroundColor = 'var(--cor-primaria-escura)';
  });

  btnTopo.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
    this.style.backgroundColor = 'var(--cor-primaria)';
  });
});
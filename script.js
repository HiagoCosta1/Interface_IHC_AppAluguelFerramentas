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
    ],
    caucao: 90.00 
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
    ],
    caucao: 80.00
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
    ],
    caucao: 100.00
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
    ],
    caucao: 120.00
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
    ],
    caucao: 110.00
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
    ],
    caucao: 50.00
  }
];

let carrinho = []; 
let produtoAtual = null; 
let paginaAnterior = 'home'; 
let termoBusca = ''; 

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

function mostrarPagina(nomePagina, produtoId) {
  const paginaAtual = document.querySelector('.pagina.ativa');
  if (paginaAtual && nomePagina !== 'detalhes') {
    paginaAnterior = paginaAtual.id.replace('pagina-', '');
  }

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

  if (nomePagina === 'home') {
    renderizarDestaque();
  } else if (nomePagina === 'catalogo') {
    renderizarProdutos();
    configurarFiltros();
  } else if (nomePagina === 'detalhes' && produtoId) {
    carregarDetalhes(produtoId);
  } else if (nomePagina === 'carrinho') {
    renderizarCarrinho();
  } else if (nomePagina === 'checkout') {
    renderizarCheckout();
  }
}

function voltarPagina() {
  mostrarPagina(paginaAnterior);
}

function filtrarCategoria(categoria) {
  mostrarPagina('catalogo');
  setTimeout(() => {
    document.getElementById('filtro-categoria').value = categoria;
    renderizarProdutos();
  }, 100);
}

function renderizarDestaque() {
  const container = document.getElementById('produtos-destaque');
  container.innerHTML = '';

  const produtosDestaque = produtos.filter(p => p.disponivel).slice(0, 3);

  produtosDestaque.forEach(produto => {
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

function renderizarProdutos() {
  const container = document.getElementById('lista-produtos');
  container.innerHTML = '';
  const filtroCategoria = document.getElementById('filtro-categoria').value;
  const filtroDisponibilidade = document.getElementById('filtro-disponibilidade').value;
  const filtroOrdenacao = document.getElementById('filtro-ordenacao').value;

  let produtosFiltrados = produtos.filter(produto => {
    const passaCategoria = !filtroCategoria || produto.categoria === filtroCategoria;
    const passaDisponibilidade = !filtroDisponibilidade ||
      (filtroDisponibilidade === 'disponivel' && produto.disponivel) ||
      (filtroDisponibilidade === 'alugado' && !produto.disponivel);
    const passaBusca = !termoBusca || produto.nome.toLowerCase().includes(termoBusca.toLowerCase());

    return passaCategoria && passaDisponibilidade && passaBusca;
  });

  if (filtroOrdenacao === 'nome') {
    produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (filtroOrdenacao === 'preco-menor') {
    produtosFiltrados.sort((a, b) => a.preco - b.preco);
  } else if (filtroOrdenacao === 'preco-maior') {
    produtosFiltrados.sort((a, b) => b.preco - a.preco);
  }

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

function configurarFiltros() {
  const filtroCategoria = document.getElementById('filtro-categoria');
  const filtroDisponibilidade = document.getElementById('filtro-disponibilidade');
  const filtroOrdenacao = document.getElementById('filtro-ordenacao');

  if (filtroCategoria && filtroDisponibilidade && filtroOrdenacao) {
    filtroCategoria.removeEventListener('change', renderizarProdutos);
    filtroDisponibilidade.removeEventListener('change', renderizarProdutos);
    filtroOrdenacao.removeEventListener('change', renderizarProdutos);

    filtroCategoria.addEventListener('change', renderizarProdutos);
    filtroDisponibilidade.addEventListener('change', renderizarProdutos);
    filtroOrdenacao.addEventListener('change', renderizarProdutos);
  }
}

function carregarDetalhes(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);

  if (!produto) {
    console.error("Produto não encontrado!");
    return;
  }

  produtoAtual = produto; 

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

  configurarSeletorDatas();

  const btnCarrinho = document.getElementById('detalhe-btn-carrinho');
  if (produto.disponivel) {
    btnCarrinho.disabled = false;
    btnCarrinho.onclick = adicionarAoCarrinho;
  } else {
    btnCarrinho.disabled = true;
    btnCarrinho.textContent = '✕ Indisponível';
  }
}

function configurarSeletorDatas() {
  const dataInicio = document.getElementById('data-inicio');
  const dataFim = document.getElementById('data-fim');

  const hoje = new Date().toISOString().split('T')[0];
  dataInicio.min = hoje;
  dataFim.min = hoje;

  dataInicio.value = '';
  dataFim.value = '';
  document.getElementById('total-dias').textContent = '-';
  document.getElementById('valor-total').textContent = 'R$ 0,00';

  dataInicio.removeEventListener('change', calcularPeriodo);
  dataFim.removeEventListener('change', calcularPeriodo);

  dataInicio.addEventListener('change', calcularPeriodo);
  dataFim.addEventListener('change', calcularPeriodo);
}

function calcularPeriodo() {
  const dataInicio = document.getElementById('data-inicio').value;
  const dataFim = document.getElementById('data-fim').value;

  if (!dataInicio || !dataFim) {
    return;
  }

  const inicio = new Date(dataInicio + 'T00:00:00');
  const fim = new Date(dataFim + 'T00:00:00');

  if (fim < inicio) {
    alert('A data de devolução deve ser posterior à data de retirada!');
    document.getElementById('data-fim').value = '';
    return;
  }

  const diffTime = Math.abs(fim - inicio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; 

  const valorTotal = produtoAtual.preco * diffDays;

  document.getElementById('total-dias').textContent = `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  document.getElementById('valor-total').textContent = `R$ ${valorTotal.toFixed(2)}`;
}

function adicionarAoCarrinho() {
  const dataInicio = document.getElementById('data-inicio').value;
  const dataFim = document.getElementById('data-fim').value;

  if (!dataInicio || !dataFim) {
    alert('Por favor, selecione o período de aluguel!');
    return;
  }

  const inicio = new Date(dataInicio + 'T00:00:00');
  const fim = new Date(dataFim + 'T00:00:00');
  const diffTime = Math.abs(fim - inicio);
  const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const total = produtoAtual.preco * dias;

  const itemExistente = carrinho.find(item => item.produto.id === produtoAtual.id);
  if (itemExistente) {
    alert('Este produto já está no carrinho! Remova-o primeiro para adicionar com outro período.');
    return;
  }

  carrinho.push({
    produto: produtoAtual,
    dataInicio: dataInicio,
    dataFim: dataFim,
    dias: dias,
    total: total
  });

  atualizarBadgeCarrinho();

  alert(`✓ ${produtoAtual.nome} adicionado ao carrinho!`);

  mostrarPagina('carrinho');
}

function atualizarBadgeCarrinho() {
  const badge = document.getElementById('badge-carrinho');
  badge.textContent = carrinho.length;

  badge.style.transform = 'scale(1.3)';
  setTimeout(() => {
    badge.style.transform = 'scale(1)';
  }, 200);
}

function renderizarCarrinho() {
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const carrinhoConteudo = document.getElementById('carrinho-conteudo');
  const carrinhoItens = document.getElementById('carrinho-itens');

  if (carrinho.length === 0) {
    carrinhoVazio.style.display = 'block';
    carrinhoConteudo.style.display = 'none';
    return;
  }

  carrinhoVazio.style.display = 'none';
  carrinhoConteudo.style.display = 'block';

  carrinhoItens.innerHTML = '';
  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-carrinho';

    itemDiv.innerHTML = `
      <img src="${item.produto.imagem}" alt="${item.produto.nome}" class="item-carrinho-imagem">
      <div class="item-carrinho-info">
        <div class="item-carrinho-titulo">${item.produto.nome}</div>
        <div class="item-carrinho-periodo">
          📅 ${formatarData(item.dataInicio)} até ${formatarData(item.dataFim)} (${item.dias} ${item.dias === 1 ? 'dia' : 'dias'})
        </div>
        <div class="item-carrinho-preco">R$ ${item.total.toFixed(2)}</div>
      </div>
      <button class="btn-remover-item" onclick="removerDoCarrinho(${index})">
        🗑️ Remover
      </button>
    `;

    carrinhoItens.appendChild(itemDiv);
  });

  const subtotal = carrinho.reduce((sum, item) => sum + item.total, 0);
  const caucaoTotal = carrinho.reduce((sum, item) => sum + item.produto.caucao, 0);
  const total = subtotal; 

  document.getElementById('resumo-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
  document.getElementById('resumo-caucao').textContent = `R$ ${caucaoTotal.toFixed(2)}`;
  document.getElementById('resumo-total').textContent = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
  if (confirm('Deseja remover este item do carrinho?')) {
    carrinho.splice(index, 1);
    atualizarBadgeCarrinho();
    renderizarCarrinho();
  }
}

function renderizarCheckout() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    mostrarPagina('carrinho');
    return;
  }

  const resumoItens = document.getElementById('checkout-resumo-itens');
  resumoItens.innerHTML = '';

  carrinho.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'mb-2 pb-2 border-bottom';
    itemDiv.innerHTML = `
      <div><strong>${item.produto.nome}</strong></div>
      <small class="text-muted">${item.dias} ${item.dias === 1 ? 'dia' : 'dias'} - R$ ${item.total.toFixed(2)}</small>
    `;
    resumoItens.appendChild(itemDiv);
  });

  const subtotal = carrinho.reduce((sum, item) => sum + item.total, 0);
  const caucaoTotal = carrinho.reduce((sum, item) => sum + item.produto.caucao, 0);

  document.getElementById('checkout-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
  document.getElementById('checkout-caucao').textContent = `R$ ${caucaoTotal.toFixed(2)}`;
  document.getElementById('checkout-total').textContent = `R$ ${subtotal.toFixed(2)}`;

  document.getElementById('retirada-entrega').addEventListener('change', function() {
    document.getElementById('endereco-entrega').style.display = this.checked ? 'block' : 'none';
  });

  document.getElementById('retirada-loja').addEventListener('change', function() {
    document.getElementById('endereco-entrega').style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const formCheckout = document.getElementById('form-checkout');
  
  if (formCheckout) {
    formCheckout.addEventListener('submit', function(e) {
      e.preventDefault();

      const nome = document.getElementById('checkout-nome').value;
      const cpf = document.getElementById('checkout-cpf').value;
      const telefone = document.getElementById('checkout-telefone').value;
      const email = document.getElementById('checkout-email').value;
      const retirada = document.querySelector('input[name="retirada"]:checked').value;

      let mensagem = `*🔧 NOVO PEDIDO - FerramentaFácil*\n\n`;
      mensagem += `*Dados do Cliente:*\n`;
      mensagem += `Nome: ${nome}\n`;
      mensagem += `CPF: ${cpf}\n`;
      mensagem += `Telefone: ${telefone}\n`;
      mensagem += `E-mail: ${email}\n`;
      mensagem += `Retirada: ${retirada === 'loja' ? 'Na loja' : 'Entrega'}\n\n`;
      mensagem += `*Produtos:*\n`;

      carrinho.forEach((item, index) => {
        mensagem += `\n${index + 1}. ${item.produto.nome}\n`;
        mensagem += `   Período: ${formatarData(item.dataInicio)} até ${formatarData(item.dataFim)}\n`;
        mensagem += `   Dias: ${item.dias}\n`;
        mensagem += `   Valor: R$ ${item.total.toFixed(2)}\n`;
      });

      const subtotal = carrinho.reduce((sum, item) => sum + item.total, 0);
      const caucaoTotal = carrinho.reduce((sum, item) => sum + item.produto.caucao, 0);

      mensagem += `\n*Resumo Financeiro:*\n`;
      mensagem += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
      mensagem += `Caução: R$ ${caucaoTotal.toFixed(2)}\n`;
      mensagem += `Total a pagar: R$ ${subtotal.toFixed(2)}`;

      const url = `https://wa.me/5515999999999?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');

      carrinho = [];
      atualizarBadgeCarrinho();

      mostrarPagina('confirmacao');
    });
  }
});

function configurarBusca() {
  const buscaDesktop = document.getElementById('busca-input');
  const buscaMobile = document.getElementById('busca-input-mobile');

  if (buscaDesktop) {
    buscaDesktop.addEventListener('input', function(e) {
      termoBusca = e.target.value;
      if (document.getElementById('pagina-catalogo').classList.contains('ativa')) {
        renderizarProdutos();
      }
    });
  }

  if (buscaMobile) {
    buscaMobile.addEventListener('input', function(e) {
      termoBusca = e.target.value;
      if (buscaDesktop) buscaDesktop.value = termoBusca;
      if (document.getElementById('pagina-catalogo').classList.contains('ativa')) {
        renderizarProdutos();
      }
    });
  }
}

let tamanhoFonte = 16; 

function aumentarFonte() {
  if (tamanhoFonte < 22) {
    tamanhoFonte += 2;
    document.documentElement.style.setProperty('--tamanho-fonte-base', tamanhoFonte + 'px');
    document.body.style.fontSize = tamanhoFonte + 'px';
  }
}

function diminuirFonte() {
  if (tamanhoFonte > 12) {
    tamanhoFonte -= 2;
    document.documentElement.style.setProperty('--tamanho-fonte-base', tamanhoFonte + 'px');
    document.body.style.fontSize = tamanhoFonte + 'px';
  }
}

function toggleAltoContraste() {
  document.body.classList.toggle('alto-contraste');
  
  const ativo = document.body.classList.contains('alto-contraste');
  localStorage.setItem('alto-contraste', ativo);
}

function configurarFormularioContato() {
  const formContato = document.getElementById('form-contato');
  
  if (formContato) {
    formContato.addEventListener('submit', function(e) {
      e.preventDefault();

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
      formContato.reset();
      alert('Mensagem enviada! Você será redirecionado ao WhatsApp.');
    });
  }
}

function formatarData(dataString) {
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  return cpf.length === 11;
}

function validarTelefone(telefone) {
  const apenasNumeros = telefone.replace(/\D/g, '');
  return apenasNumeros.length === 10 || apenasNumeros.length === 11;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function criarBotaoTopo() {
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
    background-color: #004d2f;
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

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      btnTopo.style.display = 'block';
    } else {
      btnTopo.style.display = 'none';
    }
  });

  btnTopo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  btnTopo.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.backgroundColor = '#003a25';
  });

  btnTopo.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.backgroundColor = '#004d2f';
L
  });
}

function carregarCarrinhoSalvo() {
  const carrinhoSalvo = localStorage.getItem('carrinho-ferramentas');
  if (carrinhoSalvo) {
    try {
      carrinho = JSON.parse(carrinhoSalvo);
      atualizarBadgeCarrinho();
    } catch (e) {
      console.error('Erro ao carregar carrinho:', e);
      carrinho = [];
    }
  }
}

function salvarCarrinho() {
  localStorage.setItem('carrinho-ferramentas', JSON.stringify(carrinho));
}

const adicionarAoCarrinhoOriginal = adicionarAoCarrinho;
adicionarAoCarrinho = function() {
  adicionarAoCarrinhoOriginal();
  salvarCarrinho();
};

const removerDoCarrinhoOriginal = removerDoCarrinho;
removerDoCarrinho = function(index) {
  if (confirm('Deseja remover este item do carrinho?')) {
    carrinho.splice(index, 1);
    atualizarBadgeCarrinho();
    renderizarCarrinho();
    salvarCarrinho();
  }
};

function aplicarMascaras() {
  const cpfInput = document.getElementById('checkout-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }
      e.target.value = value;
    });
  }

  const telefoneInputs = document.querySelectorAll('input[type="tel"]');
  telefoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        if (value.length <= 10) {
          value = value.replace(/(\d{2})(\d)/, '($1) $2');
          value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
          value = value.replace(/(\d{2})(\d)/, '($1) $2');
          value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
      }
      e.target.value = value;
    });
  });
}

function adicionarAnimacaoBotoes() {
  document.querySelectorAll('.btn-custom').forEach(btn => {
    btn.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
    });
  });
}

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
  const toast = document.createElement('div');
  toast.className = 'toast-notificacao';
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: ${tipo === 'sucesso' ? '#28a745' : '#dc3545'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = mensagem;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
  D
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
  A
    }
  }
`;
document.head.appendChild(style);

const abrirMenuOriginal = abrirMenu;
abrirMenu = function() {
Ai
  abrirMenuOriginal();
  document.body.style.overflow = 'hidden';
};

const fecharMenuOriginal = fecharMenu;
fecharMenu = function() {
  fecharMenuOriginal();
  document.body.style.overflow = 'auto';
};

function configurarAtalhosTeclado() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const menu = document.getElementById('menu-lateral');
      if (menu.classList.contains('aberto')) {
        fecharMenu();
      }
    }
    
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      const busca = document.getElementById('busca-input');
      if (busca) busca.focus();
    }
    
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      mostrarPagina('carrinho');
    }
  });
}

function verificarProdutosExpirados() {
  const hoje = new Date().toISOString().split('T')[0];
  
  carrinho = carrinho.filter(item => {
    if (item.dataInicio < hoje) {
      console.log(`Produto removido: data expirada (${item.produto.nome})`);
      return false;
    }
    return true;
  });
  
  atualizarBadgeCarrinho();
  salvarCarrinho();
}
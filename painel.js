// =========================
// Estado inicial da loja
// =========================
let state = {
    loja: {
        nome: "",
        telefone: "",
        pix: "",
        banco: "",
        endereco: "",
        logo: "",
        horario: "",
        corPrimaria: "#3498db",
        fonte: "Arial",
        modoEscuro: false,
        musicaAmbiente: ""
    },
    categorias: [],
    modoVenda: [],
    produtos: [],
    clientes: [],
    cupons: [],
    publicidade: {
        texto: "",
        banner: "",
        link: "",
        carrossel: [],
        redesSociais: {
            instagram: "",
            facebook: "",
            whatsapp: ""
        }
    },
    cobertura: []
};

// =========================
// Funções utilitárias
// =========================

// Salvar estado no navegador (localStorage)
function salvarLocal() {
    localStorage.setItem("painelState", JSON.stringify(state));
    alert("💾 Configurações salvas no dispositivo!");
}

// Carregar estado salvo no navegador
function carregarLocal() {
    const saved = localStorage.getItem("painelState");
    if (saved) {
        state = JSON.parse(saved);
        atualizarTudo();
        console.log("🔄 Estado carregado:", state);
    }
}

// =========================
// Categorias
// =========================
function adicionarCategoria() {
    const input = document.getElementById("novaCategoria");
    const nome = input.value.trim();
    if (!nome) return;
    state.categorias.push(nome);
    input.value = "";
    atualizarCategorias();
    salvarLocal();
}

function atualizarCategorias() {
    const container = document.getElementById("category-tree");
    container.innerHTML = state.categorias.map(c => `<div>${c}</div>`).join("");
    // Atualiza select de produtos
    const prodCat = document.getElementById("prodCategoria");
    prodCat.innerHTML = state.categorias.map(c => `<option value="${c}">${c}</option>`).join("");
}

// =========================
// Modo de Venda
// =========================
function adicionarModoVenda() {
    const nome = document.getElementById("novoModoVenda").value;
    const desc = document.getElementById("novoModoDescricao").value;
    if (!nome || !desc) return;
    state.modoVenda.push({ nome, desc });
    atualizarModoVenda();
    salvarLocal();
}

function atualizarModoVenda() {
    const select = document.getElementById("prodModoVenda");
    select.innerHTML = state.modoVenda.map(m => `<option value="${m.nome}">${m.nome} (${m.desc})</option>`).join("");
}

// =========================
// Produtos
// =========================
function adicionarProduto() {
    const p = {
        nome: document.getElementById("prodNome").value,
        preco: parseFloat(document.getElementById("prodPreco").value) || 0,
        imagem: document.getElementById("prodImagem").value,
        descricao: document.getElementById("prodDescricao").value,
        categoria: document.getElementById("prodCategoria").value,
        subcategoria: document.getElementById("prodSubcategoria").value,
        modoVenda: document.getElementById("prodModoVenda").value,
        estoque: parseInt(document.getElementById("prodEstoque").value) || 0,
        destaque: document.getElementById("prodDestaque").checked,
        ativo: document.getElementById("prodAtivo").checked
    };
    state.produtos.push(p);
    atualizarProdutos();
    salvarLocal();
}

function atualizarProdutos() {
    const container = document.getElementById("listaProdutosContainer");
    container.innerHTML = state.produtos.map((p,i) => `
        <div class="item-container">
            <img src="${p.imagem}" alt="${p.nome}" width="50">
            <strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)}
            <span>${p.categoria} | ${p.subcategoria}</span>
            <button onclick="removerProduto(${i})" class="btn-danger">Remover</button>
        </div>
    `).join("");
}

function removerProduto(index) {
    state.produtos.splice(index,1);
    atualizarProdutos();
    salvarLocal();
}

// =========================
// Clientes
// =========================
function adicionarCliente() {
    const c = {
        nome: document.getElementById("cliNome").value,
        telefone: document.getElementById("cliTelefone").value,
        endereco: document.getElementById("cliEndereco").value,
        bairro: document.getElementById("cliBairro").value,
        observacoes: document.getElementById("cliObs").value,
        notificacoes: document.getElementById("cliNotificacoes").checked
    };
    state.clientes.push(c);
    atualizarClientes();
    salvarLocal();
}

function atualizarClientes() {
    const container = document.getElementById("listaClientesContainer");
    container.innerHTML = state.clientes.map((c,i)=>`
        <div class="item-container">
            <strong>${c.nome}</strong> - ${c.telefone} | ${c.bairro}
            <button onclick="removerCliente(${i})" class="btn-danger">Remover</button>
        </div>
    `).join("");
}

function removerCliente(i){
    state.clientes.splice(i,1);
    atualizarClientes();
    salvarLocal();
}

// =========================
// Cupons
// =========================
function adicionarCupom(){
    const c = {
        codigo: document.getElementById("cupomCodigo").value,
        tipo: document.getElementById("cupomTipo").value,
        valor: parseFloat(document.getElementById("cupomValor").value) || 0,
        validade: document.getElementById("cupomValidade").value,
        pedidoMin: parseInt(document.getElementById("cupomPedidoMin").value) || 0,
        limite: parseInt(document.getElementById("cupomLimite").value) || 0,
        mensagem: document.getElementById("cupomMsg").value,
        ativo: document.getElementById("cupomAtivo").checked
    };
    state.cupons.push(c);
    atualizarCupons();
    salvarLocal();
}

function atualizarCupons(){
    const container = document.getElementById("listaCuponsContainer");
    container.innerHTML = state.cupons.map((c,i)=>`
        <div class="item-container">
            <strong>${c.codigo}</strong> - ${c.tipo}${c.valor} | ${c.validade}
            <button onclick="removerCupom(${i})" class="btn-danger">Remover</button>
        </div>
    `).join("");
}

function removerCupom(i){
    state.cupons.splice(i,1);
    atualizarCupons();
    salvarLocal();
}

// =========================
// Publicidade
// =========================
function salvarPublicidade(){
    state.publicidade.texto = document.getElementById("pubTexto").value;
    state.publicidade.banner = document.getElementById("pubImg").value;
    state.publicidade.link = document.getElementById("pubLink").value;
    state.publicidade.carrossel = document.getElementById("pubCarrossel").value.split("\n").filter(l=>l);
    state.publicidade.redesSociais.instagram = document.getElementById("pubInsta").value;
    state.publicidade.redesSociais.facebook = document.getElementById("pubFb").value;
    state.publicidade.redesSociais.whatsapp = document.getElementById("pubWpp").value;
    salvarLocal();
}

// =========================
// Cobertura
// =========================
function adicionarBairro(){
    const b = {
        nome: document.getElementById("bairroNome").value,
        taxa: parseFloat(document.getElementById("bairroTaxa").value) || 0,
        tempo: parseInt(document.getElementById("bairroTempo").value) || 0
    };
    state.cobertura.push(b);
    atualizarBairros();
    salvarLocal();
}

function atualizarBairros(){
    const container = document.getElementById("listaBairrosContainer");
    container.innerHTML = state.cobertura.map((b,i)=>`
        <div class="item-container">
            <strong>${b.nome}</strong> - R$ ${b.taxa} | ${b.tempo}min
            <button onclick="removerBairro(${i})" class="btn-danger">Remover</button>
        </div>
    `).join("");
}

function removerBairro(i){
    state.cobertura.splice(i,1);
    atualizarBairros();
    salvarLocal();
}

// =========================
// Loja & Customização
// =========================
function atualizarLoja(){
    state.loja.nome = document.getElementById("lojaNome").value;
    state.loja.telefone = document.getElementById("lojaTel").value;
    state.loja.pix = document.getElementById("lojaPix").value;
    state.loja.banco = document.getElementById("lojaBanco").value;
    state.loja.endereco = document.getElementById("lojaEndereco").value;
    state.loja.logo = document.getElementById("lojaLogo").value;
    state.loja.horario = document.getElementById("lojaHorario").value;
    state.loja.corPrimaria = document.getElementById("corPrimaria").value;
    state.loja.fonte = document.getElementById("fonteLoja").value || "Arial";
    state.loja.modoEscuro = document.getElementById("modoEscuro").checked;
    state.loja.musicaAmbiente = document.getElementById("musicaAmbiente").value;
    salvarLocal();
}

// =========================
// JSONBin Publicação
// =========================
function publicarTotem(){
    atualizarLoja();
    const binId = document.getElementById("jsonbinId").value.trim();
    const masterKey = document.getElementById("masterKey").value.trim();

    if(!binId || !masterKey){
        alert("⚠️ Configure JSONBin ID e Master Key antes de publicar!");
        return;
    }

    fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            "X-Master-Key": masterKey
        },
        body: JSON.stringify(state)
    })
    .then(res=>{
        if(!res.ok) throw new Error("Erro ao publicar no JSONBin");
        return res.json();
    })
    .then(json=>{
        alert("✅ Publicado com sucesso!");
        console.log("JSONBin response:", json);
    })
    .catch(err=>{
        console.error(err);
        alert("❌ Falha ao publicar no Totem.");
    });
}

// =========================
// Atualizar tudo
// =========================
function atualizarTudo(){
    atualizarCategorias();
    atualizarModoVenda();
    atualizarProdutos();
    atualizarClientes();
    atualizarCupons();
    atualizarBairros();
}

window.onload = carregarLocal;

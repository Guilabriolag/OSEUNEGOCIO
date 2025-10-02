// =========================
// Estado inicial
// =========================
let state = {
    dadosLoja: {},
    produtos: [],
    clientes: [],
    cupons: [],
    publicidade: {},
    cobertura: [],
    customizacao: {}
};

// =========================
// LocalStorage
// =========================
function salvarLocal() {
    localStorage.setItem("seunegocio_state", JSON.stringify(state));
    alert("💾 Dados salvos no dispositivo!");
}

function carregarLocal() {
    const saved = localStorage.getItem("seunegocio_state");
    if (saved) {
        state = JSON.parse(saved);
        console.log("🔄 Estado carregado:", state);
    }
}

// =========================
// JSONBin
// =========================
async function publicarTotem() {
    const binId = document.getElementById("jsonbinId").value.trim();
    const masterKey = document.getElementById("masterKey").value.trim();

    if (!binId || !masterKey) {
        alert("⚠️ Configure o JSONBin ID e a Master Key antes de publicar!");
        return;
    }

    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": masterKey
            },
            body: JSON.stringify(state)
        });
        const json = await res.json();
        console.log("✅ Publicado no JSONBin:", json);
        alert("✅ Publicado com sucesso!");
    } catch (err) {
        console.error(err);
        alert("❌ Falha ao publicar no Totem");
    }
}

async function carregarJSONBin(binId) {
    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`);
        const json = await res.json();
        return json.record;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// =========================
// Funções de adicionar dados
// =========================
function adicionarProduto() {
    const prod = {
        nome: document.getElementById("prodNome").value,
        preco: parseFloat(document.getElementById("prodPreco").value),
        imagem: document.getElementById("prodImagem").value,
        descricao: document.getElementById("prodDescricao").value,
        categoria: document.getElementById("prodCategoria").value,
        subcategoria: document.getElementById("prodSubcategoria").value,
        modoVenda: document.getElementById("prodModoVenda").value,
        estoque: parseInt(document.getElementById("prodEstoque").value),
        destaque: document.getElementById("        prodDestaque").checked,
        ativo: document.getElementById("prodAtivo").checked
    };
    state.produtos.push(prod);
    salvarLocal();
    alert("✅ Produto adicionado!");
    atualizarProdutosUI();
}

function adicionarCliente() {
    const cliente = {
        nome: document.getElementById("clienteNome").value,
        telefone: document.getElementById("clienteTelefone").value,
        endereco: document.getElementById("clienteEndereco").value,
        bairro: document.getElementById("clienteBairro").value,
        observacoes: document.getElementById("clienteObservacoes").value,
        notificacao: document.getElementById("clienteNotificacao").checked
    };
    state.clientes.push(cliente);
    salvarLocal();
    alert("✅ Cliente adicionado!");
    atualizarClientesUI();
}

function adicionarCupom() {
    const cupom = {
        codigo: document.getElementById("cupomCodigo").value,
        tipo: document.getElementById("cupomTipo").value,
        valor: parseFloat(document.getElementById("cupomValor").value),
        validade: document.getElementById("cupomValidade").value,
        pedidoMinimo: parseFloat(document.getElementById("cupomPedidoMinimo").value),
        limiteUso: parseInt(document.getElementById("cupomLimiteUso").value),
        mensagem: document.getElementById("cupomMensagem").value,
        ativo: document.getElementById("cupomAtivo").checked
    };
    state.cupons.push(cupom);
    salvarLocal();
    alert("✅ Cupom adicionado!");
    atualizarCuponsUI();
}

function salvarPublicidade() {
    state.publicidade = {
        bannerTexto: document.getElementById("bannerTexto").value,
        bannerImagem: document.getElementById("bannerImagem").value,
        bannerLink: document.getElementById("bannerLink").value,
        carrosselLinks: document.getElementById("carrosselLinks").value.split("\n"),
        redesSociais: {
            instagram: document.getElementById("instagram").value,
            facebook: document.getElementById("facebook").value,
            whatsapp: document.getElementById("whatsapp").value
        }
    };
    salvarLocal();
    alert("✅ Publicidade salva!");
}

function adicionarBairro() {
    const bairro = {
        nome: document.getElementById("bairro").value,
        taxaEntrega: parseFloat(document.getElementById("taxaEntrega").value),
        tempoEstimado: parseInt(document.getElementById("tempoEstimado").value)
    };
    state.cobertura.push(bairro);
    salvarLocal();
    alert("✅ Bairro adicionado!");
    atualizarBairrosUI();
}

// =========================
// UI Atualizações
// =========================
function atualizarProdutosUI() {
    const container = document.getElementById("listaProdutosContainer");
    container.innerHTML = JSON.stringify(state.produtos, null, 2);
}

function atualizarClientesUI() {
    const container = document.getElementById("listaClientesContainer");
    container.innerHTML = JSON.stringify(state.clientes, null, 2);
}

function atualizarCuponsUI() {
    const container = document.getElementById("listaCuponsContainer");
    container.innerHTML = JSON.stringify(state.cupons, null, 2);
}

function atualizarBairrosUI() {
    const container = document.getElementById("listaBairrosContainer");
    container.innerHTML = JSON.stringify(state.cobertura, null, 2);
}

// =========================
// Inicialização
// =========================
window.onload = function() {
    carregarLocal();
    atualizarProdutosUI();
    atualizarClientesUI();
    atualizarCuponsUI();
    atualizarBairrosUI();
};


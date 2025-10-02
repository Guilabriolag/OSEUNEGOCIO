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
        destaque: document.getElementById("

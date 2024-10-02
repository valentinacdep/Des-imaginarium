// Abrir e fechar porta da pagina inicial
porta = document.getElementById("fechada")
porta1 = document.getElementById("aberta")
div = document.getElementById("porta")

porta.addEventListener("click", (e) => {
    porta.style.visibility = "hidden"
    porta1.style.visibility = "visible"
})


porta1.addEventListener("click", (e) => {
    porta.style.visibility = "visible"
    porta1.style.visibility = "hidden"
})

// adicionar ao carrinho
function addToCart(nomeProduto, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(item => item.nome === nomeProduto);
    if (produto) {
        produto.qtd++;
    } else {
        carrinho.push({ nome: nomeProduto, preco: preco, qtd: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nomeProduto} adicionado ao carrinho!`);
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let itensCarrinho = document.querySelector("#itensCarrinho");
    let valorTotal = 0;
    itensCarrinho.innerHTML = '';

    carrinho.forEach(element => {
        let itemProduto = document.createElement('div');
        itemProduto.textContent = `${element.nome} - ${element.qtd} x R$ ${element.preco}`;

        itensCarrinho.appendChild(itemProduto);
        valorTotal += (element.qtd * element.preco);

    });
    document.querySelector("#valorTotal").textContent = valorTotal;
}


if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem("carrinho");
    localStorage.clear();
}

// Cadastrar 

async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome_login').value;
    const email = document.getElementById('email_login').value;
    const senha = document.getElementById('senha_login').value;
    const reescrever = document.getElementById('reescrever').value;

    const data = { nome, email, senha, reescrever }

    const response = await fetch('http://localhost:3000/usuario/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        alert(results.message)
    } else {
        alert(alert.message)
    }
}

// login

async function Logar(event) {
    event.preventDefault();

    const nome = document.getElementById('name_login').value;
    const email = document.getElementById('emeil_login').value;

    const data = { nome, email }

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let results = await response.json();

    if (results.success) {
        let userData = results.data;
        localStorage.setItem('informacoes', JSON.stringify(userData))

        window.location.href = "cadastroProduto.html"

        console.log(dados)

        alert(results.message)
    } else {
        alert(results.message)
    }
}

window.addEventListener("load", () => {
    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('informacoes')
        let dados = JSON.parse(localStorage.getItem('informacoes'))

        dados.perfil === 'admin'
            ? document.getElementById('cadastrarProduto').style.display = 'block'
            : document.getElementById('cadastrarProduto').style.display = 'none'

        html.innerHTML = `<div style="display: flex flex-direction: column; align_itens: end">
        id: ${dados.id} perfil: ${dados.perfil}`

        html.style.display = 'block'

    }
})

function addToCart(nomeProduto, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(item => item.nome === nomeProduto);
    if (produto) {
        produto.qtd++;
    } else {
        carrinho.push({ nome: nomeProduto, preco: preco, qtd: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nomeProduto} adicionado ao carrinho!`);

}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let itensCarrinho = document.querySelector("#itensCarrinho");
    let valorTotal = 0;
    itensCarrinho.innerHTML = '';

    carrinho.forEach(element => {
        let itemProduto = document.createElement('div');
        itemProduto.textContent = `${element.nome} - ${element.qtd} x R$ ${element.preco}`;

        itensCarrinho.appendChild(itemProduto);
        valorTotal += (element.qtd * element.preco);

    });
    document.querySelector("#valorTotal").textContent = valorTotal;


}


if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem("carrinho");
    localStorage.clear();
}


const response = await fetch("http://localhost:3000/login"), {
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)

}

let results = await response.json();

if (results.success) {
    let userData = results.data;

    localStorage.setItem('informacoes', JSON.stringify(userData))

    window.location.href = "index.html"

    alert(results.message)

} else {
    alert(results.message)
}



function Sair(event){
    localStorage.removeItem('informacoes')
    window.location.href = "index.html"
}

window.addEventListener("load", () => {
    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('informacoes')
        let dados = JSON.parse(localStorage.getItem('informacoes'))

        dados.perfil === 'admin'
            ? document.getElementById('cadastrar_produto').style.display = 'block'
            : document.getElementById('cadastrar_produto').style.display = 'none'


        html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: end">
        id:${dados.id} none: ${dados.name} email: ${dados.email} Perfil: ${dados.perfil}
        </div>`

        html.style.display = 'block'
    }
})

async function cadastrarProduto(event) {
    event.preventDefault()

    const title = document.getElementById('title').value
    const price = NUmber(document.getElementById('price').value)
    const file = document.getElementById('file').files[0]

    let formData = new FormData();

    formData.append('title', title)
    formData.append('price', price)
    formData.append('file', file)

    const response = await fetch('http://localhost:3000/produto/cadastrar', {
        method: "POST",
        body: formData
    });

    const results = await response.json();

    if (results.success) {
        let productData = results.data
        const images = 'http://localhost:3000/uploads/'
        let html = document.getElementById('card_produto')

        productData.forEach(product) => ({
            let,card = `
            <div style="display: flex flex-direction: column; align_itens: end"> id: ${dados.id} perfil: ${dados.nomeProduto}`
            html.innerHTML += card
            });

    } else {
        alert(results.message)
    }
} 

let cart = [];
let modalQT = 1;
let modalKey = 0;

const qs = (el) => {
    return document.querySelector(el);
};

const qsAll = (el) => {
    return document.querySelectorAll(el);
};

//listagem das pizzas
pizzaJson.map((item, index) => {

    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    //preencher infos pizza item

    //inserindo o Id pizza
    pizzaItem.setAttribute('data-key', index);

    //preencher imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    //preco das pizzas
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    //nome das pizzas
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    //descricao das pizzas
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //id das pizzas

    //Evento de click e abrir modal
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); //previne o comportamento padrao do link

        //capturar o datakey que esta na classe pizza item dentro do html
        //closest -> pega o elemento pai mais proximo
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQT = 1;
        modalKey = key;

        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        //abrir modal
        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';

        //função para timer
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200);

        //preencher os tamanhos pizzas
        qsAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        qs('.pizzaBig img').src = item.img;

        qs('.pizzaInfo--qt').innerHTML = modalQT;
    });

    //add os dados
    qs('.pizza-area').append(pizzaItem);
});

// Eventos do Modal

function closeModal() {
    qs('.pizzaWindowArea').style.opacity = 0;

    //função para timer
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

//selecionando os botoes cancelar
//o foreach executa todo o array um por vez (2 botoes)
qsAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

qs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQT++;
    qs('.pizzaInfo--qt').innerHTML = modalQT;
});

qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQT > 1) {
        modalQT--;
        qs('.pizzaInfo--qt').innerHTML = modalQT;
    }
});

qsAll('.pizzaInfo--size').forEach((size, sizeIndex) => {

    //desmascar os itens e marcar e referente ao tamanho da pizza
    size.addEventListener('click', (e) => {
        qs('.pizzaInfo--size.selected').classList.remove('selected');

        //adicionando o selected ao proprio item que to clicando
        size.classList.add('selected');
    });
});

//botao add carrinho
qs('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = parseInt(
        qs('.pizzaInfo--size.selected').getAttribute('data-key')
    );

    //identificador
    let identifier = pizzaJson[modalKey].id + '@' + size;

    //verificando se o item ja existe
    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if (key > -1) {
        cart[key].qt += modalQT;
    } else {

        // Qual a pizza?
        //modalKey

        // Qual o tamanho?
        //let size = qs('.pizzaInfo--size.selected').getAttribute('data-key');

        // Quantas pizzas?
        //modalQT

        //adicionando ao array carrinho
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQT
        });
    }

    updateCart();
    closeModal();
});

function updateCart() {

    //se tiver itens no carrinho mostrar
    if (cart.length > 0) {
        console.log(cart.length);

        qs('aside').classList.add('show');
        qs('.cart').innerHTML = '';

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            //clonar o template
            let cartItem = qs('.models .cart--item').cloneNode(true);

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            let price = pizzaItem.price * cart[i].qt;
            cartItem.querySelector('.cart--item-valor').innerHTML = `R$ ${price.toFixed(2)}`;

            qs('.cart').append(cartItem);
        }
    }

    //se nao remove da tela
    else {
        qs('aside').classList.remove('show');
    }
}
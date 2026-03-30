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

qs('.menu-openner').addEventListener('click', () => {
    //aparecer o menu
    if (cart.length > 0) {
        qs('aside').style.left = '0';
    }

});

//fechar o menu
qs('.menu-closer').addEventListener('click', () => {
    qs('aside').style.left = '100vw';
});

function updateCart() {
    qs('.menu-openner span').innerHTML = cart.length;
    

    //se tiver itens no carrinho mostrar
    if (cart.length > 0) {
        console.log(cart.length);

        qs('aside').classList.add('show');
        qs('.cart').innerHTML = '';
    
    let subtotal = 0;
    let desconto = 0;
    let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            
            subtotal += pizzaItem.price * cart[i].qt;
            
            //clonar o template
            let cartItem = qs('.models .cart--item').cloneNode(true);

            //Concatenando Nome pizza
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            //preencher os dados
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                }
                else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            qs('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }

    //se nao remove da tela
    else {
        //remove no desktop
        qs('aside').classList.remove('show');
        //fechar o menu celular
        qs('aside').style.left = '100vw';
   
    }
}
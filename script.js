const qs = (el)=>{
    return document.querySelector(el);
}

const qsAll = (el)=>{
    return document.querySelectorAll(el);
}

//listagem das pizzas
pizzaJson.map((item, index)=>{
    
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
   pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); //previne o comportamento padrao do link

        //capturar o datakey que esta na classe pizza item dentro do html
        //closest -> pega o elemento pai mais proximo
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;


        //abrir modal
        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        //função para timer
        setTimeout(()=>{
            qs('.pizzaWindowArea').style.opacity = 1;
        },200);

        //preencher os tamanhos pizzas
        qsAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        qs('.pizzaBig img').src = item.img;
        
        
        
   });

    //add os dados
    qs('.pizza-area').append(pizzaItem);


});


// Eventos do Modal

function closeModal(){
    qs('.pizzaWindowArea').style.opacity = 0;
    //função para timer
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.display = 'none';
    },500);
}
    //selecionando os botoes cancelar
    //o foreach executa todo o array um por vez (2 cancels)
    qsAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{item.addEventListener('click', closeModal)});

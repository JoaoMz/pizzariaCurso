const qs = (el)=>{
    return document.querySelector(el);
}

const qsAll = (el)=>{
    return document.querySelectorAll(el);
}


pizzaJson.map((item, index)=>{

    let pizzaItem = qs('.models .pizza-item').cloneNode(true);
   //preencher infos pizza item

   //preencher imagem
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;


   //preco das pizzas
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
   

   //nome das pizzas
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   
   //descricao das pizzas
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

   
    //add os dados
    qs('.pizza-area').append(pizzaItem);

});
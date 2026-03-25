const qs = (el)=>{
    return document.querySelector(el);
}

const qsAll = (el)=>{
    return document.querySelectorAll(el);
}


pizzaJson.map((item, index)=>{

    let pizzaItem = qs('.models .pizza-item').cloneNode(true);
   //preencher infos pizza item

   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   
   qs('.pizza-area').append(pizzaItem);


});
console.log('hello client');

let basket = [];
let total = 0;

function printname(x){
    const bt = x.currentTarget;
    const parent = bt.parentElement;
    const name = parent.querySelector('.item_name').textContent;
    const price = parent.querySelector('.price').textContent;

    if(bt.textContent === 'choose'){
        bt.textContent = 'in basket';
        bt.classList.add('inbasket');
        basket.push(name);
        total+=parseInt(price);
    }

    else{
        bt.textContent = 'choose';
        bt.classList.remove('inbasket');
        basket.push(name);
        total+=parseInt(price);
    }   

}

// let available = document.querySelectorAll('.button_choose');
// for(let item of available){
//     item.addEventListener('click',printname);
// }

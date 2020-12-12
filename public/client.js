console.log('hello client');

let basket = [];
let total = 0;

function sendPost(x){
    const bt = x.currentTarget;
    const parent = bt.parentElement;
    const name = parent.querySelector('.item_name').textContent;

    fetch('http://localhost:3003/home/basket',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:name
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
}

let available = document.querySelectorAll('.choose_button');
for(let item of available){
    item.addEventListener('click',sendPost);
}

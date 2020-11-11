let pizzas = [
    {   "name":"mexican","source":"images\\mexican.jpg","recipe":"Spicy chicken, tomato sauce, bell peppers, red onion, mozzarella, hot jalapeno peppers, tomatoes, salsa sauce","price":"1950"    },
    {   "name":"arriva","source":"images\\arriva.jpeg","recipe":"Burger sauce, chicken, ranch sauce, chicken chorizo, bell peppers, red onions, mozzarella, tomatoes, garlic", "price":"1750" },
    {   "name":"cheese","source":"images\\cheese.jpg","recipe":"Large portion of mozzarella, tomato sauce", "price":"1450"    },
    {   "name":"ham and sheese","source":"images\\ham_and_cheese.jpg","recipe":"Chicken ham, extra mozzarella, alfredo sauce","price":"1450"    },
    {   "name":"cheeseburder pizza","source":"images\\cheeseburger_pizza.jpg","recipe":"Meat sauce bolognese, mozzarella, red onion, pickles, tomatoes, burger sauce","price":"1750"    },
    {   "name":"four seasons","source":"images\\four_seasons.jpg","recipe":"Mozzarella, chicken ham, chicken pepperoni, cheese cubes, tomatoes, champignons, tomato sauce, Italian herbs","price":"1750"    },
    {   "name":"pizza pie","source":"images\\pizza_pie.jpg","recipe":"Pineapples, lingonberries, condensed milk","price":"1550"    }
]

const container = document.querySelector('.pizza_block');
for(let item of pizzas){
    const currentDiv = document.createElement('div');
    currentDiv.classList.add('pizza_item');

    const currentImage = document.createElement('img');
    currentImage.src = item['source'];
    currentImage.classList.add('img_item');

    const currentDescription = document.createElement('div');
    currentDescription.classList.add('item_description');

    const name = document.createElement('p');
    name.classList.add('item_name');
    name.textContent = item['name'];

    const recipe = document.createElement('p');
    recipe.classList.add('recipe');
    recipe.textContent = item['recipe'];

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = item['price']+' tg.';

    const bt = document.createElement('button');
    bt.classList.add('button_choose');
    bt.textContent = 'Choose';

    currentDescription.appendChild(name);
    currentDescription.appendChild(recipe);
    currentDescription.appendChild(price);
    currentDescription.appendChild(bt);

    currentDiv.appendChild(currentImage);
    currentDiv.appendChild(currentDescription);

    container.appendChild(currentDiv);
}
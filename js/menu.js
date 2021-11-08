const menu = () => {
  const cardsMenu = document.querySelector('.cards-menu');

  const cartArray = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

  // Функция изменения заголовка ресторана на странице меню
  const changeTitle = (restaurant) => {
    const sectionHeading = document.querySelector('.section-heading');

    // Заголовок страницы ресторана
    sectionHeading.innerHTML = `
      <h2 class="section-title restaurant-title">${restaurant.name}</h2>
      <div class="card-info">
        <div class="rating">
          ${restaurant.stars}
        </div>
        <div class="price">От ${restaurant.price}</div>
        <div class="category">${restaurant.kitchen}</div>
      </div>
    `;
  };

  // Функция добавления в корзину
  const addToCart = (cartItem) => {
    // Проверка на присутствие блюда в корзине и увеличение количества, если есть.
    if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }

        return item;
      });
    } else {
      cartArray.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  // Функция рендера каталога меню ресторана
  const renderItems = (data) => {
    data.forEach(({ description, id, image, name, price }) => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Карточка блюда
      card.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${description}
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
      `;

      card.querySelector('.button-card-text').addEventListener('click', () => {
        addToCart({ name, price, id, count: 1 });
      });

      cardsMenu.append(card);
    });
  };

  // Проверка на присутствие запроса, иначе - переход на главную, дабы избежать пустую страницу
  if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));

    changeTitle(restaurant);

    fetch(
      `https://delivery-food-test-default-rtdb.firebaseio.com/db/${restaurant.products}`
    )
      .then((response) => response.json())
      .then((data) => {
        renderItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    window.location.href = '/';
  }
};

menu();

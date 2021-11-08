const cart = () => {
  const buttonCart = document.getElementById('cart-button');
  const modalCart = document.querySelector('.modal-cart');
  const close = modalCart.querySelector('.close');
  const body = modalCart.querySelector('.modal-body');
  const buttonSend = modalCart.querySelector('.button-primary');
  const clearCartButton = modalCart.querySelector('.clear-cart');
  const modalPriceTag = modalCart.querySelector('.modal-pricetag');

  // Отчистка корзины
  const resetCart = () => {
    body.innerHTML = '';
    localStorage.removeItem('cart');
    modalCart.classList.remove('is-open');
  };

  // Функция прибавления количества блюд
  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }

      return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  // Функция убавления количества блюд
  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  // Функция рендера блюд в корзину
  const renderItems = (data) => {
    body.innerHTML = '';

    data.forEach(({ name, price, id, count }) => {
      const cartElem = document.createElement('div');
      cartElem.classList.add('food-row');

      // Строка блюда
      cartElem.innerHTML = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price} ₽</strong>
        <div class="food-counter">
          <button class="counter-button btn-dec" data-index="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button btn-inc" data-index="${id}">+</button>
        </div>
      `;
      body.append(cartElem);
    });
  };

  // Тело модального окна
  body.addEventListener('click', (e) => {
    e.preventDefault();

    // Делегирование клика
    if (e.target.classList.contains('btn-inc')) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains('btn-dec')) {
      decrementCount(e.target.dataset.index);
    }
  });

  // Кнопка очистки корзины
  clearCartButton.addEventListener('click', () => {
    resetCart();
  });

  // Кнопка отправки
  buttonSend.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart');

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // Кнопка открытия модального окна и проверка на присутствие блюд в корзине
  buttonCart.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
      renderItems(JSON.parse(localStorage.getItem('cart')));
    }

    modalCart.classList.add('is-open');
  });

  close.addEventListener('click', () => {
    modalCart.classList.remove('is-open');
  });
};

cart();

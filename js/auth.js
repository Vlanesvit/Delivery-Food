const buttonAuth = document.querySelector('.button-auth');
const buttonCart = document.querySelector('.button-cart');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const closeAuth = document.querySelector('.close-auth');
const modalAuth = document.querySelector('.modal-auth');

const logInForm = document.getElementById('logInForm');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');

// Функция авторизации пользователя
const login = (user) => {
  buttonAuth.style.display = 'none';
  buttonOut.style.display = 'flex';
  buttonCart.style.display = 'flex';
  userName.style.display = 'flex';
  userName.textContent = user.login;
  modalAuth.style.display = 'none';
};

// Функция выхода пользователя
const logout = () => {
  buttonAuth.style.display = 'flex';
  buttonOut.style.display = 'none';
  buttonCart.style.display = 'none';
  userName.style.display = 'none';
  userName.textContent = '';

  localStorage.removeItem('user');
};

// Кнопка авторизации
buttonAuth.addEventListener('click', () => {
  modalAuth.style.display = 'flex';
});

// Кнопка выхода
buttonOut.addEventListener('click', () => {
  logout();
});

// Кнопка закрытия модального окна
closeAuth.addEventListener('click', () => {
  modalAuth.style.display = 'none';
});

// Отправка формы
logInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let errorForm = checkInput();

  if (errorForm === 0) {
    // Объект с данными пользователя при авторизации
    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };

    localStorage.setItem('user', JSON.stringify(user));
    login(user);
  }
});

if (localStorage.getItem('user')) {
  login(JSON.parse(localStorage.getItem('user')));
}

// Функция проверки инпутов
const checkInput = () => {
  let errorForm = 0;

  // Инпут логина
  if (inputLogin.value === '') {
    alert('Введите ваш логин');
    errorForm++;
  }

  // Инпут пароля
  if (inputPassword.value === '') {
    alert('Введите ваш пароль');
    errorForm++;
  }

  return errorForm;
};

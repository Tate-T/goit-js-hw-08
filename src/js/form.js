// Задача
// 1) При каждом изменении любого элемента формы, кроме пароля, записывать его новое значение в LocalStorage. Значения всех инпутов должны храниться в объекте (имя инпута: значение)
// 2) При перезагрузке страницы нужно считывать информацию из LocalStorage, и если там есть сохраненные данные - записывать их в значения элементов формы (автозаполнение формы)
// 3) При сабмите формы должна очищаться не только форма, но и LocalStorage, и локальная переменная, а финальные данные вывести в консоль
// 4) Считывание данных из LocalStorage должно быть безопасным и вынесено в отдельную функцию
// 5) Сохранять значение чекбокса также
// 6) переписать без локальной переменной, хранящей объект
// 7) рассмотреть вкратце new FormData(form)
// 8) Хранение сложных данных: массивы, объекты
// 9) Сервисы для localStorage

import storage from '../services/localStorage';

const formRef = document.querySelector('#sign-in');
const FORM_KEY = 'userData';

// const data = {
//   email: 'sas',
//   address: 'sds',
//   city: '',
//   canBeSpammed: false,
// };

let data = {};

const getSavedData = function (key) {
  try {
    const savedData = localStorage.getItem(key);
    const parsedData = JSON.parse(savedData) ?? {};
    return parsedData;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const populateData = function () {
  const savedData = getSavedData(FORM_KEY);
  // const savedData = storage.get(FORM_KEY) ?? {};
  data = savedData;

  const inputNames = Object.keys(data);
  // ["email", "address", "city", "canBeSpammed"]

  inputNames.forEach(name => {
    const input = formRef.elements[name];
    if (input.type === 'checkbox') {
      input.checked = data[name];
    } else {
      input.value = data[name];
    }
  });

  // formRef.elements.email.value = data.email;
  // formRef.elements.address.value = data.address;
  // formRef.elements.city.value = data.city;
  // formRef.elements.canBeSpammed.checked = data.canBeSpammed;
};

populateData();

const onInput = function (e) {
  const { name, type, value, checked } = e.target;
  if (name === 'password') {
    return;
  }

  data[name] = type === 'checkbox' ? checked : value;
  // if (type === 'checkbox') {
  //   data[name] = checked;
  // } else {
  //   data[name] = value;
  // }

  const strData = JSON.stringify(data);
  localStorage.setItem(FORM_KEY, strData);
};

const onSubmit = function (e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  e.currentTarget.reset();
  data = {};
  localStorage.removeItem(FORM_KEY);
};

formRef.addEventListener('input', onInput);
formRef.addEventListener('submit', onSubmit);

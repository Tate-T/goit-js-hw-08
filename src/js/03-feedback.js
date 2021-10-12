import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

let data = {};

const getSavedData = function (key) {
    try {
        const savedData = localStorage.getItem(key);
        const parsedData = savedData ? JSON.parse(savedData) : {};
        return parsedData;
    } catch (error) {
        console.log(error);
        return {};
    }
};

const populateData = function () {
    const savedData = getSavedData(FORM_KEY);
    data = savedData;

    const inputNames = Object.keys(data);

    inputNames.forEach(name => {
        const input = formRef.elements[name];
        input.value = data[name];
    });
};

populateData();

const onInput = function (e) {
    const { name, value } = e.target;
    if (name === 'password') {
        return;
    }
    data[name] = value;

    const strData = JSON.stringify(data);
    localStorage.setItem(FORM_KEY, strData);
};

const onSubmit = function (e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(data);
    e.currentTarget.reset();
    data = {};
    localStorage.removeItem(FORM_KEY);
};

formRef.addEventListener('input', throttle(onInput, 500));
formRef.addEventListener('submit', onSubmit);

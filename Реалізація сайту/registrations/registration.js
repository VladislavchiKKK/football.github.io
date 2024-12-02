// Масив для збереження зареєстрованих клієнтів
let client_registered = JSON.parse(localStorage.getItem('userRegistrations')) || [];

function generateUniqueId() {
    return Math.floor(Math.random() * 900000) + 100000;  
}

function registerUser() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;

    // Перевірка на існування користувача з таким же email
    const existingUser = client_registered.find(user => user.email === email);
    if (existingUser) {
        alert("Користувач з таким email вже зареєстрований.");
        return;
    }

    // Перевірка заповнення полів
    if (name && surname && email && phone && password && date) {
        const userData = {
            id: generateUniqueId(),
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password: password,
            date: date
        };

        // Оновлюємо масив клієнтів
        client_registered.push(userData);

        // Зберігаємо дані в localStorage
        localStorage.setItem('userRegistrations', JSON.stringify(client_registered));

        alert(`Користувач ${name} ${surname} успішно зареєстрований!`);

        window.location.href = "C:\Users\ACER\Desktop\Реалізація сайту\personal-account\personal-account.html";
    } else {
        alert("Заповніть всі обов'язкові поля.");
    }
}

// Функція для перевірки вводу номера телефону
function validatePhoneInput(event) {
    const input = event.target;
    const value = input.value;

    const validValue = value.replace(/[^0-9+]/g, ''); 
    if (validValue.length >= 1 && validValue[0] !== '+') {
        input.value = '+380' + validValue.replace('+380', ''); 
    } else {
        input.value = validValue; 
    }

    if (input.value.length < 13) {
        input.setCustomValidity("Номер телефону введено неправильно.");
    } else {
        input.setCustomValidity("");
    }
}

// Функція для перевірки вводу тільки літер
function validateLetters(event) {
    const input = event.target;
    const value = input.value;

    const validValue = value.replace(/[^a-zA-Zа-яА-ЯіїєґІЄҐ' ]/g, '');
    input.value = validValue; 
}

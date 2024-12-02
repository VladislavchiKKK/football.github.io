const gym = new GymManagement();


gym.loadFromLocalStorage();
gym.displayAbonements();
gym.displayEvents();



document.getElementById('abonementForm').addEventListener('submit', function (event) {
    event.preventDefault();

    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const services = document.getElementById('services').value;


    const newAbonement = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        services: services,
        
    };

    
    gym.addAbonement(newAbonement);

    gym.displayAbonements();

    // Очистити форму
    event.target.reset();
});

if (gym.abonements.length > 0) {
    console.log("Абонементи завантажено з localStorage:", gym.abonements);
} else {
    console.log("У localStorage немає даних про абонементи.");
}






document.getElementById('trainerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    
    const trainerName = document.getElementById('trainerName').value;
    const date = document.getElementById('date').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const trainerDescription = document.getElementById('trainerDescription').value;
    const specialisation = document.getElementById('specialisation').value;


    const newTrainer = {
        id: Date.now(),
        trainerName: trainerName,
        date: date,
        email: email,
        phone: phone,
        trainerDescription: trainerDescription,
        specialisation: specialisation,
    };

  
    gym.addTrainer(newTrainer);

  
    gym.displayTrainers();

    // Очистити форму
    event.target.reset();
});

if (gym.trainers.length > 0) {
    console.log("Тренерів завантажено з localStorage:", gym.trainers);
} else {
    console.log("У localStorage немає даних про тренерів.");
}







 document.addEventListener("DOMContentLoaded", () => {
    // Завантажити абонементи з localStorage
    const trainers = JSON.parse(localStorage.getItem('trainers')) || [];

    const trainerCardsContainer = document.getElementById('trainerCards');

    if (trainers.length === 0) {
        trainerCardsContainer.innerHTML = '<p>Немає доступних тренерів.</p>';
    } else {
        trainers.forEach(trainer => {
            const card = document.createElement('div');
            card.className = 'trainer-card';

            card.innerHTML = `
				 <figure class="card-hover">
                 <img class="image-trainer1" src="trainer.1.jpg" alt="Спортивний психолог">
                <figcaption class="information-trainer-name">${trainer.trainerName}</figcaption>
                <figcaption class="information-trainer">${trainer.specialisation}</figcaption>
                <figcaption class="information-trainer">Рейтинг: 10/10</figcaption>
                <figcaption class="trainerDescription">${trainer.trainerDescription}</figcaption>
               </figure>  

            `;

           
           
            




            trainerCardsContainer.appendChild(card);
        
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Завантажити абонементи з localStorage
    const abonements = JSON.parse(localStorage.getItem('abonements')) || [];

    const abonementCardsContainer = document.getElementById('abonementCards');

    if (abonements.length === 0) {
        abonementCardsContainer.innerHTML = '<p>Немає доступних абонементів.</p>';
    } else {
        abonements.forEach(abonement => {
            const card = document.createElement('div');
            card.className = 'abonement-card';

            card.innerHTML = `
				<h3>${abonement.name}</h3>
                <p>${abonement.description}</p>
                <p>${abonement.price}</p>
                <p>${abonement.services}</p>
                
            `;

            abonementCardsContainer.appendChild(card);
        });
    }
});
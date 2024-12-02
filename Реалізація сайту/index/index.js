document.addEventListener("DOMContentLoaded", () => {
    // Завантажити події з localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];

    const eventCardsContainer = document.getElementById('eventCards');

    if (events.length === 0) {
        eventCardsContainer.innerHTML = '<p>Немає доступних подій.</p>';
    } else {
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';

            card.innerHTML = `
				<h3>${event.eventName}</h3>
                <p>${event.eventDescription}</p>
                <p>${event.eventDate}</p>
                
            `;

            eventCardsContainer.appendChild(card);
        });
    }
});
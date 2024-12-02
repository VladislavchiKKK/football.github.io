class GymManagement {
    constructor() {
        this.clients = [];
        this.staff = [];
        this.trainers = JSON.parse(localStorage.getItem('trainers')) || [];
        this.abonements = JSON.parse(localStorage.getItem('abonements')) || [];
        this.events = [];
        this.payments = [];
        this.inventory = [];
        this.feedback = [];
        this.workoutPlans = [];
        this.achievements = [];
        this.notifications = [];
        this.additionalServices = [];
        this.badges = [];
    }

    
    addAbonement(abonement) {
        this.abonements.push(abonement);
        this.saveToLocalStorage();
    }

    addTrainer(trainer) {
        this.trainers.push(trainer);
        this.saveToLocalStorage();
        
    }



    saveToLocalStorage() {
        localStorage.setItem('abonements', JSON.stringify(this.abonements));
        localStorage.setItem('trainers', JSON.stringify(this.trainers));
    }

    loadFromLocalStorage() {
        this.abonements = JSON.parse(localStorage.getItem('abonements')) || [];
        this.trainers = JSON.parse(localStorage.getItem('trainers')) || [];
    }

    displayAbonements() {
        const abonementList = document.getElementById('abonementList');
        abonementList.innerHTML = "<h3>Список абонементів:</h3>";
        if (this.abonements.length === 0) {
            abonementList.innerHTML += "<p>Немає абонементів.</p>";
        } else {
            this.abonements.forEach((abonement, index) => {
                abonementList.innerHTML += `
                    <p>${index + 1}. Назва: ${abonement.name}, Опис: ${abonement.description},
                    Ціна: ${abonement.price}, Сервіси: ${abonement.services}</p>
                `;
            });
        }
    }


    displayTrainers() {
        const trainerList = document.getElementById('trainerList');
        trainerList.innerHTML = "<h3>Список тренерів:</h3>";
        if (this.trainers.length === 0) {
            trainerList.innerHTML += "<p>Немає тренерів.</p>";
        } else {
            this.trainers.forEach((trainer, index) => {
                trainerList.innerHTML += `
                    <p>${index + 1}. Ім'я: ${trainer.trainerName}, Дата народження: ${trainer.date}, Email: ${trainer.email},  
                    Phone: ${trainer.phone}, Опис: ${trainer.trainerDescription}, Спеціалізація: ${trainer.specialisation}</p>
                `;
            });
        }
    }


 







    updateClient(clientId, newInfo) {
        const client = this.clients.find(c => c.clientId === clientId);
        if (client) {
            Object.assign(client, newInfo);
            return true;
        }
        return false;
    }
    removeClient(clientId) {
        const index = this.clients.findIndex(c => c.clientId === clientId);
        if (index > -1) {
            this.clients.splice(index, 1);
        }
    }
    toggleClientActiveStatus(clientId) {
        const client = this.clients.find(c => c.clientId === clientId);
        if (client) {
            client.clientActive = !client.clientActive;
        }
    }
    addPayment(payment) {
        this.payments.push(payment);
    }
    updatePayment(paymentId, newInfo) {
        const payment = this.payments.find(p => p.paymentId === paymentId);
        if (payment) {
            Object.assign(payment, newInfo);
        }
    }
    deletePayment(paymentId) {
        const index = this.payments.findIndex(p => p.paymentId === paymentId);
        if (index > -1) {
            this.payments.splice(index, 1);
        }
    }
    checkPaymentStatus(paymentId) {
        const payment = this.payments.find(p => p.paymentId === paymentId);
        return payment ? payment.status : undefined;
    }
    addEquipment(equipment) {
        this.inventory.push(equipment);
    }
    updateEquipment(equipmentId, newInfo) {
        const equip = this.inventory.find(e => e.equipmentId === equipmentId);
        if (equip) {
            Object.assign(equip, newInfo);
        }
    }
    deleteEquipment(equipmentId) {
        const index = this.inventory.findIndex(e => e.equipmentId === equipmentId);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }
    checkEquipmentAvailability(equipmentId) {
        const equip = this.inventory.find(e => e.equipmentId === equipmentId);
        return equip ? equip.quantity > 0 : false;
    }
    generateFinancialReport() {
        const totalRevenue = this.payments.reduce((acc, payment) => acc + payment.amount, 0);
        const totalPayments = this.payments.length;
        return { totalRevenue, totalPayments };
    }
    getVisitStatistics() {
        const totalVisits = this.schedule.sessions.length;
        const activeClients = this.clients.filter(c => c.clientActive).length;
        return { totalVisits, activeClients };
    }
    addFeedback(feedback) {
        this.feedback.push(feedback);
    }
    updateFeedback(feedbackId, newInfo) {
        const feedback = this.feedback.find(f => f.feedbackId === feedbackId);
        if (feedback) {
            Object.assign(feedback, newInfo);
        }
    }
    deleteFeedback(feedbackId) {
        const index = this.feedback.findIndex(f => f.feedbackId === feedbackId);
        if (index > -1) {
            this.feedback.splice(index, 1);
        }
    }
    getAverageTrainerRating(trainerId) {
        const trainerFeedbacks = this.feedback.filter(f => { var _a; return ((_a = f.trainer) === null || _a === void 0 ? void 0 : _a.trainerId) === trainerId; });
        if (trainerFeedbacks.length === 0)
            return 0;
        const totalRating = trainerFeedbacks.reduce((acc, f) => acc + f.rating, 0);
        return totalRating / trainerFeedbacks.length;
    }
    getClientWorkoutPlan(clientId) {
        return this.workoutPlans.find(plan => plan.client.clientId === clientId);
    }
    addExerciseToWorkoutPlan(planId, exercise) {
        const plan = this.workoutPlans.find(p => p.planId === planId);
        if (plan) {
            plan.exercises.push(exercise);
        }
    }
    addEvent(event) {
        this.events.push(event);
    }
    registerClientForEvent(clientId, eventId) {
        const event = this.events.find(e => e.gymEventId === eventId);
        const client = this.clients.find(c => c.clientId === clientId);
        if (event && client) {
            event.participants.push(client);
        }
    }
}
class Client {
    constructor(clientId, fullName, birdthDate, email, phone, abonement, workoutPlan, achievement, additionalServices, clientActive, notification) {
        this.additionalServices = [];
        this.notifications = [];
        this.clientId = clientId;
        this.name = fullName;
        this.birdthDate = birdthDate;
        this.email = email;
        this.phone = phone;
        this.abonement = abonement;
        this.workoutPlan = workoutPlan;
        this.achievement = achievement;
        this.additionalServices = additionalServices;
        this.clientActive = clientActive;
        this.notifications = notification;
    }
    markNotificationAsRead(notificationId) {
        const notification = this.notifications.find(n => n.getId() === notificationId);
        if (notification) {
            notification.markAsRead();
        }
    }
    deleteNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.getId() !== notificationId);
    }
}
class Employee {
    constructor(employeeId, name, birthDate, email, phone, specialization, salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.phone = phone;
        this.specialization = specialization;
        this.salary = salary;
    }
}
var SpecializationType;
(function (SpecializationType) {
    SpecializationType["Administrator"] = "\u0410\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440";
    SpecializationType["Manager"] = "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440";
    SpecializationType["Receptionist"] = "\u0420\u0435\u0441\u0435\u043F\u0448\u0456\u043E\u043D\u0456\u0441\u0442";
    SpecializationType["SalesPerson"] = "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0437 \u043F\u0440\u043E\u0434\u0430\u0436\u0443";
    SpecializationType["MaintenanceStaff"] = "\u0422\u0435\u0445\u043D\u0456\u0447\u043D\u0438\u0439 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B";
    SpecializationType["NutritionConsultant"] = "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442 \u0437 \u0445\u0430\u0440\u0447\u0443\u0432\u0430\u043D\u043D\u044F";
    SpecializationType["MarketingSpecialist"] = "\u041C\u0430\u0440\u043A\u0435\u0442\u043E\u043B\u043E\u0433";
    SpecializationType["CustomerServiceRepresentative"] = "\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442 \u0437 \u043E\u0431\u0441\u043B\u0443\u0433\u043E\u0432\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432";
    SpecializationType["EventCoordinator"] = "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u043E\u0440 \u0437\u0430\u0445\u043E\u0434\u0456\u0432";
    SpecializationType["ITSupport"] = "\u0406\u0422-\u043F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430";
    SpecializationType["Cleaner"] = "\u041F\u0440\u0438\u0431\u0438\u0440\u0430\u043B\u044C\u043D\u0438\u043A";
    SpecializationType["SecurityStaff"] = "\u041E\u0445\u043E\u0440\u043E\u043D\u0435\u0446\u044C";
    SpecializationType["FrontDeskManager"] = "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0440\u0435\u0446\u0435\u043F\u0446\u0456\u0457";
    SpecializationType["GroupFitnessInstructor"] = "\u0406\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u0433\u0440\u0443\u043F\u043E\u0432\u0438\u0445 \u0437\u0430\u043D\u044F\u0442\u044C";
    SpecializationType["PersonalTrainer"] = "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0438\u0439 \u0442\u0440\u0435\u043D\u0435\u0440";
    SpecializationType["Physiotherapist"] = "\u0424\u0456\u0437\u0456\u043E\u0442\u0435\u0440\u0430\u043F\u0435\u0432\u0442";
    SpecializationType["YogaInstructor"] = "\u0419\u043E\u0433\u0430-\u0456\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440";
    SpecializationType["PilatesInstructor"] = "\u041F\u0456\u043B\u0430\u0442\u0435\u0441-\u0456\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440";
    SpecializationType["MartialArtsInstructor"] = "\u0406\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u0431\u043E\u0439\u043E\u0432\u0438\u0445 \u043C\u0438\u0441\u0442\u0435\u0446\u0442\u0432";
    SpecializationType["LifeCoach"] = "\u041A\u043E\u0443\u0447";
    SpecializationType["SportsPsychologist"] = "\u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u0438\u0439 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433";
    SpecializationType["EquipmentManager"] = "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043E\u0431\u043B\u0430\u0434\u043D\u0430\u043D\u043D\u044F";
})(SpecializationType || (SpecializationType = {}));
class Trainer {
    constructor(trainerId, name, birthDate, email, phone, salary, rating, description, gotEmployed, specialization) {
        this.trainerId = trainerId;
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.phone = phone;
        this.salary = salary;
        this.rating = rating;
        this.description = description;
        this.gotEmployed = gotEmployed;
        this.specialization = specialization;
    }
}
class GymProperties {
    constructor(name, address, budget) {
        this.name = name;
        this.address = address;
        this.budget = budget;
    }
}
class Schedule {
    constructor(sessions) {
        this.sessions = [];
        this.sessions = sessions;
    }
    getTrainerSchedule(trainerId) {
        return this.sessions.filter(session => session.trainer.trainerId === trainerId);
    }
    getClientSchedule(clientId) {
        return this.sessions.filter(session => session.client.clientId === clientId);
    }
    bookSession(client, trainer, equipment, location, startTime, endTime, additionalServices) {
        const isTrainerAvailable = this.sessions.every(session => !(session.trainer.trainerId === trainer.trainerId &&
            ((startTime.getTime() >= session.startTime.getTime() && startTime.getTime() < session.endTime.getTime()) ||
                (endTime.getTime() > session.startTime.getTime() && endTime.getTime() <= session.endTime.getTime()))));
        if (!isTrainerAvailable) {
            console.log(`Тренер ${trainer.name} зайнятий у вказаний час.`);
            return false;
        }
        const isEquipmentAvailable = equipment.every(equip => this.sessions.every(session => !(session.equipment.some(e => e.equipmentId === equip.equipmentId) &&
            ((startTime.getTime() >= session.startTime.getTime() && startTime.getTime() < session.endTime.getTime()) ||
                (endTime.getTime() > session.startTime.getTime() && endTime.getTime() <= session.endTime.getTime())))));
        if (!isEquipmentAvailable) {
            console.log("Вибране обладнання зайняте у вказаний час.");
            return false;
        }
        const isLocationAvailable = this.sessions.every(session => !(session.location.name === location.name &&
            ((startTime.getTime() >= session.startTime.getTime() && startTime.getTime() < session.endTime.getTime()) ||
                (endTime.getTime() > session.startTime.getTime() && endTime.getTime() <= session.endTime.getTime()))));
        if (!isLocationAvailable) {
            console.log(`Локація ${location.name} зайнята у вказаний час.`);
            return false;
        }
        const newSession = new TrainingSession(client, trainer, equipment, location, startTime, endTime, additionalServices);
        this.sessions.push(newSession);
        console.log(`Клієнт ${client.name} успішно записаний на заняття.`);
        return true;
    }
    cancelSession(sessionId) {
        const index = this.sessions.findIndex(session => session.getId() === sessionId);
        if (index !== -1) {
            this.sessions.splice(index, 1);
        }
    }
}
class TrainingSession {
    constructor(client, trainer, equipment, location, startTime, endTime, additionalServices) {
        this.client = client;
        this.trainer = trainer;
        this.equipment = equipment;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
        this.additionalServices = additionalServices;
    }
    getId() {
        return this.sessionId;
    }
}
class Abonement {
    constructor(abonementId, name, description, price, additionalServices, startDate, endDate) {
        this.additionalServices = [];
        this.abonementId = abonementId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.additionalServices = additionalServices;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
class Payment {
    constructor(paymentId, client, amount, paymentDate, paymentMethod, status) {
        this.paymentId = paymentId;
        this.client = client;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }
    processRefund() {
        //TODO: REFUNG LOGIC
    }
    getPaymentDetails() {
        //TODO: PAYMENT DETAILS
    }
    isPaymentSuccessful() {
        return this.status;
    }
}
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CreditCard"] = "\u041A\u0440\u0435\u0434\u0438\u0442\u043D\u0430 \u043A\u0430\u0440\u0442\u043A\u0430";
    PaymentMethod["Cash"] = "\u0413\u043E\u0442\u0456\u0432\u043A\u0430";
    PaymentMethod["BankTransfer"] = "\u0411\u0430\u043D\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u043F\u0435\u0440\u0435\u043A\u0430\u0437";
    PaymentMethod["PayPal"] = "PayPal";
})(PaymentMethod || (PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "\u0412 \u043E\u0431\u0440\u043E\u0431\u0446\u0456";
    PaymentStatus["Success"] = "\u0423\u0441\u043F\u0456\u0448\u043D\u043E";
    PaymentStatus["Cancelled"] = "\u0421\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E";
    PaymentStatus["Failed"] = "\u041D\u0435\u0443\u0441\u043F\u0456\u0448\u043D\u043E";
})(PaymentStatus || (PaymentStatus = {}));
class Equipment {
    constructor(equipmentId, name, quantity, maintenanceDate, underMaintenance) {
        this.equipmentId = equipmentId;
        this.name = name;
        this.quantity = quantity;
        this.maintenanceDate = maintenanceDate,
            this.underMaintenance = underMaintenance;
    }
    increaseQuantity(amount) {
        this.quantity += amount;
    }
    decreaseQuantity(amount) {
        this.quantity = Math.max(0, this.quantity - amount);
    }
    isUnderMaintenance() {
        return this.underMaintenance;
    }
    scheduleMaintenance(date) {
        this.underMaintenance = true;
        this.maintenanceDate = date;
        console.log(`Заплановано технічне обслуговування на ${this.maintenanceDate}.`);
    }
}
class Analytics {
    constructor(totalRevenue, totalVisits, totalClients, averageRating, costs) {
        this.totalRevenue = totalRevenue;
        this.totalVisits = totalVisits;
        this.totalClients = totalClients;
        this.averageRating = averageRating;
        this.costs = costs;
    }
}
class Feedback {
    constructor(feedbackId, client, sessionId, trainer, rating, comments, feedbackDate) {
        this.feedbackId = feedbackId;
        this.client = client;
        this.sessionId = sessionId;
        this.trainer = trainer;
        this.rating = rating;
        this.comments = comments;
        this.feedbackDate = feedbackDate;
    }
    static getAverageRating(feedbacks) {
        const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
        return totalRating / feedbacks.length;
    }
    static getFeedbackByClient(clientId, feedbacks) {
        return feedbacks.filter(feedback => feedback.client.clientId === clientId);
    }
}
class WorkoutPlan {
    constructor(planId, client, exercises, startDate, endDate, goal) {
        this.planId = planId;
        this.client = client,
            this.exercises = exercises;
        this.startDate = startDate;
        this.endDate = endDate;
        this.goal = goal;
    }
}
class Exercise {
    constructor(exerciseId, name, sets, reps, durationInMinutes) {
        this.exerciseId = exerciseId;
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.durationInMinutes = durationInMinutes;
    }
}
class Achievement {
    constructor(achivementId, title, description, rewards, criteria) {
        this.achievementId = achivementId;
        this.title = title;
        this.description = description;
        this.rewards = rewards;
        this.criteria = criteria;
    }
}
class Reward {
    constructor(rewardId, type, value) {
        this.rewardId = rewardId;
        this.type = type;
        this.value = value;
    }
}
var RewardType;
(function (RewardType) {
    RewardType["Discount"] = "\u0417\u043D\u0438\u0436\u043A\u0430";
    RewardType["FreeSession"] = "\u0411\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0435 \u0437\u0430\u043D\u044F\u0442\u0442\u044F";
    RewardType["AbonementUpgrade"] = "\u041F\u0456\u0434\u0432\u0438\u0449\u0435\u043D\u043D\u044F \u0440\u0456\u0432\u043D\u044F \u0430\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442\u0430";
})(RewardType || (RewardType = {}));
class AchievementManager {
    constructor(achievements) {
        this.achievements = [];
        this.achievements = achievements;
    }
    addAchievement(achievement) {
        this.achievements.push(achievement);
    }
    removeAchievement(id) {
        this.achievements = this.achievements.filter(ach => ach.achievementId !== id);
    }
    findAchievementById(id) {
        return this.achievements.find(ach => ach.achievementId === id);
    }
}
class gymEvent {
    constructor(gymEventId, name, date, location, maxParticipants, isExclusive, description) {
        this.participants = [];
        this.gymEventId = gymEventId;
        this.name = name;
        this.date = date;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.isExclusive = isExclusive;
        this.description = description;
    }
}
class ClientNotification {
    constructor(notificationId, client, message, type, method, scheduledDate) {
        this.notificationId = notificationId;
        this.client = client;
        this.message = message;
        this.sentDate = new Date();
        this.isRead = false;
        this.type = type;
        this.preferredMedium = method;
        this.scheduledDate = scheduledDate;
    }
    getId() {
        return this.notificationId;
    }
    markAsRead() {
        this.isRead = true;
        console.log(`Сповіщення "${this.message}" було прочитано клієнтом ${this.client.name}`);
    }
}
var NotificationType;
(function (NotificationType) {
    NotificationType["SessionReminder"] = "\u041D\u0430\u0433\u0430\u0434\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0440\u043E \u0437\u0430\u043D\u044F\u0442\u0442\u044F";
    NotificationType["MembershipRenewal"] = "\u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0430\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442\u0443";
    NotificationType["AchievementUnlocked"] = "\u041E\u0442\u0440\u0438\u043C\u0430\u043D\u043E \u0434\u043E\u0441\u044F\u0433\u043D\u0435\u043D\u043D\u044F";
    NotificationType["NewClassAlert"] = "\u041D\u043E\u0432\u0438\u0439 \u043A\u043B\u0430\u0441";
    NotificationType["SpecialOffer"] = "\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0430 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u044F";
})(NotificationType || (NotificationType = {}));
var NotificationMethod;
(function (NotificationMethod) {
    NotificationMethod["Email"] = "\u0415\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430 \u043F\u043E\u0448\u0442\u0430";
    NotificationMethod["SMS"] = "SMS";
    NotificationMethod["App"] = "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F \u0443 \u0434\u043E\u0434\u0430\u0442\u043A\u0443";
})(NotificationMethod || (NotificationMethod = {}));
class NotificationManager {
    constructor() {
        this.notifications = [];
    }
    addNotification(notification) {
        this.notifications.push(notification);
        console.log(`Додано сповіщення для клієнта ${notification.client.name}: ${notification.message}`);
    }
    // automatically notifications at a selected time
    sendScheduledNotifications() {
        const now = new Date();
        this.notifications.forEach(notification => {
            if (notification.scheduledDate && notification.scheduledDate <= now && !notification.isRead) {
                this.sendNotification(notification);
            }
        });
    }
    sendNotification(notification) {
        switch (notification.preferredMedium) {
            case NotificationMethod.Email:
                console.log(`Відправлено email сповіщення: ${notification.message}`);
                break;
            case NotificationMethod.SMS:
                console.log(`Відправлено SMS сповіщення: ${notification.message}`);
                break;
            case NotificationMethod.App:
                console.log(`Відправлено сповіщення у додатку: ${notification.message}`);
                break;
        }
        notification.markAsRead();
    }
}
class AdditionalService {
    constructor(serviceId, name, description, price, durationInMinutes, location, available) {
        this.serviceId = serviceId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationInMinutes = durationInMinutes;
        this.location = location;
        this.available = available;
    }
}
class Address {
    constructor(country, city, street) {
        this.country = country;
        this.city = city;
        this.street = street;
    }
}
class GymLocation {
    constructor(name, capacity, type, equipment, services, availability) {
        this.name = name;
        this.capacity = capacity;
        this.type = type;
        this.equipment = equipment;
        this.services = services;
        this.availability = availability;
    }
}
var LocationType;
(function (LocationType) {
    LocationType["MainHall"] = "\u0413\u043E\u043B\u043E\u0432\u043D\u0438\u0439 \u0437\u0430\u043B";
    LocationType["Studio"] = "\u0421\u0442\u0443\u0434\u0456\u044F";
    LocationType["SpaArea"] = "\u0417\u043E\u043D\u0430 \u0421\u041F\u0410";
    LocationType["CardioArea"] = "\u041A\u0430\u0440\u0434\u0456\u043E\u0437\u043E\u043D\u0430";
    LocationType["WeightliftingArea"] = "\u0417\u043E\u043D\u0430 \u0432\u0430\u0436\u043A\u043E\u0457 \u0430\u0442\u043B\u0435\u0442\u0438\u043A\u0438";
    LocationType["GroupClassRoom"] = "\u041A\u043B\u0430\u0441 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043E\u0432\u0438\u0445 \u0437\u0430\u043D\u044F\u0442\u044C";
    LocationType["PersonalTrainingRoom"] = "\u041A\u0456\u043C\u043D\u0430\u0442\u0430 \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0438\u0445 \u0442\u0440\u0435\u043D\u0443\u0432\u0430\u043D\u044C";
})(LocationType || (LocationType = {}));
class Leaderboard {
    constructor() {
        this.rankings = new Map(); // points
    }
    addPoints(client, points) {
        const currentPoints = this.rankings.get(client) || 0;
        this.rankings.set(client, currentPoints + points);
    }
    getTopClients() {
        return Array.from(this.rankings.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(entry => entry[0]);
    }
    displayTopClients() {
        const topClients = this.getTopClients();
        console.log("Топ-10 клієнтів:");
        topClients.forEach((client, index) => {
            console.log(`${index + 1}. ${client.name} - ${this.rankings.get(client)} балів`);
        });
    }
}
class Badge {
    constructor(name, description, rewardPoints) {
        this.name = name;
        this.description = description;
        this.rewardPoints = rewardPoints;
    }
}
class ClientWithBadges extends Client {
    constructor() {
        super(...arguments);
        this.badges = [];
    }
    addBadge(badge) {
        this.badges.push(badge);
        console.log(`Клієнт ${this.name} отримав значок: ${badge.name}`);
    }
    displayBadges() {
        this.badges.forEach(badge => {
            console.log(`Значок: ${badge.name} - ${badge.description} (${badge.rewardPoints} балів)`);
        });
    }
}
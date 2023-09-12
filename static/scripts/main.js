document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [],
        locale: 'ru',
        buttonText: {
            today: 'Сегодня'
        },
        headerToolbar: {
            start: 'title',
            center: '',
            end: 'prev,next today'
        },
        titleFormat: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },

    });
    calendar.render();


    // Добавляем текущую дату к заголовку после отрисовки календаря
    const titleContainer = calendarEl.querySelector('.fc-header-toolbar .fc-toolbar-title');
    const currentDate = new Date();
    const currentDateStr = currentDate.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    titleContainer.innerHTML = currentDateStr;

    let form = document.getElementById('savings-form');
    let alertResult = document.getElementById('alert-result');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let dailyAmount = parseFloat(document.getElementById('daily-amount').value);
        let targetAmount = parseFloat(document.getElementById('target-amount').value);

        // Удаляем все события из календаря перед добавлением новых
        calendar.removeAllEvents();

        let currentDate = moment();
        let savedAmount = 0;
        let days = 0;

        while (savedAmount < targetAmount) {
            savedAmount += dailyAmount;
            days++;
            calendar.addEvent({
                title: '+' + dailyAmount.toFixed(2),
                start: currentDate.format('YYYY-MM-DD'),
                backgroundColor: 'green'
            });
            currentDate.add(1, 'days');
        }


        // Формируем правильный текст оповещения
        let startDate = moment().format('DD.MM.YYYY');
        let endDate = moment().add(days - 1, 'days').format('DD.MM.YYYY'); // Вычитаем 1 день, так как начальная дата уже учтена
        let resultText = `За ${days} дней (с ${startDate} по ${endDate}) вы накопите ${targetAmount.toFixed(0)} рублей, если будете откладывать ${dailyAmount} рублей ежедневно.`;
        // Показываем алерт с результатом
        alertResult.textContent = resultText;
        alertResult.style.display = 'block';

        // Обновляем календарь после расчетов
        calendar.render();
    });
});

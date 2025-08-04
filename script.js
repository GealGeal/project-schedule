document.addEventListener('DOMContentLoaded', function () {
  fetch('schedule.json')
    .then(response => response.json())
    .then(events => {
      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ja',
        events: events,
      });
      calendar.render();
    });
});

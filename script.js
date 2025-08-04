document.addEventListener('DOMContentLoaded', function () {
  fetch('schedule.json')
    .then(response => {
      if (!response.ok) throw new Error('schedule.json の取得に失敗: ' + response.status);
      return response.json();
    })
    .then(tasks => {
      new Gantt("#gantt", tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        bar_height: 24,
        bar_corner_radius: 6,
        arrow_curve: 5,
        custom_popup_html: function(task) {
          return `
            <div class="popup-task">
              <h5>${task.name}</h5>
              <p><strong>期間:</strong> ${task.start} 〜 ${task.end}</p>
              <p><strong>進捗:</strong> ${task.progress}%</p>
            </div>
          `;
        }
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('gantt').innerText =
        '工程表の読み込みに失敗しました：' + err.message;
    });
});

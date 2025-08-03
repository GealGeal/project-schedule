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
        custom_popup_html: function(task) {
          return `
            <div style="padding:10px;">
              <h5>${task.name}</h5>
              <p>期間: ${task.start} 〜 ${task.end}</p>
              <p>進捗: ${task.progress}%</p>
            </div>
          `;
        }
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('gantt').innerText = '工程表の読み込みに失敗しました：' + err.message;
    });
});

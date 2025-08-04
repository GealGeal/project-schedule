document.addEventListener('DOMContentLoaded', function () {
  fetch('schedule.json', { cache: 'no-store' })
    .then(response => {
      console.log('schedule.json status:', response.status);
      return response.text().then(text => {
        console.log('schedule.json body preview:', text.slice(0, 300));
        if (!response.ok) throw new Error('HTTPエラー: ' + response.status);
        let tasks;
        try {
          tasks = JSON.parse(text);
        } catch (e) {
          throw new Error('JSONパース失敗: ' + e.message);
        }
        if (typeof Gantt === 'undefined') {
          throw new Error('Frappe Gantt ライブラリが読み込まれていません。');
        }
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
      });
    })
    .catch(err => {
      console.error('読み込みエラー:', err);
      document.getElementById('gantt').innerText =
        '工程表の読み込みに失敗しました：' + err.message;
    });
});

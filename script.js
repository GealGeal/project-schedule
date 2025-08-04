document.addEventListener('DOMContentLoaded', () => {
  const ganttContainer = document.getElementById('gantt');
  console.log("DOMContentLoaded イベント開始");

  fetch('schedule.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
      return response.json();
    })
    .then(tasks => {
      console.log('工程表データ:', tasks);

      if (typeof Gantt === 'undefined') {
        throw new Error('Frappe Gantt ライブラリが読み込まれていません。');
      }

      new Gantt(ganttContainer, tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        bar_height: 24,
        bar_corner_radius: 6,
        arrow_curve: 5,
        padding: 18,
        custom_popup_html: task => `
          <div class="popup-task">
            <h5>${task.name}</h5>
            <p><strong>期間:</strong> ${task.start} 〜 ${task.end}</p>
            <p><strong>進捗:</strong> ${task.progress}%</p>
          </div>
        `
      });

      console.log('ガントチャート初期化完了');
    })
    .catch(err => {
      console.error('読み込みエラー:', err);
      ganttContainer.innerText = '工程表の読み込みに失敗しました：' + err.message;
    });
});

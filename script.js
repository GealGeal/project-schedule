// ガントチャート初期化＋堅牢なフェールセーフ
document.addEventListener('DOMContentLoaded', function () {
  const loadingEl = document.getElementById('loading');
  const ganttContainer = "#gantt";

  function showError(msg) {
    const container = document.querySelector(ganttContainer);
    container.innerHTML = `<div style="padding:16px; border-radius:8px; background:#ffecec; color:#a33; font-weight:600;">${msg}</div>`;
    if (loadingEl) loadingEl.style.display = 'none';
  }

  if (typeof Gantt === 'undefined') {
    showError('ガントライブラリの読み込みに失敗しました。ネットワークを確認してください。');
    console.error('Frappe Gantt 未定義');
    return;
  }

  fetch('schedule.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('schedule.json の取得に失敗: ' + response.status);
      return response.text();
    })
    .then(text => {
      let tasks;
      try {
        tasks = JSON.parse(text);
      } catch (e) {
        throw new Error('schedule.json のパースに失敗: ' + e.message);
      }

      // ガントの初期化
      new Gantt("#gantt", tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
        bar_height: 20,
        bar_corner_radius: 5,
        arrow_curve: 8,
        padding: 18,
        custom_popup_html: function (task) {
          return `
            <div class="popup-task">
              <h5>${task.name}</h5>
              <p><strong>期間:</strong> ${task.start} 〜 ${task.end}</p>
              <p><strong>進捗:</strong> ${task.progress}%</p>
            </div>
          `;
        }
      });

      if (loadingEl) loadingEl.style.display = 'none';
    })
    .catch(err => {
      console.error(err);
      showError('工程表の読み込みに失敗しました：' + err.message);
    });
});

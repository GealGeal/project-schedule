document.addEventListener('DOMContentLoaded', function () {
  fetch('schedule.json')
    .then(response => {
      console.log('schedule.json ステータス:', response.status);
      return response.text().then(text => {
        console.log('schedule.json 本文（先頭500文字）:', text.slice(0, 500));
        if (!response.ok) throw new Error('取得に失敗: ' + response.status);
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error('JSONパース失敗: ' + e.message);
        }
      });
    })
    .then(tasks => {
      new Gantt("#gantt", tasks, {
        view_mode: 'Day',
        date_format: 'YYYY-MM-DD',
      });
    })
    .catch(err => {
      console.error('エラー:', err);
      document.getElementById('gantt').innerText = '工程表の読み込みに失敗しました：' + err.message;
    });
});

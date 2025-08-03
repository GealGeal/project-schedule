fetch('schedule.json')
  .then(response => response.json())
  .then(tasks => {
    const gantt = new Gantt("#gantt", tasks, {
      view_mode: 'Day', // 表示モード: 'Day', 'Week', 'Month'
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
  });

fetch('schedule.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(tasks => {
    const gantt = new Gantt("#gantt-chart-container", tasks, {
      header_height: 50,
      column_width: 30,
      step: 24,
      view_modes: ['Day', 'Week', 'Month'],
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 18,
      view_mode: 'Month',
      date_format: 'YYYY-MM-DD',
      language: 'ja',
      custom_popup_html: function(task) {
        const start = new Date(task.start);
        const end = new Date(task.end);
        const formattedStart = `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}`;
        const formattedEnd = `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, '0')}-${end.getDate().toString().padStart(2, '0')}`;

        return `
          <div class="details-container" style="padding:10px;">
            <h5>${task.name}</h5>
            <p>期間: ${formattedStart} 〜 ${formattedEnd}</p>
            <p>進捗: ${task.progress}%</p>
          </div>
        `;
      },
      on_click: function(task) {
        console.log(task);
      },
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    // スケジュール表示形式をガントチャート風に変更
    // 'timeline'は有料版の機能です。無料版では使用できません。
    // 代替として'list'や'resource'ビューなどを使用します。
    initialView: 'listWeek', // 週単位のリスト表示
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'listWeek,listMonth' // 表示形式の切り替え
    },
    locale: 'ja',
    events: [
      {
        title: '要件定義',
        start: '2025-08-05',
        end: '2025-08-08'
      },
      {
        title: '設計',
        start: '2025-08-11',
        end: '2025-08-15'
      },
      {
        title: '開発',
        start: '2025-08-18',
        end: '2025-08-29'
      },
      {
        title: 'テスト',
        start: '2025-09-01',
        end: '2025-09-05'
      }
    ]
  });

  calendar.render();
});

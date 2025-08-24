// ガントチャートのデータ
// 各オブジェクトが1つのタスクを表します
const tasks = [
    {
        id: 'task1',
        name: '要件定義',
        start: '2025-08-05',
        end: '2025-08-15',
        progress: 100, // 進捗率（%）
        custom_class: 'bar-milestone' // マイルストーンとして表示（任意）
    },
    {
        id: 'task2',
        name: '設計',
        start: '2025-08-11',
        end: '2025-08-15',
        progress: 50,
        dependencies: 'task1' // task1が完了したら開始
    },
    {
        id: 'task3',
        name: '開発',
        start: '2025-08-18',
        end: '2025-08-29',
        progress: 20,
        dependencies: 'task2' // task2が完了したら開始
    },
    {
        id: 'task4',
        name: 'テスト',
        start: '2025-09-01',
        end: '2025-09-10',
        progress: 20,
        dependencies: 'task3'
    },
    {
        id: 'task5',
        name: 'リリース',
        start: '2025-09-20',
        end: '2025-09-30', // 開始日と終了日を同じにするとマイルストーンになる
        progress: 20,
        dependencies: 'task4'
    },
        {
        id: 'task6',
        name: 'その他',
        start: '2025-10-01',
        end: '2025-10-10', // 開始日と終了日を同じにするとマイルストーンになる
        progress: 20,
        dependencies: 'task5'
    }
];

// ガントチャートの初期化
const gantt = new Gantt('#gantt', tasks, {
    // 表示形式のオプション
    view_mode: 'Month', // Day, Week, Month, Quarter, Half Day のいずれかを指定
    // タスクバーのクリックイベント
    on_click: function (task) {
        console.log(task);
    },
    // ドラッグ＆ドロップでタスク期間を変更した際のイベント
    on_date_change: function(task, start, end) {
        console.log(`タスク "${task.name}" の期間が変更されました。 開始日: ${start}, 終了日: ${end}`);
    },
    // 進行バーをドラッグした際のイベント
    on_progress_change: function(task, progress) {
        console.log(`タスク "${task.name}" の進捗が変更されました。進捗率: ${progress}`);
    },
    // タスクバーをドラッグで動かすかどうか
    // お客様に閲覧専用で共有する場合は、これを無効化することも検討
    draggable: true 
});

// 表示形式の切り替え
// gantt.change_view_mode('Week');

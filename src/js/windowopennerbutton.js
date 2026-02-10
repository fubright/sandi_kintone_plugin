(function () {
  'use strict';

  // 一覧画面が表示されたとき
  kintone.events.on('app.record.index.show', function (event) {
    // 二重登録防止
    if (document.getElementById('open-call-app')) return event;

    // 一覧画面のヘッダー領域を取得
    const header = kintone.app.getHeaderMenuSpaceElement();

    // ボタン作成
    const btn = document.createElement('button');
    btn.id = 'open-call-app';
    btn.textContent = '通話アプリ起動';
    btn.style.marginLeft = '8px';

    // クリック時の処理
    btn.addEventListener('click', function () {
      // 新しいウィンドウ（ポップアップ）を開く
      window.open(
        'https://localhost:443/softPhone.html',
        'softPhoneWindow',
        'width=300,height=700,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no'
      );
      // ポップアップがブロックされた場合
      if (!popup) {
        alert('ポップアップがブロックされました');
        return;
      }
    });

    // ヘッダーに追加
    header.appendChild(btn);

    // イベントを正常終了させる
    return event;
  });
})();

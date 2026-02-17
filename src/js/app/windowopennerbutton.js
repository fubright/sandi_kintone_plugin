(function () {
  'use strict';

  // ソフトフォンウィンドウの参照を保持
  let softPhoneWindow;

  // ----------------------------
  // 子ウィンドウ(ソフトフォン)を開く（※既存なら絶対に再ロードしない）
  // ----------------------------
  function openCallWindow() {
    // 生きているなら focus だけして return（window.open を呼ばない）
    if (softPhoneWindow && !softPhoneWindow.closed) {
      try {
        softPhoneWindow.focus();
        return;
      } catch (e) {
        // 何かしら触れない状態なら作り直す
        softPhoneWindow = null;
      }
    }

    // URLにパラメータを追加 Todo:検証環境なので後で直す
    const url = `https://softphone.stgdnpcc.com/softPhone.html`;

    // window設定
    const features = [
      'width=300',
      'height=700',
      'resizable=no',
      'scrollbars=no',
      'menubar=no',
      'toolbar=no',
      'location=no',
      'status=no',
    ].join(',');

    // 新しいウィンドウ（ポップアップ）を開く
    softPhoneWindow = window.open(url, 'softPhoneWindow', features);
    // ポップアップがブロックされた場合
    if (!softPhoneWindow) {
      alert('ポップアップがブロックされました');
      return;
    }
  }

  // ----------------------------
  // 一覧画面：起動ボタン設置
  // ----------------------------
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
    btn.onclick = function () {
      openCallWindow();
    };

    // ヘッダーに追加
    header.appendChild(btn);

    // イベントを正常終了させる
    return event;
  });

  // ----------------------------
  // 一覧/詳細画面：callto:// クリック
  // ----------------------------
  document.addEventListener(
    'click',
    function (event) {
      // クリック要素の一番近い祖先要素のaタグを取得
      const a = event.target.closest('a');
      // 存在しない場合は処理終了
      if (!a) return;

      // aタグからhrefを取得
      const href = a.getAttribute('href');
      // 存在しない、もしくはcalltoで始まらない場合は処理終了
      if (!href || !href.startsWith('callto://')) return;

      // 標準遷移を止める
      event.preventDefault();

      // 電話番号・クリック対象のレコード・カスタマーIDの取得
      const phone = href.replace('callto://', '');
      const record = kintone.app.record.get().record;
      const custid = record.custid.value;

      // 子ウィンドウ(ソフトフォン)を起動
      openCallWindow();

      // 子ウィンドウが開いていたら送信
      if (softPhoneWindow && !softPhoneWindow.closed) {
        softPhoneWindow.postMessage({
          phoneNumber: phone,
          custid: custid,
        });
      }
    },
    true
  );
})();

(function (PLUGIN_ID) {
  'use strict';

  // プラグインの設定情報を取得
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  // 入力要素の取得
  const textInput = document.getElementById('checkvalue-field-text');
  const dropboxInput = document.getElementById('checkvalue-field-dropbox');

  // プラグインの設定情報に値があればフォームに初期値として設定
  textInput.value = config.textInput ?? '';
  dropboxInput.value = config.dropboxInput ?? '';

  // ----------------------------
  // 保存するボタン押下時アクション
  // ----------------------------
  document.getElementById('submit').onclick = function () {
    // 入力欄の値を保存用に整形
    const newConfig = {
      textInput: textInput.value,
      dropboxInput: dropboxInput.value,
    };

    //プラグインに設定値入力欄の値を保存
    kintone.plugin.app.setConfig(
      { config: JSON.stringify(newConfig) },
      function () {
        //メッセージを表示後、アプリ設定画面へ遷移させる
        alert('プラグインの設定が保存されました！アプリを更新してください！');
        window.location.href = '../../flow?app=' + kintone.app.getId();
      }
    );
  };

  // ----------------------------
  // キャンセルボタン押下時アクション
  // ----------------------------
  document.getElementById('cancel').onclick = function () {
    // ひとつ前の画面に戻る
    // プラグイン設定画面に遷移させる
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  };
})(kintone.$PLUGIN_ID);

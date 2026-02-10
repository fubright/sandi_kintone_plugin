# sandi_kintone_plugin
Genesys Cloud連携と、kintone連携時のプラグイン

## 開発環境
1. Node.jsとnpmのインストール  
    既にインストール済みの場合はスキップ  
    ※@kintone/plugin-packerを動作させる最低バージョンがあるので、それを満たしていなければアップデート推奨。[nodeの必要バージョン](https://github.com/kintone/js-sdk/blob/main/packages/plugin-packer/README.md)

    1. [ダウンロードページ](https://nodejs.org/en/download)からインストーラのダウンロードおよび、インストール  
    2. ターミナルで以下コマンドを実行し、インストールされているかを確認  
        ```bash
        node --version
        ```

2. Gitをクローン  
    1. 以下コマンドを実行
        ```bash
        cd <作業ディレクトリ>
        git clone <repository-url>
        cd sandi_kintone_plugin
        npm install
        ```
        ※npm installで以下がインストールされる  
        ・@kintone/plugin-packer：プラグイン用のソースコードをkintoneプラグインのファイルにパッケージングするためのツール  
        ・uglify-js：JavaScriptを軽量化・圧縮(minify化)  
        ・clean-css-cli：CSSを圧縮(minify化)  
        ・eslint：JavaScriptの静的解析ツール  
        ・prettier：コードを自動的に整形してくれるツール  
        ・rimraf：不要なキャッシュやビルドの出力ファイルを削除  
        ・mkdirp：ディレクトリを再帰的に作成するためのパッケージ  
        ・cpx：ファイルのコピーを行うためのツール  

## プラグイン化フロー
1. プラグイン化  
    1. 以下コマンドを実行しソースをパッケージング  
        **※初回（秘密鍵は基本的に共有する形になるため「2回目以降」を参照してください）**  
        ```bash
        # 推奨: 品質チェック付きパッケージング
        npm run pack:quality-new-key  # packコマンドは./src/package.jsonで定義されています。
        ```
        成功時に「sandi_kintone_plugin/」に秘密鍵(プラグインID)およびplugin.zipが生成される  
        **秘密鍵管理**  
        - 秘密鍵ファイル（*.ppk）はGitにコミットしない
        - 秘密鍵ファイルは安全な場所にバックアップ
        - 複数環境での開発時は秘密鍵ファイルを共有する

        **※2回目以降**  
        ```bash
        # 推奨: 品質チェック付きパッケージング
        npm run pack:quality-with-key  # packコマンドは./src/package.jsonで定義されています。
        ```
        初回パッケージング時に生成された秘密鍵(プラグインID)を指定することで同一プラグインとして更新される  
        ※プラグインIDが変わると別プラグインとして認識されてしまうため、1-2.実行の際に新規プラグインとしてアップロードされる  

    2. kintoneへアップロード  
        1. kintone管理画面 > プラグインに移動  
        2. 「読み込む」ボタンをクリックし生成された plugin.zip をアップロード  

    3. アプリにアップロードしたプラグインを適用  
        1. 対象アプリを開き、歯車アイコン(アプリの設定) > カスタマイズ／サービス連携 > プラグインに移動  
        2. 「追加する」をクリック、対象のプラグインを選択し「追加」、「アプリの設定に戻る」をクリック  
        3. 「アプリの更新」をクリック  
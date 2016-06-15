      var map = null;     // 地図オブジェクト
      var marker = null;  // マーカーオブジェクト
      var watchId = null; // 監視対象の地図のID

      function onBodyLoad()
      {
          document.addEventListener("deviceready", onDeviceReady, false);
      }
      function onDeviceReady()
      {
          getGeolocation();
      }

      // 位置情報の取得
      function getGeolocation() {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }

      // 位置情報の取得成功時のコールバック関数
      function onSuccess(position) {
          createMap(position);
      }

      // エラー時のコールバック関数
      function onError(error) {
          alert('コード: '        + error.code    + '\n' +
                  'メッセージ: '    + error.message + '\n');
      }

      // Google Mapsで現在地の地図を描画
      function createMap(position) {
          // 緯度経度を取得
          var latlng = new google.maps.LatLng(position.coords.latitude,
                               position.coords.longitude);

          // 地図オプションの指定
          var myOptions = {
              zoom: 14,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // 地図を取得
          map = new google.maps.Map(
              document.getElementById("mapCanvas"),
              myOptions);

          // マーカーを設定
          marker = new google.maps.Marker({
              position: latlng,
              map: map
          });
      }

      // 監視の開始
      function watchStart() {
          var options = { enableHighAccuracy: true };
          watchId = navigator.geolocation.watchPosition(
                                            onWatchSuccess, onError, options);
          document.getElementById("stopButton").disabled = null;
          document.getElementById("startButton").disabled = "disabled";
      }

      // 監視の終了
      function watchStop() {
          navigator.geolocation.clearWatch(watchId);
          document.getElementById("startButton").disabled = null;
          document.getElementById("stopButton").disabled = "disabled";
      }

      // 位置情報が変更された際に呼び出されるコールバック関数
      function onWatchSuccess(position) {
          // 地図とマーカーの座標を更新
          var latlng = new google.maps.LatLng(position.coords.latitude,
                               position.coords.longitude);
          map.setCenter(latlng);
          marker.setPosition(latlng);
      }

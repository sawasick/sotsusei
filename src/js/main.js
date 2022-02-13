var isCalibrate = false;
var isCalibrateComplete = false;
var pElem; // 1フレーム前に注視していた要素
var ppElem;
const csvData = [];
var startTime = null;
var isPointerDisplay = true; // 視線上のポインタを表示するかどうか
var isActionBackGround = false; // 視線上の要素の背景色にアクションするかどうか
var isActionFontSize = false;  // 視線上の要素の文字サイズにアクションするかどうか
window.onload = async function() {

    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setGazeListener(function(data, clock) {
          // if(data != null && isCalibrate == false) {
          //   ActionToElement(GetElementOnGaze(data.x, data.y));
          // }
          if(data != null && isCalibrateComplete == true) {
            if (CompareElem(data.x, data.y)) {
              AddDataToCSV(data.x + window.pageXOffset, data.y + window.pageYOffset);
              // console.log(data.x, data.y);

              if (isActionBackGround) {
                ActionToBackGround('same', GetElementOnGaze(data.x, data.y));
              }
            }
            else {
              if (isActionBackGround) {
                ActionToBackGround('diff', GetElementOnGaze(data.x, data.y));
              }
              if (isActionFontSize) {
                ActionToFontSize(GetElementOnGaze(data.x, data.y));
              }
              pElem = ppElem;
            }

          }
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            // console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();
};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").textContent = "キャリブレーションは完了していません";
    webgazer.clearData();
    ClearCalibration();
    PopUpUsage();
    CalibrationStart();

    // モーダルの削除
    document.getElementById('helpModal').remove();
}

// キャリブレーション中フラグを立てる
function CalibrationStart() {
  isCalibrate = true;
  document.getElementById('CalibrateStatus').textContent = "キャリブレーション中";
}

// キャリブレーションしてないフラグを立てる
function CalibrationEnd() {
  isCalibrate = false;
  document.getElementById('CalibrateStatus').textContent = "キャリブレーション中じゃない";
}

// キャリブレーション完了フラグを立てる
function CalibrationComplete() {
  isCalibrateComplete = true;
  document.getElementById('CalibrateStatus').textContent = "キャリブレーション完了";
}

// キャリブレーションを行わない
function CancelCalibration() {
  document.getElementById('Accuracy').textContent = "キャリブレーションは完了していません";
  webgazer.clearData();
  ClearCalibration();
  CalibrationEnd();

  // カメラの停止
  document.getElementById('webgazerVideoFeed').srcObject.getVideoTracks()[0].stop();
  // 左上のカメラ表示要素の削除
  document.getElementById('webgazerVideoContainer').remove();
  document.getElementById('webgazerGazeDot').remove();
  document.getElementById('calibrationDiv').remove();
  document.getElementById('plotting_canvas').remove();
  document.body.classList.remove('is-hidden');

  // モーダルの削除
  document.getElementById('helpModal').remove();
}

// 視線上のポインタの表示を切り替える
$('#pointerDisplay').on('click', function() {
  if (isPointerDisplay) {
    $('#webgazerGazeDot').addClass('is-hide--f');
    $(this).html('視線上の点: 非表示');
    isPointerDisplay = false;
  }
  else {
    $('#webgazerGazeDot').removeClass('is-hide--f');
    $(this).html('視線上の点: 表示');
    isPointerDisplay = true;
  }
});

// 視線上(赤いドット)の要素を取得
function GetElementOnGaze(x, y) {
    return document.elementFromPoint(x, y);
}

// 視線上(赤いドット)の要素が1フレーム前の要素と同じか比較
function CompareElem(x, y) {
  var elem = document.elementFromPoint(x, y);
  if (elem != null) {
    if (pElem == null) {
      pElem = elem;
    }
    // 前フレームで見た要素と違うなら
    if (elem != pElem) {
      ppElem = elem;
      return false
    }
  }
  return true
}

// 視線上の要素の背景色にアクションをするスイッチ
$('#switchBg').on('click', function() {
  if (isActionBackGround) {
    $(this).html('背景色にアクション: OFF');
    isActionBackGround = false;
  }
  else {
    $(this).html('背景色にアクション: ON');
    isActionBackGround = true;
  }
});

// 視線上の要素の背景色にアクションをする
function ActionToBackGround(command, elem) {
  if (command === 'same') {
    $(elem).addClass('action-bg');
  }
  else {
    $(elem).addClass('action-bg');
    $(pElem).removeClass('action-bg');
    // pElemのclassが1つもないならclass属性も削除
    if (pElem.classList.length == 0) {
      pElem.removeAttribute('class');
    }
  }
}

// 視線上の要素の文字サイズにアクションをするスイッチ
$('#switchFs').on('click', function() {
  if (isActionFontSize) {
    $(this).html('文字サイズにアクション: OFF');
    isActionFontSize = false;
  }
  else {
    $(this).html('文字サイズにアクション: ON');
    isActionFontSize = true;
  }
});

// 視線上の要素の文字サイズにアクションをする
function ActionToFontSize(elem) {
  $(elem).css('font-size', '+=10');
  $(pElem).css('font-size', '-=10');
}

function AddDataToCSV(x, y) {
  csvData.push('\n'+Math.round(x)+','+Math.round(y));
}

window.addEventListener('beforeunload', function(e) {
  // csvファイルをダウンロードする
  e.preventDefault();
  if (isCalibrateComplete) {
    // 閲覧時間をcsvの配列に格納
    csvData.splice(2, 0, '\n'+(Date.now() - startTime));

    // 日付をcsvの配列に追記
    const d = new Date();
    const dayname = ['日','月','火','水','木','金','土'];
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // 頭に0をつける
    const day = (('0' + d.getDate()).slice(-2)); // 頭に0をつける
    const minute = (('0' + d.getMinutes()).slice(-2)); // 頭に0をつける
    const date = '\n'+ d.getFullYear() + '年' + month + '月' + day + '日(' + dayname[d.getDay()] + ')' + d.getHours() + '時' + minute + '分';
    csvData.splice(1, 0, date);

    // EOFをcsvの配列に追記
    csvData.push('\n'+'EOF');

    /*
    書き出すcsvの形式は下記
    URL,
    日付,
    精度,
    閲覧時間(msec),
    閲覧時のviewportの幅,閲覧時のviewportの高さ,
    posX,posY,
    ...
    EOF

    このままだとカンマの後に空文字列が入るので行の末尾の要素を削除する処理をする→python側で実行
    */
    const blob = new Blob([csvData],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = 'wg'+date.replace(/[^0-9]/g, '')+'.csv';
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
});
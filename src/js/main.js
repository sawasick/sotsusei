var isCalibrate = false;
var isCalibrateComplete = false;
var pElem; // 1フレーム前に注視していた要素
window.onload = async function() {

    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          if(data != null && isCalibrate == false) {
            ActionToElement(GetElementOnGaze(data.x, data.y));
          }
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
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
    // PopUpInstruction();
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

// 視線上(赤いドット)の要素を取得
function GetElementOnGaze(x, y) {
    return document.elementFromPoint(x, y);
}

// 要素にアクションをする
/* アクションしたい要素に'wg-target'属性を付与する */
function ActionToElement(e) {
  var elem = e;
  document.getElementById('GazingElement').textContent = '注視している要素 :'+elem;
  if (elem != null) {
    if (pElem == null) {
      pElem = elem;
    }
    // 注視している要素がアクション対象なら
    // if(elem.hasAttribute('wg-target')) {
      elem.classList.add('action');
    // }

    // 前フレームで見た要素と違うなら
    if (elem != pElem) {
      pElem.classList.remove('action');
      // pElemのclassが1つもないならclass属性も削除
      if (pElem.classList.length == 0) {
        pElem.removeAttribute('class');
      }
      pElem = elem;
    }
  }
}
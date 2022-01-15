const $elem = `
<link rel="stylesheet" href="../../dist/main.css" />

<!-- TODO: 3.styleはclassで記述 -->
<canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>
<div class="debugInfo">
  <p id="Accuracy" class="accuracy">キャリブレーションは完了していません</p>
  <p id="CalibrateStatus" class="status">キャリブレーションステータス</p>
  <p id="GazingElement" class="gazing">注視している要素 : </p>
</div>
<!-- Calibration points -->
<div id="calibrationDiv" class="calibrationDiv">
  <input type="button" class="Calibration" id="Pt1"></input>
  <input type="button" class="Calibration" id="Pt2"></input>
  <input type="button" class="Calibration" id="Pt3"></input>
  <input type="button" class="Calibration" id="Pt4"></input>
  <input type="button" class="Calibration" id="Pt5"></input>
  <input type="button" class="Calibration" id="Pt6"></input>
  <input type="button" class="Calibration" id="Pt7"></input>
  <input type="button" class="Calibration" id="Pt8"></input>
  <input type="button" class="Calibration" id="Pt9"></input>
</div>

<div id="helpModal" class="pop-overlay">
  <div class="pop-modal">
    <img src="../../image/calibration.png" width="100%" height="100%" alt="webgazer demo instructions">
    <button id="closeBtn" class="pop-btn" onclick="CancelCalibration()" disabled>閉じる</button>
    <button id="start_calibration" class="pop-btn" onclick="Restart()" disabled>始める</button>
  </div>
</div>
`;
$('body').prepend($elem);
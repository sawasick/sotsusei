const $elem = `
<link rel="stylesheet" href="../../dist/main.css" />
<!-- TODO: 1.以下消したい -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

<!-- TODO: 3.styleはclassで記述 -->
<canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>
<p id="Accuracy" class="accuracy">キャリブレーションは完了していません</p>
<!-- Calibration points -->
<div id="calibrationDiv">
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

<!-- Modal -->
<div id="helpModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-body">
        <img src="../../image/calibration.png" width="100%" height="100%" alt="webgazer demo instructions">
      </div>
      <div class="modal-footer">
        <button id="closeBtn" type="button" class="btn btn-default" data-dismiss="modal" onclick="CancelCalibration()" disabled>閉じる</button>
        <button id="start_calibration" type="button" class="btn btn-primary" data-dismiss="modal" onclick="Restart()" disabled>始める</button>
      </div>
    </div>
  </div>
</div>
`;
$('body').append($elem);
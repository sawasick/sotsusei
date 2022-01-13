const $elem = `
<link rel="stylesheet" href="../../dist/main.css" />
<!-- TODO: 1.以下消したい -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">

<!-- TODO: 3.styleはclassで記述 -->
<canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>
<nav id="webgazerNavbar" class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
    <!-- The hamburger menu button -->
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar">Menu</span>
      </button>
    </div>
    <div id="myNavbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <!-- Accuracy -->
        <li id="Accuracy">
          <a>Not yet Calibrated</a>
        </li>
        <li>
          <a onclick="Restart()" href="#">Recalibrate</a>
        </li>
        <li>
          <a onclick="webgazer.applyKalmanFilter(!webgazer.params.applyKalmanFilter)" href="#">Toggle Kalman Filter</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <button class="helpBtn" data-toggle="modal" data-target="#helpModal">
            <a data-toggle="modal"><span class="glyphicon glyphicon-cog"></span> Help</a>
          </li>
      </ul>
    </div>
  </div>
</nav>
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
        <button id="closeBtn" type="button" class="btn btn-default" data-dismiss="modal">閉じる</button>
        <button id="start_calibration" type="button" class="btn btn-primary" data-dismiss="modal" onclick="Restart()" disabled>始める</button>
      </div>
    </div>
  </div>
</div>
`;
$('body').append($elem);
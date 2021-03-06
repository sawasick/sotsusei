const $elem = `
<style>body{min-width:600px !important}.webgazerVideoContainer{display:block;position:fixed !important;top:0px !important;left:0px !important;width:320px !important;height:240px !important;z-index:10000}.calibrationDiv{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(255,255,255,.8);z-index:9999}.Calibration{width:26px;height:26px;border-radius:25px;background-color:#f60509;border-color:#f60509;border-style:solid;position:fixed;cursor:crosshair;font-weight:bold;color:#fff}#Pt1{top:70px;left:340px}#Pt2{top:70px;left:50vw}#Pt3{top:70px;right:2vw}#Pt4{top:50vh;left:2vw}#Pt5{top:50vh;left:50vw}#Pt6{top:50vh;right:2vw}#Pt7{bottom:2vw;left:2vw}#Pt8{bottom:2vw;left:50vw}#Pt9{bottom:2vw;right:2vw}.PtComplete{background-color:#23d91e;border-color:#23d91e}.PtSample{width:22px;height:22px;border-radius:22px;background-color:#23d91e;border-color:#23d91e;font-weight:bold;color:#fff;line-height:1;padding:1.5px 0 0px 3px;display:inline-block}.debugInfo{position:fixed;top:0;left:320px;z-index:100000}.debugInfo ul{display:flex}.debugInfo ul:first-child{margin-bottom:5px}.debugInfo li{margin-right:10px}.debugInfo button{background:#ff7f00;color:#fff;border:none;border-radius:5px;padding:4px}.accuracy{background-color:#222 !important;color:#fff}.status{background-color:#222 !important;color:#fff}.gazing{background-color:#222 !important;color:#fff}.is-hidden{overflow:hidden}.is-hide{display:none}.is-hide--f{display:none !important}.action{background-color:#ff0}.webgazerGazeDot{display:block;position:fixed;z-index:99999;left:-5px;top:-5px;width:10px;height:10px;opacity:.7;background:red;border-radius:100%}.webgazerGazeDot-frame{display:block;width:60px;height:40px;border:2px solid blue;position:absolute;top:-15px;left:-25px;opacity:.7}.action-bg{background-color:rgba(255,128,0,.5) !important}.pop-overlay{position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.4);z-index:10000;display:flex;align-items:center;justify-content:center}.pop-modal{width:500px;background-color:#fff;text-align:center;border-radius:5px;z-index:10001}@media screen and (max-width: 480px){.pop-modal{width:300px}}.pop-modal button:disabled{opacity:.6}.pop-title{color:#333;font-weight:bold;font-size:27px;margin:0;padding:10px 0}@media screen and (max-width: 480px){.pop-title{font-size:18px;padding:8px 0}}.pop-text{font-size:18px;color:#222;width:82%;margin:0 auto;padding:10px 0;text-align:left}@media screen and (max-width: 480px){.pop-text{font-size:14px;width:84%;line-height:2;padding:8px 0}}.pop-btn{width:65px;height:45px;font-weight:bold;color:#fff;background-color:#007bff;border:none;border-radius:7px;position:relative;left:180px;margin-bottom:12px;cursor:pointer}@media screen and (max-width: 480px){.pop-btn{left:90px}}</style>
<canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>
<div class="debugInfo">
  <ul>
    <li id="Accuracy" class="accuracy">??????????????????????????????????????????????????????</li>
    <li id="CalibrateStatus" class="status">??????????????????????????????????????????</li>
  </ul>
  <ul>
    <li>
      <button type="button" id="pointerDisplay" class="pointerDisplay">???????????????: ??????</button>
    </li>
    <li>
      <button type="button" id="switchBg" class="switchBg">???????????????????????????: OFF</button>
    </li>
    <li>
      <button type="button" id="switchFs" class="switchFs">?????????????????????????????????: OFF</button>
    </li>
  </ul>
</div>
<!-- Calibration points -->
<div id="calibrationDiv" class="calibrationDiv">
  <button type="button" class="Calibration" id="Pt1">5</button>
  <button type="button" class="Calibration" id="Pt2">5</button>
  <button type="button" class="Calibration" id="Pt3">5</button>
  <button type="button" class="Calibration" id="Pt4">5</button>
  <button type="button" class="Calibration" id="Pt5">5</button>
  <button type="button" class="Calibration" id="Pt6">5</button>
  <button type="button" class="Calibration" id="Pt7">5</button>
  <button type="button" class="Calibration" id="Pt8">5</button>
  <button type="button" class="Calibration" id="Pt9">5</button>
</div>

<div id="helpModal" class="pop-overlay">
  <div class="pop-modal">
    <p class="pop-title">WebGazer+</p>
    <p class="pop-text">???????????????PC???web?????????????????????????????????????????????????????????????????????</p>
    <p class="pop-text">???????????????????????????????????????????????????????????????????????????????????????????????????</p>
    <button id="closeBtn" class="pop-btn" onclick="CancelCalibration()" disabled>?????????</button>
    <button id="start_calibration" class="pop-btn" onclick="Restart()" disabled>?????????</button>
  </div>
</div>
`;
$('body').prepend($elem);
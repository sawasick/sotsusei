const $elem = `
<style>body{min-width:600px !important}.webgazerVideoContainer{display:block;position:fixed !important;top:0px !important;left:0px !important;width:320px !important;height:240px !important;z-index:10000}.calibrationDiv{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(255,255,255,.8);z-index:9999}.Calibration{width:20px;height:20px;border-radius:25px;background-color:red;opacity:.2;border-color:#000;border-style:solid;position:fixed}#Pt1{top:70px;left:340px}#Pt2{top:70px;left:50vw}#Pt3{top:70px;right:2vw}#Pt4{top:50vh;left:2vw}#Pt5{top:50vh;left:50vw}#Pt6{top:50vh;right:2vw}#Pt7{bottom:2vw;left:2vw}#Pt8{bottom:2vw;left:50vw}#Pt9{bottom:2vw;right:2vw}.debugInfo{position:fixed;top:0;left:320px;display:flex;z-index:99999}.accuracy{background-color:#222 !important;color:#fff;margin-right:10px}.status{background-color:#222 !important;color:#fff;margin-right:10px}.gazing{background-color:#222 !important;color:#fff}.is-hidden{overflow:hidden}.is-hide{display:none}.is-hide--f{display:none !important}.action{background-color:#ff0}body{margin:0}.box-wrapper{display:flex;flex-wrap:wrap;position:relative;z-index:100}.box{width:16.6666666667%;height:calc((100vh - 50px)/4);font-size:50px}.box1{background-color:#e60012}.box2{background-color:#eb6100}.box3{background-color:#f39800}.box4{background-color:#fcc800}.box5{background-color:#fff100}.box6{background-color:#cfdb00}.box7{background-color:#8fc31f}.box8{background-color:#22ac38}.box9{background-color:#094}.box10{background-color:#009b6b}.box11{background-color:#009e96}.box12{background-color:#00a0c1}.box13{background-color:#00a0e9}.box14{background-color:#0086d1}.box15{background-color:#0068b7}.box16{background-color:#00479d}.box17{background-color:#1d2088}.box18{background-color:#601986}.box19{background-color:#920783}.box20{background-color:#be0081}.box21{background-color:#e4007f}.box22{background-color:#e5006a}.box23{background-color:#e5004f}.box24{background-color:#e60033}.pink{background-color:pink !important}.pale{opacity:.3}.target-info{position:absolute;top:0;left:50%;font-size:40px;font-weight:bold}.count-info{position:absolute;top:0;left:40%;font-size:40px;font-weight:bold}.is-hide{display:none}.pop-overlay{position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.4);z-index:10000;display:flex;align-items:center;justify-content:center}.pop-modal{width:500px;background-color:#fff;text-align:center;border-radius:5px;z-index:10001}@media screen and (max-width: 480px){.pop-modal{width:300px}}.pop-modal button:disabled{opacity:.6}.pop-title{color:#333;font-weight:bold;font-size:27px;margin:0;padding:10px 0}@media screen and (max-width: 480px){.pop-title{font-size:18px;padding:8px 0}}.pop-text{font-size:18px;color:#222;width:82%;margin:0 auto;padding:10px 0;text-align:left}@media screen and (max-width: 480px){.pop-text{font-size:14px;width:84%;line-height:2;padding:8px 0}}.pop-btn{width:65px;height:45px;font-weight:bold;color:#fff;background-color:#007bff;border:none;border-radius:7px;position:relative;left:180px;margin-bottom:12px;cursor:pointer}@media screen and (max-width: 480px){.pop-btn{left:90px}}</style>

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
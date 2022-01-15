var PointCalibrate = 0;
var CalibrationPoints={};

/**
 * Clear the canvas and the calibration button.
 */
function ClearCanvas(){
  $(".Calibration").hide();
  var canvas = document.getElementById("plotting_canvas");
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * キャリブレーションのやり方のポップを表示
 */
function PopUpUsage() {
  ClearCanvas();
  const $elem_usage = `
  <div id="js-pop-usage" class="pop-overlay">
    <div class="pop-modal">
    <p class="pop-title">キャリブレーションのやり方</p>
    <p class="pop-text">画面上の8つの点をそれぞれ見つめながら5回ずつクリックしてください。<br>点が黄色になったらクリック完了です。<br>8つの点をクリックし終えたら中心にもう1つ点が表示されるので同様に5回クリックしてください。</p>
    <button id="js-pop-usage-btn" class="pop-btn" type="submit">OK</button>
    </div>
  </div>
  `;
  $('body').append($elem_usage);
  $('#js-pop-usage-btn').on('click', function() {
    $('#js-pop-usage').remove();
    ShowCalibrationPoint();
  });
}

/**
  * Show the help instructions right at the start.
  */
// function helpModalShow() {
//     $('#helpModal').modal('show');
// }

/**
 * Load this function when the index page starts.
* This function listens for button clicks on the html page
* checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
*/
$(document).ready(function(){
  ClearCanvas();
  $('body').addClass('is-hidden');
     $(".Calibration").click(function(){ // click event on the calibration buttons

      var id = $(this).attr('id');

      if (!CalibrationPoints[id]){ // initialises if not done
        CalibrationPoints[id]=0;
      }
      CalibrationPoints[id]++; // increments values

      if (CalibrationPoints[id]==5){ //only turn to yellow after 5 clicks
        $(this).css('background-color','yellow');
        $(this).prop('disabled', true); //disables the button
        PointCalibrate++;
      }else if (CalibrationPoints[id]<5){
        //Gradually increase the opacity of calibration points when click to give some indication to user.
        var opacity = 0.2*CalibrationPoints[id]+0.2;
        $(this).css('opacity',opacity);
      }

      //Show the middle calibration point after all other points have been clicked.
      if (PointCalibrate == 8){
        $("#Pt5").show();
      }

      if (PointCalibrate >= 9){ // last point is calibrated
        //using jquery to grab every element in Calibration class and hide them except the middle point.
        $(".Calibration").hide();
        $("#Pt5").show();

        // clears the canvas
        var canvas = document.getElementById("plotting_canvas");
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // 測定値の計算の説明のポップを表示
        const $elem_measure = `
        <div id="js-pop-measure" class="pop-overlay">
          <div class="pop-modal">
          <p class="pop-text">OKを押したらマウスを動かさず、<br>真ん中の点を5秒間見つめてください。</p>
          <button id="js-pop-measure-btn" class="pop-btn" type="submit">OK</button>
          </div>
        </div>
        `;
        $('body').append($elem_measure);

        $('#js-pop-measure-btn').on('click', function() {
          $('#js-pop-measure').remove();
          $(document).ready(function(){
            store_points_variable(); // start storing the prediction points
            sleep(5000).then(() => {
              stop_storing_points_variable(); // stop storing the prediction points
              var past50 = webgazer.getStoredPoints(); // retrieve the stored points
              var precision_measurement = calculatePrecision(past50);
              var accuracyLabel = "精度 | "+precision_measurement+"%";
              document.getElementById("Accuracy").textContent = accuracyLabel; // Show the accuracy in the nav bar.

              const $elem_result = `
              <div id="js-pop-result" class="pop-overlay">
                <div class="pop-modal">
                <p class="pop-text">精度は${precision_measurement}%です</p>
                <button id="js-pop-result-btn-cancel" class="pop-btn" type="submit">やり直し</button>
                <button id="js-pop-result-btn-confirm" class="pop-btn" type="submit">OK</button>
                </div>
              </div>
              `;
              $('body').append($elem_result);
              $('#js-pop-result-btn-confirm').on('click', function(){
                // キャリブレーション終了
                ClearCanvas();
                $('#js-pop-result').remove();
                document.body.classList.remove('is-hidden');
                document.getElementById('calibrationDiv').classList.add('is-hide');

                // キャリブレーション中のフラグをfalseにする
                CalibrationEnd();

                // 左上のカメラを非表示にする→削除するとトラッキングできなくなる
                document.getElementById('webgazerVideoContainer').classList.add('is-hide--f');

                // canvasを削除
                document.getElementById('plotting_canvas').remove();

                // 視線ポインタを非表示にする
                // document.getElementById('webgazerGazeDot').classList.add('is-hide--f');
              });
              $('#js-pop-result-btn-cancel').on('click', function(){
                // 再キャリブレーション
                document.getElementById("Accuracy").textContent = "キャリブレーションは完了していません";
                webgazer.clearData();
                ClearCalibration();
                ClearCanvas();
                ShowCalibrationPoint();
              });
            });
          });
        });
      }
    });
});

/**
 * Show the Calibration Points
 */
function ShowCalibrationPoint() {
  $(".Calibration").show();
  $("#Pt5").hide(); // initially hides the middle button
}

/**
* This function clears the calibration buttons memory
*/
function ClearCalibration(){
  // Clear data from WebGazer

  $(".Calibration").css('background-color','red');
  $(".Calibration").css('opacity',0.2);
  $(".Calibration").prop('disabled',false);

  CalibrationPoints = {};
  PointCalibrate = 0;
}

// sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

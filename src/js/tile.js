// console.log('hoge');
var count = 0;
var pElem;
var info = document.getElementById('targetInfo');
var info2 = document.getElementById('countInfo');
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var xprediction = data.x;
    var yprediction = data.y;
    var z = document.elementFromPoint(xprediction, yprediction);
    if (z != null) {
      if (pElem == null) {
        pElem = z;
      }
      // console.log(z);
      if (z.hasAttribute('id')) {
        var zID = z.getAttribute('id');
        info.innerHTML = zID;
      }
      z.classList.add('pale');
      info.classList.add(zID);
      // 前フレームで見た要素と同じなら
      if (z == pElem) {
        count++;
        // console.log(count);
      }else {
        pElem.classList.remove('pale');
        info.classList.remove(pElem.getAttribute('id'));
        count = 0;
        pElem = z;
      }
  
      // info2.innerHTML = 'カウンタ:'+count;
      // if(z.hasAttribute('id')) {
      //   count++;
      //   console.log(count);
      // }
      // if(count >= 50) {
      //   z.classList.add('pink');
      //   count = 0;
      // }
      // console.log(elapsedTime);
    }
}).begin();
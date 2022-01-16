var dayOfWeek =["Sun","Mon","Tue","Wen","Thu","Fri","Sat"];
var FUKTemp = ["Fukuoka",[2.8,2.3,2.8,4.2,4.7,4.5,5.1]];
var KRMTemp = ["Kurume",[6.7,6.4,5.8,6.2,5.9,5.7,5.3]];
var TempData =[];
TempData.push(dayOfWeek);
TempData.push(FUKTemp);
TempData.push(KRMTemp);

var str = "";
var len_dayOfWeek =Object.keys(TempData[0]).length;
for(var i = 0; i<len_dayOfWeek; i++){
	if(i==0){
		str += "Temp,"+TempData[0][i]+",";
	}else if(i==len_dayOfWeek-1){
		str += TempData[0][i]+"\n"; //Satで改行する
	}else{
		str += TempData[0][i]+","; //カンマで区切る
	}
}
var len_element = Object.keys(TempData).length;
for(var i=0; i<len_element-1; i++){ //観測地域数分ループ
	str+=TempData[i+1][0]+",";
	var len_tempData =Object.keys(TempData[i+1][1]).length;
	for(var j=0; j<len_tempData; j++){
		if(j==len_tempData-1){
			str += TempData[i+1][1][j]+"\n";//観測地域最後の気温データで改行
		}else{
			str += TempData[i+1][1][j]+","; //カンマで区切る
		}
	}
}
  var blob =new Blob([str],{type:"text/csv"}); //配列に上記の文字列(str)を設定
  var link =document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download ="tempdate.csv";
  // link.click();
  console.log('DO');


window.addEventListener('load', () => {
  document.getElementById('btn').addEventListener('click', ClickDl);
});

function ClickDl(e) {
  e.preventDefault();
  const blob = new Blob([str],{type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = 'test.csv';
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  // ページを閉じる・戻る前など遷移のタイミングで処理したいこと
});
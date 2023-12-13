/**
 * @type {Array<Number>} costData 円グラフで表示されるデータの配列
 * @type {String[][]} data 2次元配列 入力した内容を記録 
 */
let  costData = [0,0,0,0,0];
let data = [];

/**
 * writeChart関数 円グラフの生成
 * @param {Date} date 
 * @param {String} item
 * @param {Number} cost
 */
const writeChart = (date,item,cost) => {
	if(date=='' || item=='' || cost==''){
		// inputの初期化
		$('input[name="date"]').val('');
		$('option[value=""]').prop('selected',true);
		$('input[name="cost"]').val('');
		return;
	}else{
		if($('option:selected').hasClass('house_child')){
			$('table').append('<tr class="house_child"><td>'+date+'</td><td>'+item+'</td><td>'+cost+`
			円</td><td class="remove" hidden><input type="checkbox" name="delete" value="hoge"/></td></tr>
			`);
			// チェックボックスのvalueを変数にする。
			$('input[name=delete]').val(date+', '+item+', '+cost);
			console.log($('input[name=delete]').val());
			// inputの初期化
			$('input[name="date"]').val('');
			$('option[value=""]').prop('selected',true);
			$('input[name="cost"]').val('');
			costData[0]+=cost;
			return;
		}else if($('option:selected').hasClass('eat_child')){
			$('table').append('<tr class="eat_child"><td>'+date+'</td><td>'+item+'</td><td>'+cost+'円</td></tr>');
			// inputの初期化
			$('input[name="date"]').val('');
			$('option[value=""]').prop('selected',true);
			$('input[name="cost"]').val('');
			costData[1]+=cost;
			return;
		}else if($('option:selected').hasClass('daily_child')){
			$('table').append('<tr class="eat_child"><td>'+date+'</td><td>'+item+'</td><td>'+cost+'円</td></tr>');
			// inputの初期化
			$('input[name="date"]').val('');
			$('option[value=""]').prop('selected',true);
			$('input[name="cost"]').val('');
			costData[2]+=cost;
			return;
		}else if($('option:selected').hasClass('pastime_child')){
			$('table').append('<tr class="pastime_child"><td>'+date+'</td><td>'+item+'</td><td>'+cost+'円</td></tr>');
			// inputの初期化
			$('input[name="date"]').val('');
			$('option[value=""]').prop('selected',true);
			$('input[name="cost"]').val('');
			costData[3]+=cost;
			return;
		}else{
			$('table').append('<tr class="other_child"><td>'+date+'</td><td>'+item+'</td><td>'+cost+'円</td></tr>');
			// inputの初期化
			$('input[name="date"]').val('');
			$('option[value=""]').prop('selected',true);
			$('input[name="cost"]').val('');
			costData[4]+=cost;
			return;
		}
		
	}
};

/**
 * saveDate関数
 */
// const saveData = ()=>{
// 	console.log('save');
// 	let date = JSON.stringify(dates);
// 	let item = JSON.stringify(items);
// 	let cost = JSON.stringify(costs);
// 	localStorage.setItem('date', date);
// 	localStorage.setItem('item', item);
// 	localStorage.setItem('cost', cost);
// };

// $(window).on('load', ()=>{
// 	/**
// 	 * @type {json} date
// 	 * @type {json} item
// 	 * @type {json} cost
// 	 * @ 
// 	 */
// 	let date = localStorage.getItem('date');
// 	let item = localStorage.getItem('item');
// 	let cost = localStorage.getItem('cost');
// 	// console.log('');
// 	// if(date=='undefined'){
// 	// 	console.log('a');
// 	// 	return;
// 	// }
// 	dates = JSON.parse(date);
// 	items = JSON.parse(item);
// 	costs = JSON.parse(cost);
// 	console.log(dates);
// 	for(let i=0;i<dates.length;i++){
// 		writeChart(dates[i], items[i], costs[i]);
// 	}
// });

$('#submit').on('click',()=>{
	/**
	 * DOMの取得
	 * @constant {Date} DATE 年月日
	 * @constant {String} ITEM 項目
	 * @constant {Number} COST 費用  
	 * */ 
	const DATE = $('input[name="date"]').val();
	const ITEM = $('option:selected').val();
	const COST = $('input[name="cost"]').val();
	if(DATE=='' || ITEM=='' || COST==''){
		return;
	}
	data.push([DATE,ITEM,COST]);
	
	// saveData();
	writeChart(DATE, ITEM, COST);
});
/**
 * 円グラフの作成
 * @see https://codelikes.com/chart-js-doughnut-pie/
 *  */ 
$('#pie-chart').on('click',()=>{
	console.log(1);
	let context = $('#breakdown')[0].getContext('2d');
	let chart = new Chart(context,{
		type:'doughnut',
		data:{
			labels:["住宅費","食費","日用品","趣味・娯楽","その他"],
			datasets:[{
				backgroundColor:["#00FF00","#FF0000","#FFFF00","#00FFFF","#FF00FF"],
				data:costData
			}]
		},
		options:{
			Plugins:{
				legend:{
					
				}
			}
		}
	});
	// グラフ更新用ボタンの生成
	$('#pie-chart').hide();
	$('#pie-chart').after('<input type="button" id="update-chart" value="内訳更新"/>');
});
/**
 * 円グラフの更新
 */
$('#update-chart').on('click',()=>{
	console.log('');
	chart.data.datasets[0].data = costData;
	chart.update();
});

// $('#save').on('click','saveData');
/**
 * TODO
 * @todo チェックボックスにチェックされたものが何番目にあるのか取得する
 *  また、localStorageの配列のその要素を削除する。
 */
$('#delete').on('click', ()=>{
	$('.remove').show();
	$('input[name=delete]').on('change', ()=>{
		let vals = $('input[name=delete]:checked').map(function(){
			return $(this).val();
		}).get();
		dates.filter(n => n !== 1);
		console.log(vals);
		$('input[name=delete]:checked').parent().parent().remove();
	});
});

// $('input[name="delete"]').on('check', ()=>{
// 	console.log($(this));
// });
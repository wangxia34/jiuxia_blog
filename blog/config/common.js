import $ from 'jquery'

let a_idx = 0;
let c_idx = 0;

const common =  {
    setClickSpecialEffects: (e) => {
        let a = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善"];
        let color = ['#ff0000','#eb4310','#f6941d','#fbb417','#ffff00','#cdd541','#99cc33','#3f9337','#219167','#239676','#24998d','#1f9baa','#0080ff','#3366cc','#333399','#003366','#800080','#a1488e','#c71585','#bd2158'];
        let $i = $("<span />").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        c_idx = (c_idx + 1) % color.length;
        let x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 9999999999999 ,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": color[c_idx],
            "-webkit-user-select":"none",
            "-moz-user-select":"none",
            "-ms-user-select":"none",
            "user-select":"none",
        });
        $("body").append($i);
        $i.animate({
                "top": y - 150,  //点击后文字上升高度
                "opacity": 0    //透明度
            },
            1000,
            function() {
                $i.remove();//文字消失时间
            });
    }
};

// window.requestAnimFrame = function () {
//     return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
//         window.setTimeout(a, 1E3 / 60)
//     }
// }();


export default common;
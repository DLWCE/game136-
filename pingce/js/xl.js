var cloud = document.getElementsByClassName("cloud")[0]; //筋斗云
var mainList = document.getElementsByClassName("main-list")[0]; //ul元素

var owner = mainList.children[0];

for (var i = 0; i < mainList.children.length; i++) {


    mainList.children[i].onmouseover = function() {

        animationSlow(cloud, this.offsetLeft);
    }

    mainList.children[i].onmouseout = function() {

        animationSlow(cloud, owner.offsetLeft);
    }

    mainList.children[i].onclick = function() {

        owner = this;
    }
}
var picList = document.getElementsByClassName("pic-list");


for (var i = 0; i < mainList.children.length; i++) {
    mainList.children[i].index = i;

    mainList.children[i].onmouseenter = function() {

        for (var j = 0; j < mainList.children.length; j++) {
            if (this.index == j) {
                picList[j].style.display = "block";
            } else {
                picList[j].style.display = "none";
            }
        }
    }
}
var picA = document.getElementsByClassName("pic-a");


for (var k = 0; k < picA.length; k++) {

}
var morePic = document.getElementsByClassName("more-pic")[0];
window.onscroll = function() {
    console.log(window.pageYOffset);
    console.log(document.body.offsetHeight + "px");
    console.log(document.body.scrollHeight);
    console.log(document.body.clientHeight);
    console.log(document.documentElement.scrollTop / (document.body.offsetHeight - window.pageYOffset));

    if ((window.pageYOffset) / (document.body.offsetHeight - 800) >= 0.9 && morePic.offsetHeight < 2420) {
        morePic.style.height = morePic.offsetHeight + 280 + "px";
    }
    if (morePic.offsetHeight >= 2420) {
        morePic.style.height = 2420 + "px";
        return;
    }
}
var goTop = document.getElementsByClassName("gotop")[0];
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
        goTop.style.display = "block";
    } else {
        goTop.style.display = "none"
    }

}, false)
window.onload = burst;

function burst() {
    // ready 用来避免高频率的产生动画效果
    var ready = true;
    // 容器
    var img = document.querySelector('.banner');
    // 动画时间,单位是s
    var S = 1;
    // 每行 R 个 碎片
    var R = 4;
    // 每列 C 个 碎片
    var C = 7;
    // 容器宽度
    var W = parseInt(window.getComputedStyle(img)['width']);
    // 容器高度
    var H = parseInt(window.getComputedStyle(img)['height']);
    // 控制碎片的范围
    var N = 2;
    // 碎片分散时，整个活动范围的宽
    var maxW = N * W;
    // 碎片分散时，整个活动范围的高
    var maxH = N * H;
    // 控制显示第 now 张图片
    var now = 0;
    // 保存图片路径的数组
    var imgArr = [
        './images/banner2.png',
        './images/letlive.png',
        './images/mmb11e.png',
        './images/nishuihan.png',

    ];
    img.style.background = 'url(' + imgArr[0] + ') no-repeat';

    var next = function() {
        return (now + 1) % imgArr.length;
    }

    img.onmouseover = function() {
        // 如果ready 为false 不产生动画效果
        if (!ready) return;
        ready = false;
        // 创建文档片段
        var html = document.createDocumentFragment();

        // 修改容器背景图
        if (now + 1 >= imgArr.length) {
            img.style.background = 'url(' + imgArr[0] + ') no-repeat ';
        } else {
            img.style.background = 'url(' + imgArr[now + 1] + ') no-repeat';
        }
        // posArr 用来保存每个碎片的初始位置和结束位置，
        var posArr = [];
        var k = 0;

        // 生成一定数量的小div元素，覆盖在容器上
        for (var i = 0; i < R; i++) {
            for (var j = 0; j < C; j++) {
                posArr[k] = {
                    // left 代表碎片初始时的 left 值
                    left: W * j / C,
                    // top 代表碎片初始时的 top 值
                    top: H * i / R,
                    // endLeft 代表动画结束时的 left 值
                    endLeftt: maxW * j / C - (maxW - (maxW - W) / C - W) / 2,
                    // endTop 代表动画结束时的 top 值
                    endTop: maxH * i / R - (maxH - (maxH - H) / R - H) / 2,
                    // (maxW-(maxW-W)/C-W)/2 和 (maxH-(maxH-H)/R-H)/2 是为了让碎片能在容器的周围散开
                };

                // 创建一个div，一个div就是一个碎片
                var debris = document.createElement("div");
                // url 用来表示碎片的背景图的路径
                var url = imgArr[now];
                // 初始时，碎片的样式
                debris.style.cssText = `
            position: absolute;
            width: ${Math.ceil(W / C)}px;
            height: ${Math.ceil(H / R)}px;
            background: url(${url}) -${posArr[k].left}px -${posArr[k].top}px  no-repeat;
            left: ${posArr[k].left}px;
            top: ${posArr[k].top}px;
            opacity:Math.floor(Math.random()*10)/10;
            transition:${randomNum(0.1, S)}s ease;
            `;
                // 把创建的每个div，添加到文档片段中
                html.appendChild(debris);
                k++;
            }
        }
        // 把文档片段 加到DOM树中
        img.appendChild(html);

        // 获取容器的所有子元素，也就是所有的碎片
        var debrisAll = img.children;
        // 改变每个碎片样式，实现动画效果
        setTimeout(function() {
            for (var i = 0; i < debrisAll.length; i++) {
                var l = posArr[i].endLeft;
                var t = posArr[i].endTop;
                debrisAll[i].style.cssText += `
            left : ${l}px;
            top : ${t}px;
            opacity :0;
            transform:perspective(500px) rotateX(${randomNum(-180, 180)}deg) rotateY(${randomNum(-180, 180)}deg) rotateZ(${randomNum(-180, 180)}deg) scale(${randomNum(1.5, 3)});
        `;
            }
            // 动画效果完成后
            // 删除碎片
            // 把ready 设置为true，可以再次产生动画效果
            // 改变 now的值，也就是改变当前要显示的图片
            setTimeout(function() {
                img.innerHTML = '';
                ready = true;
                now = next();
            }, S * 1000);

        }, 100);
    }

    // 产生一个 n - m 之间的随机数
    function randomNum(n, m) {
        return Math.random() * (m - n) + n;
    }
}
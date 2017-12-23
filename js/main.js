//创建两个画布两个画笔
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
//大鱼
var mom;
//鼠标xy
var mx;
var my;
//小鱼尾巴
var babyTail = [];
// 小鱼眼睛
var babyEye = [];
//小鱼身体
var babyBody = [];
//大鱼尾巴
var momTail = [];
// 大鱼眼睛
var momEye = [];
//大鱼身体
var momBodyOra = [];
var momBodyBlue = [];
var data;
//特效圈圈
var wave;
var halo;
//漂浮物
var dust;
var dustPic = [];

//游戏入口程序
document.body.onload = game;
//游戏主函数
function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
//初始化函数
function init() {
    // 获得canva场景
    can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");//background,ane,fruits
    ctx2 = can2.getContext("2d");

    //获取鼠标位置添加监测
    can1.addEventListener('mousemove', onMouseMove, false);

    bgPic.src = "src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    // 小鱼初始化尾巴图片
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "src/babyTail" + i + ".png";
    }
    // 小鱼初始化眼睛图片
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "src/babyEye" + i + ".png";
    }
    //小鱼初始化身体图片
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "src/babyFade" + i + ".png";
    }
    // 大鱼初始化尾巴图片
    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "src/bigTail" + i + ".png";
    }
    // 大鱼初始化眼睛图片
    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "src/bigEye" + i + ".png";
    }
    data = new dataObj();
    //大鱼初始化身体图片
    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "src/bigSwimBlue" + i + ".png";
    }
    ctx1.font = '30px Verdana';
    ctx1.textAlign = "center";
    //  初始化圈圈
    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();
    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();
}

//主循环函数
function gameloop() {
    window.requestAnimFrame(gameloop);//setInterval,setTimeout
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;

    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    //清空再绘制不然模糊 
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
//鼠标移动检测
function onMouseMove(e) {
    //game over时禁止鼠标移动
    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            // 鼠标位置获取
            // console.log(mx);
        }
    }
}
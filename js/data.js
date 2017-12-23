var dataObj = function () {
    // 果实分值
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    //游戏状态
    this.gameOver = false;
    this.alpha = 0;
}
// dataObj.prototype.reset = function () {
//     this.fruitNum = 0;
//     this.double = 1;
// }
dataObj.prototype.draw = function () {
    //分值画在画布
    var w = can1.width;
    var h = can1.height;
    // 成绩样式
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';

    ctx1.fillStyle = 'white';
    // ctx1.fillText("num " + this.fruitNum, w * 0.5, h - 50);
    // ctx1.fillText("double " + this.double, w * 0.5, h - 80);
    ctx1.fillText("SCORE:" + this.score, w * 0.5, h - 20);
    //game over绘制
    if (this.gameOver) {
        // 文字出现速度
        this.alpha += deltaTime * 0.0005;
        if (this.alpha > 1) {
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctx1.fillText("GAME OVER!", w * 0.5, h * 0.5);
    }
    //只作用于以上内容
    ctx1.restore();

}
dataObj.prototype.addScore = function () {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}
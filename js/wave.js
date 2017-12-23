var waveObj = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}
waveObj.prototype.num = 10;
// 初始化 
waveObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        //初始化半径
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';

    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            // 半径变化速度
            this.r[i] += deltaTime * 0.04;
            if (this.r[i] > 50) {
                this.alive[i] = false;
                //跳出循环不影响后面避免alpha超过0-1 错误认为1
                break;
            }
            //定义alpha值  10-40  1-1=0消失
            var alpha = 1 - this.r[i] / 50;
            //绘制圆圈
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            ctx1.stroke();
            //draw
            // console.log("draw");
        }
    }
    ctx1.restore();
}
waveObj.prototype.born = function (x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            // console.log("born");
            this.alive[i] = true;
            //定义半径和位置
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            //出生
            return;
            //跳出循环!!!!
        }
    }
}
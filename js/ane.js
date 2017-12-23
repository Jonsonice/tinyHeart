var aneObj = function () {
    //开始点 控制点 结束点
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    //振幅
    this.amp = [];
    this.alpha = 0;
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;//[0,1]海葵密度
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
    // console.log("a");
}
aneObj.prototype.draw = function () {
    // 正弦函数
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    ctx2.save();//样式作用区域
    ctx2.globalAlpha = 0.5;//海葵透明度
    ctx2.lineWidth = 20;//海葵宽度
    ctx2.lineCap = "round";
    ctx2.strokeStyle = '#3b154e';
    for (var i = 0; i < this.num; i++) {
        //beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();

}
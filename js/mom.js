var momObj = function () {
    this.x;
    this.y;
    this.angle;

    //尾巴计数器
    this.momTailTimer = 0;
    this.momTailCount = 0;
    // 眼睛计数器
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;
    //身体计数器
    this.momBodyCount = 0;
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    //增加角度
    this.angle = 0;

}
momObj.prototype.draw = function () {

    //lerp x,y  封装好的函数 大鱼可以移动
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.98);
    //每一帧计算坐标差delta angle   Math.atan2(y,x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //鼠标和大鱼的角度差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//返回值为PI或者—PI
    //lerp 函数  大鱼角度趋向于鼠标角度
    this.angle = lerpAngle(beta, this.angle, 0.6);
    //尾巴图片计数
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        //计时器归零
        this.momTailTimer %= 50;
    }
    // 眼睛图片计数
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        // 计时器归零
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momEyeCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000; //2s-3.5s的区间
        } else {
            this.momEyeInterval = 200;
        }
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);
    //旋转大鱼
    ctx1.rotate(this.angle);
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    var momBodyCount = this.momBodyCount;
    // 蓝色与橙色
    if (data.double == 1) {
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    } else {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
    }
    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);

    ctx1.restore();

}
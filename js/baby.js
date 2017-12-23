var babyObj = function () {
    this.x;
    this.y;
    this.angle;

    //尾巴计数器
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    // 眼睛计数器
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    //身体计数器
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 - 50;
    this.angle = 0;
}
babyObj.prototype.draw = function () {
    //小鱼跟随大鱼的坐标
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);
    //每一帧计算坐标差delta angle   Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    //小鱼和大鱼的角度差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; //返回值为PI或者—PI
    //lerp 函数  大鱼角度趋向于鼠标角度
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //尾巴图片计数
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        //计时器归零
        this.babyTailTimer %= 50;
    }
    // 眼睛图片计数
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        // 计时器归零
        this.babyEyeTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000; //2s-3.5s的区间
        } else {
            this.babyEyeInterval = 200;
        }
    }
    //身体图片计数
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        //身体变白时间
        this.babyBodyTimer %= 300;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //小鱼变白死亡 game over
            data.gameOver = true;
        }
    }
    // ctx1 获取图片
    ctx1.save();
    //移动组成身体
    ctx1.translate(this.x, this.y);
    //旋转小鱼
    ctx1.rotate(this.angle);
    //调整绘画小鱼顺序
    var babyTailCount = this.babyTailCount;
    var babyEyeCount = this.babyEyeCount;
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);

    ctx1.restore();

}
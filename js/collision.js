//判断大鱼和果实的距离
function momFruitsCollision() {
    //game over时判断不能吃到果实
    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                // calLength2开平方  大鱼和果实距离的平方 
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900) {
                    //果实被吃掉
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if (mom.momBodyCount > 7)
                        mom.momBodyCount = 7;

                    //蓝色果实加倍
                    if (fruit.fruitType[i] == "blue") {
                        data.double = 2;
                    }
                    //传参数
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}
//大鱼小鱼距离判断
function momBabyCollision() {
    if (data.fruitNum > 0 && !data.gameOver) {
        //只有拿到果实才执行的判断
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (l < 900) {
            //小鱼失去生命
            baby.babyBodyCount = 0;
            //恢复初始状态 大鱼碰到小鱼发生
            // data.reset();
            mom.momBodyCount = 0;
            //计算score更新
            data.addScore();
            //碰撞发生绘制圆圆
            halo.born(baby.x, baby.y);
        }
    }
}
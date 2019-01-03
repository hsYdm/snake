// 生成蛇的单例
var snake = new Snake();

// 初始化蛇头和蛇尾，用与记录蛇头蛇尾对应的方块实例
snake.head = null;
snake.tail = null;

// 蛇对应运动方向，用与计算蛇头下一格方块的坐标运算
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    UP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: 1
    }
}

snake.init = function (ground) {
    // 创建蛇头 和 蛇身，游戏开始时仅生成2节蛇身，位于战场左上角
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1);
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1);
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1);

    // 记录蛇头、蛇尾对应方块实例
    this.head = snakeHead;
    this.tail = snakeBody2;

    // 创建蛇的链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 默认运动方向向右
    this.direction = DIRECTIONENUM.RIGHT;

    // 将蛇添加到战场上，为了方便追踪到蛇的坐标，将蛇头、蛇身对应坐标上的Floor实例替换成蛇头、蛇身
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);
}

// 策略模式的运用，将算法的实现与使用分离开
snake.strategies = {
    /*
     *  @desc  蛇的运动逻辑
     *  @param  snake( Object, 必传 ) / 蛇的单例
     *  @param  square( Object, 必传 ) / 蛇头运动轨迹中下一个的方块实例
     *  @param  ground( Object, 必传 ) / 战场实例
     *  @param  fromEat( Boolean, 非必传, 默认false ) / 蛇头运动轨迹中的下一个方块实例是否为食物
    */
    MOVE: function(snake, square, ground, fromEat) {
        // 生成身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y);

        // 融入整个蛇
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 新建蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y);

        // 融入整个蛇
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        // 记录新蛇头
        snake.head = newHead;
        
        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);

        // 如果不是食物，则删除蛇尾
        if (!fromEat) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y);
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            // 记录新蛇尾
            snake.tail.last.next = null;
            snake.tail = snake.tail.last;
        }
        snake.allowTurn = true;
    },
    EAT: function(snake, square, ground) {
        this.MOVE(snake, square, ground, true);
        game.score++;
        createFood(ground);
    },
    DIE: function(snake, square, ground) {
        game.over();
    }
}


// 根据蛇的移动方向做出预判
snake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function') {
        this.strategies[square.touch()](this, square, ground);
    }
}
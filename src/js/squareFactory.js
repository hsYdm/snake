function SquareFactory() {}

/*
 *  @desc  利用create方法对各个实例工厂进行管理
 *  @param  type( String, 必传 ) / 生成实例类型
 *  @param  x( Number, 必传 ) / 方块实例在战场中的横坐标
 *  @param  y( Number, 必传 ) / 方块实例在战场中的纵坐标
 *  @param  color( String, 必传 ) / 方块实例颜色
*/
SquareFactory.create = function(type, x, y, color) {
    if (!SquareFactory.prototype[type]) {
        throw 'no this type';
    }

    // 让所有实例都继承自SquareFactory，能获取到SquareFactory.prototype
    // if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
    //     SquareFactory.prototype[type].prototype = new SquareFactory();
    // }

    var newSquare = SquareFactory.prototype[type](x, y, color);
    return newSquare;
}

/*
 *  @desc 初始化实例各属性
 *  @param  Square( Object, 必传 ) / 方块实例
 *  @param  strategyMessage( String, 必传 ) / 当蛇触碰到该方块，蛇应该执行的动作( MOVE, DIE, EAT, ADD )
 *  @param  color( String, 非必传 ) / 方块颜色
 *  @param  imgUrl( String, 非必传 ) / 方块背景图
*/
SquareFactory.prototype.init = function(square, strategyMessage, color, imgUrl) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    if(imgUrl) {
        square.viewContent.style.backgroundImage = 'url('+ imgUrl +')';
        square.viewContent.style.backgroundSize = 'cover';
    }else {
        square.viewContent.style.backgroundColor = color;
    }
    // 返回 蛇 需要执行的动作类型
    square.touch = function() {
        return strategyMessage;
    }
}


SquareFactory.prototype.Floor = function(x, y) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, STRATEGYMESSAGEENUM.MOVE, 'white');
    return floor;
}

SquareFactory.prototype.Stone = function(x, y) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, STRATEGYMESSAGEENUM.DIE, null, './src/img/stone.jpg');
    return stone;
}

SquareFactory.prototype.Food = function(x, y) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    food.viewContent.style.border = '1px solid red'
    this.init(food, STRATEGYMESSAGEENUM.EAT, null, './src/img/food.jpg');
    food.upDate(x, y);
    return food;
}

SquareFactory.prototype.SnakeHead = function(x, y) {
    var sh = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sh, STRATEGYMESSAGEENUM.DIE, '#00b5ff'); 
    sh.upDate(x, y);
    return sh;
}

SquareFactory.prototype.SnakeBody = function(x, y) {
    var sb = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sb, STRATEGYMESSAGEENUM.DIE, 'skyblue');
    return sb;
}
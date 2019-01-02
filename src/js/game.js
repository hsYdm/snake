var game = new Game();
game.timer = null;
game.score = 0;
game.iSpeed = 100;
 
game.init = function() {
    // 初始化战场
    ground.init();
    // 初始化蛇
    snake.init(ground);
    // 生成食物
    createFood(ground);

    // 改变蛇的移动方向
    document.onkeydown = function(e) {
        if (e.which == 37 && snake.direction != DIRECTIONENUM.RIGHT ) {
            snake.direction = DIRECTIONENUM.LEFT;
        }else if (e.which == 38 && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.UP;
        }else if (e.which == 39 && snake.direction != DIRECTIONENUM.LEFT) {
            snake.direction = DIRECTIONENUM.RIGHT;
        }else if (e.which == 40 && snake.direction != DIRECTIONENUM.UP) {
            snake.direction = DIRECTIONENUM.DOWN;
        }
    }

}

game.start = function() {
   game.timer = setInterval(function () {
        snake.move(ground);
    }, game.iSpeed);
}

game.over = function() {
    clearInterval(game.timer);
    alert(game.score);
    location.reload();
}

function createFood(ground) {
    var x = null;
    var y = null;
    var flag = true;
    while(flag) {
        x = 1 + Math.floor( Math.random() * ( XLEN - 2 ) );
        y = 1 + Math.floor( Math.random() * ( YLEN - 2 ) );
        

        var ok = true;
        var snakeFor = snake.head;
        while (ok) {
            if( snakeFor.x == x && snakeFor.y == y) {
                ok = false;
            }else {
                if( snakeFor.next ) {
                    snakeFor = snakeFor.next;
                }else {
                    ok = false;
                    flag = false;
                }
            }
        }
    }
    var food = SquareFactory.create('Food', x, y);
    ground.remove(food.x, food.y);
    ground.append(food);
}

document.getElementsByClassName('start')[0].addEventListener('click', function() {
    game.start()
})

game.init();
// 基础小方块宽高  px
var SQUAREWIDTH = 20;

// 战场宽高  横纵宽高多少个
var XLEN = 60;
var YLEN = 28;
 
// 小方块基类
function Square(x, y, width, height, dom) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.viewContent = dom || document.createElement('div');
}

// 更新食物、蛇头实例的坐标
Square.prototype.upDate = function(x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}

// 场景子类
var Ground = tool.single(Square);

// 地板子类
var Floor = tool.extends(Square);

// 障碍物子类
var Stone = tool.extends(Square);

// 食物子类
var Food = tool.single(Square);

// 蛇头子类
var SnakeHead = tool.single(Square);

// 蛇身子类
var SnakeBody = tool.extends(Square);

// 蛇子类（蛇头 + 蛇身）
var Snake = tool.single(Square);

// 游戏控制类
var Game = tool.single();

// 策略消息类型
var STRATEGYMESSAGEENUM = {
    MOVE: 'MOVE',
    EAT: 'EAT',
    DIE: 'DIE'
}
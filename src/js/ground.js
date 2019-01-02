/*
    制造战场，利用Ground类生成整体环境实例
    Floor类生成地板实例集合填充战场
    Stone类生成边界实例包围战场
    x, y, width, height, dom
*/


// 实例化战场整体环境 --- 可理解为一个虚无空间，里面什么都没有
var ground = new Ground(null, null, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH)

// 渲染战场
ground.init = function() {
	// this.viewContent.style.position = 'absolute';
	// this.viewContent.style.left = this.x + 'px';
	// this.viewContent.style.top = this.y + 'px';
	this.viewContent.style.position = 'relative';
	this.viewContent.style.margin = '5px auto 0';
	this.viewContent.style.backgroundColor = '#0ff';
	this.viewContent.style.width = this.width + 'px';
	this.viewContent.style.height = this.height + 'px';
	document.body.appendChild(this.viewContent);

	// 战场填充  x === j, y === i
	this.SquareTable = [];
	for(var i = 0; i < YLEN; i++) {

		this.SquareTable[i] = [];
		for(var j = 0; j < XLEN; j++) {
			if(i === 0 || j === 0 || i === YLEN - 1 || j === XLEN - 1) {
				// 生成障碍物
				var newSquare = SquareFactory.create('Stone', j, i);
			}else {
                // 生成地板
                var newSquare = SquareFactory.create('Floor', j, i);
            }
            this.SquareTable[i][j] = newSquare
			this.viewContent.appendChild(newSquare.viewContent)
		}

	}
}

// 拆除特定位置小方块
ground.remove = function(x, y) {
    this.viewContent.removeChild( this.SquareTable[y][x].viewContent );
    this.SquareTable[y][x] = null;
}

// 往战场内添加小方块实例，展示到特定位置，用与蛇身的移动、延长，食物的添加
ground.append = function(square) {
    this.SquareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
}
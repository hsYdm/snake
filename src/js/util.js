var tool = {
	/*
	 *  @desc  圣杯继承，让target构造函数的实例继承origin原型上的属性
	 *  @desc  支持多层继承，实例中，从下往上，到除了Object的最高级__proto__为止，每一个__proto__都是过渡函数midFun的实例
	 *  @param  target( Function, 必传 ) / 子工厂
	 *  @param  origin( Function, 必传 ) / 父工厂
	*/
	inherit: function(target, origin) {
		// 过渡函数作用是剔除各个父工厂自身属性的影响，只保留原型链上的公共属性
		var midFun = function() {
			for(var key in target.prototype) {
				if( target.prototype.hasOwnProperty(key) ) {
					this[key] = target.prototype[key];
				}
			}
			this.constructor = target;
		}

		midFun.prototype = origin.prototype;
		target.prototype = new midFun();
	},

	/*
	 *  @desc  继承origin构造函数，且复用其逻辑
	 *  @param  origin( Function, 必传 ) / 父工厂
	*/
	extends: function(origin) {
		var res = function() {
			origin.apply(this, arguments);
		}
		this.inherit(res, origin);
		return res;
	},

	/*
	 *  @desc  获取一个符合单例模式的构造函数，该构造函数实例化的实例遵守单例模式
	 *  @param  origin( Function, 选传 ) / 父工厂
	*/ 
	single: function(origin) {
		var singleRes = (function() {
			// 初始化实例，默认为null
			var instance = null;

			return function() {
				// 如果实例已存在，则直接返回原实例
				if(instance) {
					return instance;
				}

				instance = this;
				origin && origin.apply(this, arguments);
				return instance;
			}
		})()

		origin && this.inherit(singleRes, origin);
		return singleRes;
	}
}
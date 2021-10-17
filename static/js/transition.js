var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		 //水平标尺与canvas的距离
		var HORIZONTAL_AXIS_MARGIN = 50;
		 //竖直标尺与canvas的距离
		var VERTICAL_AXIS_MARGIN = 50;
		 //标尺起点
		var AXIS_ORIGIN = {
			x: HORIZONTAL_AXIS_MARGIN,
			y: canvas.height - VERTICAL_AXIS_MARGIN
		};
		 //坐标的顶部
		var AXIS_TOP = VERTICAL_AXIS_MARGIN;
		 //坐标的长度
		var AXIS_RIGHT = canvas.width - HORIZONTAL_AXIS_MARGIN;
		 //小标记的间隔
		var HORIZONTAL_TICK_SPACING = 10;
		var VERTICAL_TICK_SPACING = 10;
		 //坐标标记的范围
		var AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x;
		var AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP;
		 //纵向标记数值
		var NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING;
		 //横向标记数值
		var NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING;
		var TICK_WIDTH = 10;
		 //标牌和坐标轴之间的距离
		var SPACE_BETWEEN_ABELS_AND_AXIS = 20;
 
		function drawAxes() {
			context.save();
			context.lineWidth = 1.0;
			context.fillStyle = "rgba(100, 140, 230, 0.8)";
			context.strokeStyle = "navy";
			drawHorizontalAxis();
			drawVerticalAxis();
			context.lineWidth = 0.5;
			context.strokeStyle = "navy";
			context.strokeStyle = "darkred";
			drawVerticalAxisTicks();
			drawHorizontalAxisTicks();
			context.restore();
		}
			//绘制水平的小标
 
		function drawHorizontalAxisTicks() {
			var deltaY;
			for (var i = 1; i < NUM_HORIZONTAL_TICKS; i++) {
				context.beginPath();
				//判断画的是大坐标还是短坐标
				if (i % 5 == 0) {
					deltaY = TICK_WIDTH;
				} else {
					deltaY = TICK_WIDTH / 2
				}
				context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
					AXIS_ORIGIN.y - deltaY);
				context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
					AXIS_ORIGIN.y + deltaY);
				context.stroke();
			}
		}
		
		//绘制数值的小标
		function drawVerticalAxisTicks() {
			var deltaX;
			for (var i = 1; i < NUM_VERTICAL_TICKS; i++) {
				context.beginPath();
				if (i % 5 === 0) {
					deltaX = TICK_WIDTH;
				} else {
					deltaX = TICK_WIDTH / 2;
				}
				context.moveTo(AXIS_ORIGIN.x - deltaX,
					AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
				context.lineTo(AXIS_ORIGIN.x + deltaX,
					AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
				context.stroke();
			}
		}
		
		//画竖直线
		function drawVerticalAxis() {
			context.beginPath();
			context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
			context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
			context.stroke();
		}
		
		//画水平线
		function drawHorizontalAxis() {
			context.beginPath();
			context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
			context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
			context.stroke();
		}
		//绘制标注
		function drawAxisLabels() {
			context.fillStyle = "blue";
			drawHorizontalAxisLabels();
			drawVerticalAxisLabels();
		}
			//绘制竖直轴标注
 
		function drawVerticalAxisLabels() {
			context.textAlign = "center";
			context.textBaseline = "top";
			for (var i = 0; i <= NUM_HORIZONTAL_TICKS; i++) {
				if (i % 5 === 0) {
					context.fillText(i,
						AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
						AXIS_ORIGIN.y + SPACE_BETWEEN_ABELS_AND_AXIS);
				}
			}
		}
			//绘制水平轴标注
 
		function drawHorizontalAxisLabels() {
			context.textAlign = "center";
			context.textBaseline = "middle";
			for (var i = 0; i <= NUM_VERTICAL_TICKS; i++) {
				if (i % 5 === 0) {
					context.fillText(i,
						AXIS_ORIGIN.x - SPACE_BETWEEN_ABELS_AND_AXIS,
						AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
				}
			}
		}
 
		function drawGrid(color, stepx, stepy) {
			context.save()
			context.strokeStyle = color;
			context.fillStyle = '#ffffff';
			context.lineWidth = 0.5;
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
				context.beginPath();
				context.moveTo(i, 0);
				context.lineTo(i, context.canvas.height);
				context.stroke();
			}
			for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
				context.beginPath();
				context.moveTo(0, i);
				context.lineTo(context.canvas.width, i);
				context.stroke();
			}
			context.restore();
		}
		context.font = "13px Arial";
		
		drawGrid("lightgray", 10, 10);
		
		context.shadowColor = "rgba(100, 140, 230, 0.8)";
		context.shadowOffsetX = 3;
		context.shadowOffsetY = 3;
		context.shadowBlur = 5;
		
		drawAxes();
		drawAxisLabels();
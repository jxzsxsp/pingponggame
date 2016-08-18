$(function(){
	$("#paddleB").css("top","20px");
	$("#paddleA").css("top","60px");
});

var KEY = {
	UP:38,
	DOWN:40,
	W:87,
	S:83
}
/*
$(function(){
	$(document).keydown(function(e){
		console && console.log && console.log(e.which);
		
		switch(e.which){
			case KEY.UP:
				var top = parseInt($("#paddleB").css("top"));
				$("#paddleB").css("top",top-5);
				break;
			case KEY.DOWN:
				var top = parseInt($("#paddleB").css("top"));
				$("#paddleB").css("top",top+5);
				break;
			case KEY.W:
				var top = parseInt($("#paddleA").css("top"));
				$("#paddleA").css("top",top-5);
				break;
			case KEY.S:
				var top = parseInt($("#paddleA").css("top"));
				$("#paddleA").css("top",top+5);
				break;
		}
	});
});
*/

var pingpong = {
	scoreA:0,
	scoreB:0
}
pingpong.pressedKeys = [];
pingpong.ball = {
	speed:5,
	x:150,
	y:100,
	directionX:1,
	directionY:1
}

function moveBall(){
	//引用需要的变量
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var ball = pingpong.ball;
	
	//检测球台边缘
	//检测底边
	if(ball.y + ball.speed * ball.directionY > playgroundHeight){
		ball.directionY = -1;
	}
	//检测顶边
	if(ball.y + ball.speed * ball.directionY < 0){
		ball.directionY = 1;
	}
	//检测右边
	if(ball.x + ball.speed * ball.directionX > playgroundWidth){
		//玩家B丢分
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		//重置乒乓球
		ball.x = 250;
		ball.y = 100;
		$("#ball").css({
			"left":ball.x,
			"top":ball.y
		});
		ball.directionX = -1;
	}
	//检测左边
	if(ball.x + ball.speed * ball.directionX < 0){
		//玩家A丢分
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
		//重置乒乓球
		ball.x = 150;
		ball.y = 100;
		$("#ball").css({
			"left":ball.x,
			"top":ball.y
		});
		ball.directionX = 1;
	}
	
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;
	
	//稍后会在此检测球拍
	//检测左边球拍
	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	if(ball.x + ball.speed * ball.directionX < paddleAX){
		if(ball.y + ball.speed * ball.directionY <= paddleAYBottom && ball.y + ball.speed * ball.directionY >= paddleAYTop){
			ball.directionX = 1;
		}
	}
	
	//检测右边球拍
	var paddleBX = parseInt($("#paddleB").css("left")) - parseInt($("#paddleB").css("width"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	if(ball.x + ball.speed * ball.directionX > paddleBX){
		if(ball.y + ball.speed * ball.directionY <= paddleBYBottom && ball.y + ball.speed * ball.directionY >= paddleBYTop){
			ball.directionX = -1;
		}
	}
	
	//根据速度与方向移动乒乓球
	$("#ball").css({
		"left":ball.x,
		"top":ball.y
	});
}

function movePaddles(){
	if(pingpong.pressedKeys[KEY.UP]){
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN]){
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top+5);
	}
	if(pingpong.pressedKeys[KEY.W]){
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top-5);
	}
	if(pingpong.pressedKeys[KEY.S]){
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top+5);
	}
}

function gameloop(){
	moveBall();
	movePaddles();
}

$(function(){
	pingpong.timer = setInterval(gameloop,30);
	
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.which] = true;
	});
	
	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which] = false;
	});
});
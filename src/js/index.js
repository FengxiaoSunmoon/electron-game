var cur = {};
var next = {};
var Local = function(){
  var game = new Game();
  document.onkeydown = function(e){
    if(e.keyCode == 37){ //left
      game.left();
    }else if (e.keyCode == 38) { //up
      game.rotate();
    }else if (e.keyCode == 39) { //right
      game.right();
    }else if (e.keyCode == 40) { //down
      game.down();
    }else if (e.keyCode == 32) { //space
      game.fall();
    }
  }
  cur = squareMake();
  next = squareMake();
  game.init(cur,next);
  gameStart(game);
}
gameStart = function(game){
  var gameTimer = game.timeStart(); //开始计时
  var timer = setInterval(function(){
    if(!game.down()){
      game.fixed();
      game.checkClear();
      if(game.checkGameOver()){
        clearInterval(timer); //清除定时器
        clearInterval(gameTimer); //清除定时器
      }else{
        game.changeNext(next);
        next = squareMake();
      }
    }
  },600)
}
Local()

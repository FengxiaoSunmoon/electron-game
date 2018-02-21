var Game = function(conf=localConf){
  var gameDiv = conf.gameDiv; //游戏界面
  var nextDiv = conf.nextDiv || null; //方块界面
  var scoreDiv = conf.scoreDiv; //分数界面
  var gameOverDiv = conf.gameOverDiv; //结束界面
  var timeDiv = conf.timeDiv; //时间界面
  var score = 0; //分数
  var gameDivs = []; //游戏所有元素
  var nextDivs = []; //方块所有元素
  //当前方块
  var curSquare;
  //下一个方块
  var nextSquare;
  //游戏界面矩阵
  var gameData = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ];
  //渲染游戏界面
  var initDiv = function(container=gameDiv,data=gameData,divs=gameDivs){
    for(var i=0;i<data.length;i++){
      var div = [];
      for(var j=0;j<data[0].length;j++){
        var newNode = document.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i*conf.size) + 'px';
        newNode.style.left = (j*conf.size) + 'px';
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }
  //刷新div
  var refreshDiv = function(data=gameData,divs=gameDivs){
    for(var i=0;i<data.length;i++){
      for(var j=0;j<data[0].length;j++){
        if(data[i][j] == 0){
          divs[i][j].className = 'none';
        }else if (data[i][j] == 1) {
          divs[i][j].className = 'done';
        }else if (data[i][j] == 2) {
          divs[i][j].className = 'current';
        }
      }
    }
  }
  //检测点是否合法
  var check = function(pos,x,y){
    if(pos.x + x < 0){
      return false;
    }else if (pos.x + x >= gameData.length) {
      return false;
    }else if (pos.y + y<0) {
      return false;
    }else if (pos.y + y >= gameData[0].length) {
      return false;
    }else if (gameData[pos.x + x][pos.y + y] == 2) { //是否已经有点
      return false;
    }else {
      return true;
    }
  }
  //检测是数据是否合法
  var isValid = function(direction){
    var pos;
    var data = curSquare.data; //只检测数据，不改变curSquare的值
    switch (direction) {
      case "down":
        pos = {
          x: curSquare.origin.x + 1,
          y: curSquare.origin.y
        }
        break;
      case "left":
        pos = {
          x: curSquare.origin.x,
          y: curSquare.origin.y - 1
        }
        break;
      case "right":
        pos = {
          x: curSquare.origin.x,
          y: curSquare.origin.y + 1
        }
        break;
      default:  //默认是旋转事件
        r = (curSquare.rotate[1] + 1) % curSquare.rotate[0];
        data = curSquare.datas[r]
        pos = {
          x: curSquare.origin.x,
          y: curSquare.origin.y
        }
    }
    for (var i = 0; i < data.length; i++) {
      for(var j=0;j<data[0].length;j++){
        if(data[i][j] != 0){
          if(!check(pos,i,j)){
            return false;
          }
        }
      }
    }
    return true;
  }
  //清除数据
  var cleanData = function(){
    for(var i=0;i<curSquare.data.length;i++){
      for(var j=0;j<curSquare.data[0].length;j++){
        if(check(curSquare.origin,i,j)){
          gameData[curSquare.origin.x + i][curSquare.origin.y + j] = 0;
        }
      }
    }
  }
  //设置数据
  var setData = function(){
    for(var i=0;i<curSquare.data.length;i++){
      for(var j=0;j<curSquare.data[0].length;j++){
        if(check(curSquare.origin,i,j)){
          gameData[curSquare.origin.x + i][curSquare.origin.y + j] = curSquare.data[i][j]
        }
      }
    }
  }
  //下移
  var down = function(){
    if(isValid("down")){
      cleanData();
      curSquare.origin.x++;
      setData();
      refreshDiv();
      return true;
    }else {
      return false; //不能再下降返回false
    }
  }
  //左移
  var left = function(){
    if(isValid("left")){
      cleanData();
      curSquare.origin.y--;
      setData();
      refreshDiv();
    }
  }
  //右移
  var right = function(){
    if(isValid("right")){
      cleanData();
      curSquare.origin.y++;
      setData();
      refreshDiv();
    }
  }
  var rotate = function(){
    if(isValid("rotate")){
      curSquare.rotate[1] = (curSquare.rotate[1] + 1) % curSquare.rotate[0];
      curSquare.data = curSquare.datas[curSquare.rotate[1]]
      //console.log(curSquare.rotate[1])
      cleanData();
      setData();
      refreshDiv();
    }
  }
  //初始化
  var init = function(cur,next){
    curSquare = cur;
    nextSquare = next;
    initDiv();
    setData();
    refreshDiv();
    if(nextDiv){
      initDiv(nextDiv,nextSquare.data,nextDivs);
      refreshDiv(nextSquare.data,nextDivs);
    }
  }
  //方块移动底部固定
  var fixed = function(){
    for (var i = 0; i < curSquare.data.length; i++) {
      for(var j=0;j<curSquare.data[0].length;j++){
        if(check(curSquare.origin,i,j)){
          if(gameData[curSquare.origin.x + i][curSquare.origin.y + j] == 1){
            gameData[curSquare.origin.x + i][curSquare.origin.y + j] = 2;
          }
        }
      }
    }
    refreshDiv();
  }
  //消行
  var checkClear = function(){
    var line = 0;
    for(var i=gameData.length-1;i>=0;i--){
      var clear = true;
      for(var j=0;j<gameData[0].length;j++){
        if(gameData[i][j] != 2){ //有空格返回false
          clear = false;
          break;
        }
      }
      if(clear){
        line += 1;
        for(var m=i;m>0;m--){
          for(var n=0;n<gameData[0].length;n++){
            gameData[m][n] = gameData[m-1][n];
          }
        }
        for(var k=0;k<gameData[0].length;k++){
          gameData[0][k] = 0; //第一行变为0
        }
        i++;  //必须把消的那行加上去
      }
    }
    switch (line) {
      case 1:
        score += 100;
        scoreDiv.innerHTML = score + '分'
        break;
      case 2:
        score += 300;
        scoreDiv.innerHTML = score + '分'
        break;
      case 3:
        score += 600;
        scoreDiv.innerHTML = score + '分'
        break;
      case 4:
        score += 1000;
        scoreDiv.innerHTML = score + '分'
        break;
      default:
    }
  }
  //切换到下一个方块
  var changeNext = function(next){
    curSquare = nextSquare;  //此方法其实是绑定两边的对象，函数变，两边一起变
    setData();
    refreshDiv();
    nextSquare = next;
    if(nextDiv){
      refreshDiv(nextSquare.data,nextDivs);
    }
  }
  var checkGameOver = function(){
    var gameOver = false;
    for (var i = 0; i < gameData[0].length; i++) {
      if(gameData[0][i] == 2){
        gameOver = true;
        gameOverDiv.innerHTML = 'Game Over';
      }
    }
    return gameOver;
  }
  var timeStart = function(){
    //设置时间
    var t = 0;
    var setTimer = setInterval(function(){
        t++;
        timeDiv.innerHTML = t + '秒'
      },1000)
    return setTimer;
  }
  this.init = init;
  this.timeStart = timeStart;
  this.fall = function(){while (down()) {}}
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fixed = fixed;
  this.checkClear = checkClear;
  this.changeNext = changeNext;
  this.checkGameOver = checkGameOver;
  this.curSquare = curSquare;
}

var Square = function(){
  this.data = this.datas[this.rotate[1]];
  //原点
  this.origin = {
    x: -1,
    y: 3
  };
}
var Square1 = function(){
  this.datas = [
    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]
    ],
    [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [2,0]; //length,num
  Square.call(this);  //调用相同的模块
}
var Square2 = function(){
  this.datas = [
    [
      [0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,0,0,0],
      [1,1,0,0],
      [1,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,1,1,0],
      [0,1,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [4,0]; //length,num
  Square.call(this);
}
var Square3 = function(){
  this.datas = [
    [
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,1,0,0],
      [0,1,0,0],
      [1,1,0,0],
      [0,0,0,0]
    ],
    [
      [1,0,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,1,0,0],
      [1,0,0,0],
      [1,0,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [4,0]; //length,num
  Square.call(this);  //调用相同的模块
}
var Square4 = function(){
  this.datas = [
    [
      [1,1,1,0],
      [1,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]
    ],
    [
      [0,0,1,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,0,0,0],
      [1,0,0,0],
      [1,1,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [4,0]; //length,num
  Square.call(this);
}
var Square5 = function(){
  this.datas = [
    [
      [1,1,0,0],
      [1,1,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [1,0]; //length,num
  Square.call(this);
}
var Square6 = function(){
  this.datas = [
    [
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [1,0,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [2,0]; //length,num
  Square.call(this);
}
var Square7 = function(){
  this.datas = [
    [
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,1,0,0],
      [1,1,0,0],
      [1,0,0,0],
      [0,0,0,0]
    ]
  ];
  this.rotate = [2,0]; //length,num
  Square.call(this);
}
var squareMake = function(){
  var r = Math.round(Math.random()*7) //0和7概率少一半
  var d = Math.round(Math.random()*4)
  var s;
  switch (r) {
    case 1:
      s = new Square1();
      break;
    case 2:
      s = new Square2();
      break;
    case 3:
      s = new Square3();
      break;
    case 4:
      s = new Square4();
      break;
    case 5:
      s = new Square5();
      break;
    case 6:
      s = new Square6();
      break;
    default:
      s = new Square7();
  }
  s.rotate[1] = d % s.rotate[0]; //旋转一个随机角度
  s.data = s.datas[s.rotate[1]]
  return s;
}

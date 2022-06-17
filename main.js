enchant();

const ENEMY_NUMBER = 1000;
const cell_size = 50;
const y_start = 50;
const x_start = 150;
const time_max = 40;
const cpu_waittime = 2;
const search_depth = 1;
var cpu_varsion = 2;
const font = '60px 游ゴシック';

var Enemy = Class.create(Sprite, {
  initialize: function(rand, i) {
    Sprite.call(this, 300, 400);
    this.kind = rand;
    this.image = core.assets["enemy.png"];
    this.frame = rand;
    this.x = 500;
    this.y = 700 - 300 * i;
    this.scaleX = 0.7;
    this.scaleY = 0.7;
    gamescene.addChild(this);
  },
  er() {
    gamescene.removeChild(this);
  }
});

var Kick = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 204, 247);
    this.image = core.assets["kick.jpg"];
    this.x = 500;
    this.y = 1300;
    this.scaleX = 1;
    this.scaleY = 1;
    gamescene.addChild(this);
  }
});

var Unkick = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 204, 247);
    this.image = core.assets["unkick.jpg"];
    this.x = 200;
    this.y = 1300;
    this.scaleX = 1;
    this.scaleY = 1;
    gamescene.addChild(this);
  }
});

function update_score() {
  console.log(score);
  scoreLabel.text =`スコア　　${score}`;
  gamescene.removeChild(scoreLabel);
  gamescene.addChild(scoreLabel);
}

function next() {
  count++;
  for (var i = 0; i < ENEMY_NUMBER; i++) {
    ene[i].y += 300;
  }
}

function ki() {
  var after_kick = new Sprite(211, 365);
  after_kick.image = core.assets["after_kick.jpg"];
  after_kick.x = 150;
  after_kick.y = 500;
  after_kick.scaleX = 2;
  after_kick.scaleY = 2;
  gamescene.addChild(after_kick);
  kick_flag = 6;
  ene[count].frame += 2;
  next();
  // count++;
  // for(var i=0;i<ENEMY_NUMBER;i++){
  //   ene[i].y+=300;
  // }
}

function unki() {
  var before_kick = new Sprite(200, 360);
  before_kick.image = core.assets["before_kick.jpg"];
  before_kick.x = 150;
  before_kick.y = 500;
  before_kick.scaleX = 2;
  before_kick.scaleY = 2;
  gamescene.addChild(before_kick);
  kick_flag = 0;
  // next();
}

window.onload = function() {
  core = new Core(900, 1600);
  core.preload("kill.png","result.png","red.png", "white.png", "enemy.png", "good.png", "bad.png", "kick.jpg", "unkick.jpg", "before_kick.jpg", "after_kick.jpg", "tsugaku_boy.png", "akachan_onnanoko.png", "kick_boxing_man.png");
  core.fps = 30;
  core.onload = function() {
    core.replaceScene(GameScene());
  }
  core.start();
}

function GameScene() {
  gamescene = new Scene();
  gamescene.backgroundColor = "rgb(209, 227, 197)";

  kill=0;
  var red = new Sprite(310, 410);
  red.image = core.assets["red.png"];
  red.x = 494;
  red.y = 694;
  red.scaleX = 0.72;
  red.scaleY = 0.72;
  gamescene.addChild(red);

  ene = [];
  for (var i = 0; i < ENEMY_NUMBER; i++) {
    var rand = Math.floor(Math.random() * 2);
    ene[i] = new Enemy(rand, i);
  }
  count = 0;


  unki();
  var good = new Sprite(200, 200);
  good.image = core.assets["good.png"];
  good.x = 350;
  good.y = 20;
  var bad = new Sprite(200, 200);
  bad.image = core.assets["bad.png"];
  bad.x = 350;
  bad.y = 20;
  var white2 = new Sprite(400, 400);
  white2.image = core.assets["white.png"];
  white2.x = 0;
  white2.y = -100;
  gamescene.addChild(white2);
  var white = new Sprite(900, 400);
  white.image = core.assets["white.png"];
  white.x = 0;
  white.y = 1200;
  gamescene.addChild(white);


  score = 0;
  scoreLabel = new Label();
  scoreLabel.x = 50;
  scoreLabel.y = 170;
  scoreLabel.color = 'black';
  scoreLabel.font = font;
  scoreLabel.text = `スコア　　${score}`;
  gamescene.addChild(scoreLabel);

  var kick = new Kick();
  var unkick = new Unkick();
  kick.addEventListener("touchstart", function(e) {
    if (ene[count].kind === 0) {
      // gamescene.addChild(bad);
      score -= 100;
    } else {
      // gamescene.addChild(good);
      kill++;
      score += 100;
    }
    update_score();
    ki();
  });
  unkick.addEventListener("touchstart", function(e) {
    if (ene[count].kind === 1) {
      // gamescene.addChild(bad);
      score -= 100;
    } else {
      // gamescene.addChild(good);
      score += 100;
    }
    update_score();
    next();
  });
  time = time_max;
  timeLabel = new Label();
  timeLabel.x = 50;
  timeLabel.y = 50;
  timeLabel.color = 'black';
  timeLabel.font = font;
  gamescene.addChild(timeLabel);
  var frame = 0;
  gamescene.addEventListener('enterframe', function(e) {
    kick_flag--;
    if (kick_flag === 1) {
      unki();
    }
    frame++;

    if (frame === 30) {
      frame = 0;
      timeLabel.text = `残り時間　${time}`;
      gamescene.removeChild(timeLabel);
      gamescene.addChild(timeLabel);
      if (time === 0) {

          core.pushScene(ResultScene());
      }
      time--;
    }
  });

  return gamescene;
}
function ResultScene() {
  resultscene = new Scene();
  var background = new Sprite(600, 800);
  background.image = core.assets["result.png"];
  background.x = 150;
  background.y = 300;
  resultscene.addChild(background);
  resultLabel = new Label();
  resultLabel.x = 350;
  resultLabel.y = 400;
  resultLabel.color = 'black';
  resultLabel.font = '80px 游ゴシック';
  resultLabel.text = `スコア　　${score}`;
  resultscene.addChild(resultLabel);
  // var kill = new Sprite(570,282);
  // kill.image = core.assets["kill.png"];
  // kill.x=158;
  // kill.y = 350;
  // resultscene.addChild(kill);
  killLabel = new Label();
  killLabel.x = 350;
  killLabel.y = 700;
  killLabel.color = 'black';
  killLabel.font = '80px 游ゴシック';
  killLabel.text = `蹴った幼児の数　　${kill}`;
  resultscene.addChild(killLabel);


  return resultscene;
}

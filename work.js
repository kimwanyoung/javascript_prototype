const NBALL = 200; // 공의 개수
const R = 5; // 공의 반지름
const TIME_INTERVAL = 33; // 애니메이션의 시간 간격(ms 단위)
const BLACK_ALPHA = 0.3; //배경의 a 값
//canvas의 렌더링 컨텍스트 가져오기
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
//벽을 표현하는 객체
const wall = { left: 0, right: canvas.width, top: 0, bottom: canvas.height };
//공 객체를 NBALL개 만들어 배열 balls에 저장
const ball = [];
for (let i = 0; i < NBALL; i++) {
  ball[i] = new Ball(wall.right / 2, wall.bottom / 2, R);
  ball[i].setVelocityAsRandom(2, 7).setColorAsRandom(50, 255);
}

//애니메이션 실행 : TIME_INTERVAL(ms)마다 drawframe을 실행
setInterval(drawFrame, TIME_INTERVAL);

//애니메이션 프레임 그리기
function drawFrame() {
  //배경색 지정
  ctx.fillStyle = "rgba(0,0,0," + BLACK_ALPHA + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //공의 위치를 갱신하여 그린다
  for (let i = 0; i < ball.length; i++) {
    ball[i].move().collisionWall(wall).draw(ctx);
  }
}

function Ball(x, y, r, vx, vy, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
}
Ball.prototype = {
  //랜덤 속도 지정
  setVelocityAsRandom: function (vmin, vmax) {
    const v = vmin + Math.random() * (vmax - vmin);
    const t = 2 * Math.PI * Math.random();
    this.vx = v * Math.cos(t);
    this.vy = v * Math.sin(t);
    return this;
  },
  //랜덤 색상 지정
  setColorAsRandom: function (lmin, lmax) {
    const R = Math.floor(lmin + Math.random() * (lmax - lmin));
    const G = Math.floor(lmin + Math.random() * (lmax - lmin));
    const B = Math.floor(lmin + Math.random() * (lmax - lmin));
    this.color = "rgb(" + R + "," + G + "," + B + ")";
    return this;
  },

  //공 그리기
  draw: function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  },

  //공의 위치를 갱신
  move: function () {
    this.x += this.vx;
    this.y += this.vy;
    return this;
  },

  //벽과 공의 충돌
  collisionWall: function (wall) {
    if (this.x - this.r < wall.left) {
      //왼쪽 벽과 충돌
      this.x = wall.left + this.r;
      if (this.vx < 0) this.vx *= -1;
    }
    if (this.x + this.r > wall.right) {
      //오른쪽 벽과 충돌
      this.x = wall.right - this.r;
      if (this.vx > 0) this.vx *= -1;
    }
    if (this.y - this.r < wall.top) {
      //위쪽 벽과 충돌
      this.y = wall.top + this.r;
      if (this.vy < 0) this.vy *= -1;
    }
    if (this.y + this.r > wall.bottom) {
      this.y = wall.bottom - this.r;
      if (this.vy > 0) this.vy *= -1;
    }
    return this;
  },
};

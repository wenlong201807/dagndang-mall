// 获取 Canvas 元素和上下文
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// 定义游戏状态变量
let gameOver = false;
let score = 0;

// 定义飞机、子弹和敌机的初始状态
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let bulletSpeed = 10;
let bullets = [];
let enemySpeed = 5;
let enemies = [];

// 监听键盘事件，控制飞机移动和发射子弹
document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowLeft' && playerX > 0) {
    playerX -= 10;
  } else if (event.code === 'ArrowRight' && playerX < canvas.width - 50) {
    playerX += 10;
  } else if (event.code === 'Space') {
    bullets.push({ x: playerX + 25, y: playerY, width: 2, height: 10 });
  }
});

// 定义绘制函数
function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制玩家飞机
  ctx.fillStyle = 'blue';
  ctx.fillRect(playerX, playerY, 50, 50);

  // 绘制子弹
  ctx.fillStyle = 'red';
  for (let i = 0; i < bullets.length; i++) {
    ctx.fillRect(
      bullets[i].x,
      bullets[i].y,
      bullets[i].width,
      bullets[i].height
    );
    bullets[i].y -= bulletSpeed;
  }

  // 绘制敌机
  ctx.fillStyle = 'green';
  for (let i = 0; i < enemies.length; i++) {
    ctx.fillRect(enemies[i].x, enemies[i].y, 50, 50);
    enemies[i].y += enemySpeed;
  }

  // 检测子弹和敌机的碰撞
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (
        bullets[i].x < enemies[j].x + 50 &&
        bullets[i].x + 2 > enemies[j].x &&
        bullets[i].y < enemies[j].y + 50 &&
        bullets[i].y + 10 > enemies[j].y
      ) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score++;
      }
    }
  }

  // 检测敌机和玩家飞机的碰撞
  for (let i = 0; i < enemies.length; i++) {
    if (
      enemies[i].x < playerX + 50 &&
      enemies[i].x + 50 > playerX &&
      enemies[i].y < playerY + 50 &&
      enemies[i].y + 50 > playerY
    ) {
      gameOver = true;
    }
  }

  // 更新游戏状态
  if (!gameOver) {
    requestAnimationFrame(draw);
  } else {
    alert(`游戏结束，得分为 ${score} 分`);
  }
}

draw()
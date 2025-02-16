const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player, target, scoreText, score = 0;

function preload() {
    this.load.image('target', 'assets/target.png');  // Load your target image
    this.load.image('ball', 'assets/ball.png');  // Load the ball image
}

function create() {
    target = this.physics.add.sprite(400, 100, 'target').setScale(0.5);
    target.setVelocityX(150);
    target.setCollideWorldBounds(true);
    target.setBounce(1);

    this.input.on('pointerdown', shootBall, this);

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px', fill: '#fff' });
}

function shootBall(pointer) {
    let ball = this.physics.add.sprite(400, 550, 'ball').setScale(0.2);
    this.physics.moveTo(ball, pointer.x, pointer.y, 300);

    this.physics.add.collider(ball, target, function(ball, target) {
        ball.destroy();
        score++;
        scoreText.setText('Score: ' + score);

        if (score >= 6) {
            gameOver();
        }
    });
}

function gameOver() {
    this.add.text(300, 250, 'You Win!', { fontSize: '48px', fill: '#fff' });
    this.input.off('pointerdown', shootBall);
}

function update() {}

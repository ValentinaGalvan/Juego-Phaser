var player;
var corazon;
var bombs;
var pocion;
var cursors;
var score;
var gameOver;
var scoreText;
var scoreTime;
var scoreTimeText;
var timedEvent;
export class nivel3 extends Phaser.Scene {

    
    constructor() {
      super("nivel3");
      
    }
    init(data) {
        score = data.score;
    }
    preload() {
        this.load.tilemapTiledJSON("map3", "assets/tilemaps/nivel3.json");
        this.load.image("fondo", "assets/imagenes/sky.png");
        this.load.image(
          "plataform","assets/imagenes/spritesheet.png"
        );
    }
    onSecond() {
        if (! gameOver)
        {       

            scoreTime = scoreTime - 1; // One second
            scoreTimeText.setText('Tiempo: ' + scoreTime);
            if (scoreTime == 0) {
                timedEvent.paused = true;
                this.scene.start(
                  "retry",
                  { score: score } // se pasa el puntaje como dato a la escena RETRY
                );
         }            
        }
      }

  create() {
    scoreTime = 120

    timedEvent = this.time.addEvent({ 
      delay: 1000, 
      callback: this.onSecond, 
      callbackScope: this, 
      loop: true 
    });

    const map = this.make.tilemap({ key: "map3" });

    const tilesetBelow = map.addTilesetImage("sky", "fondo");
    const tilesetplatform = map.addTilesetImage(
      "spritesheet",
      "platform"
    );

    const belowLayer = map.createLayer("fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("plataformas", tilesetplatform, 0, 0);
    const objectsLayer = map.getObjectLayer("objetos");

    worldLayer.setCollisionByProperty({ collides: true });
    if (typeof worldLayer !== 'undefined') {;
    }

    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "dude");

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    player.setBounce(0);
    player.setCollideWorldBounds(true);

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }
    corazon = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "corazon": {
          var star = corazon.create(x, y, "corazon");
          star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
      }
    });


  pocion = this.physics.add.group();
  objectsLayer.objects.forEach((objData) => {
    const { x = 0, y = 0, name, type } = objData;
    switch (type) {
      case "pocion": {
        var pocionstar = pocion.create(x, y, "pocion");
        pocionstar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        break;
      }
    }
  });

  bombs = this.physics.add.group();
  objectsLayer.objects.forEach((objData) => {
    const { x = 0, y = 0, name, type } = objData;
    switch (type) {
      case "bomb": {
        var bomb = bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
      }
    }
  });
   
    scoreText = this.add.text(30, 6, "Score:" + score, {
        fontSize: "32px",
        fill: "#FFFFFF",
    });
    scoreTimeText = this.add.text(500, 6, "Tiempo :" + score, {
        fontSize: "32px",
        fill: "#000",
    });

    this.physics.add.collider(player, worldLayer);
    
    this.physics.add.collider(corazon, worldLayer);
    this.physics.add.collider(pocion, worldLayer);
    this.physics.add.collider(bombs, worldLayer);

    this.physics.add.overlap(player, corazon, this.collectcorazon, null, this);
     this.physics.add.overlap(player, pocion, this.collectpocion, null, this);
     this.physics.add.collider(player, bombs, this.hitbomb, null, this);

    gameOver = false;
}


update() {
    if (score == "395") {
        setTimeout(() => {
            this.scene.start("victory", { score: score });
           }, 1000);
    }
   
  
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
  
        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
  
        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);
  
        player.anims.play("turn");
    }
  
    if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
    }
}

collectcorazon(_player, corazon) {
    corazon.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
}

collectpocion(_player, pocion) {
    pocion.disableBody(true, true);
    score += 15;
    scoreText.setText("Score: " + score);
}   
hitbomb(player, _bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;

    setTimeout(() => {
      this.scene.start("retry", { score: score });
    }, 1000);
}

}
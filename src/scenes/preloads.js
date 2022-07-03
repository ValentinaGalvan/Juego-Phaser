export class Preloads extends Phaser.Scene {
    constructor() {
      // key
      super("Preloads");
    }
  
    preload() {
      this.load.image("logo", "assets/imagenes/logo.png");
      this.load.image("mainmenu", "assets/imagenes/mainmenu.png");
      this.load.image("sky", "assets/imagenes/sky.png");
      this.load.image("bomb", "assets/imagenes/bomb.png");
      this.load.image("corazon", "assets/imagenes/corazon.png");
      this.load.image("pocion", "assets/imagenes/pocion.png");
      this.load.image("victory", "assets/imagenes/victory.png");
      this.load.image("gameover", "assets/imagenes/gameover.png");
      this.load.spritesheet("dude", "assets/imagenes/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });
    }
  
    create() {
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });
  
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.scene.start("MainMenu");
    }
  }
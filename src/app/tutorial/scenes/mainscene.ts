import { Ranger } from "../game-objects/ranger";
import { TouchControls } from "../game-objects/touchcontrols";

export class MainScene extends Phaser.Scene {

  private _ranger: Ranger;
  private _touchControls: TouchControls;
  private _platforms: Phaser.Physics.Arcade.StaticGroup;
  private _stars: Phaser.Physics.Arcade.Group;
  private _bombs: Phaser.Physics.Arcade.Group;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;  
  private _scoreText: Phaser.GameObjects.Text;
  private _gameOverText: Phaser.GameObjects.Text;
  private _score: integer = 0;
  private _gameOver: boolean = false;

  constructor() {
    super({ key: 'main' });
    this._ranger = new Ranger(this, 100, 450);
    this._touchControls = new TouchControls(this);
  }

  preload() {
    this.load.setBaseURL('tutorial-assets/');
    
    this.load.image('sky', 'sky.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    
    this._ranger.loadAssets();
  }

  create() {
    this._cursors = this.input.keyboard.createCursorKeys();
    this.input.addPointer(1);

    this.add.image(400, 300, 'sky');
    
    this._platforms = this.createPlatforms();    
    this._ranger.createRanger(this._cursors, this._touchControls);
    this._stars = this.createStars();
    this._bombs = this.physics.add.group();

    this.configureCollisions();

    this._scoreText = this.add.text(16, 16, 'Score: ' + this._score, { fontSize: '32px', stroke: '#000', fontFamily: 'Arial' });    
    this._gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '80px', stroke: '#000', fontFamily: 'Arial Black' })
        .setOrigin(0.5) //0 topleft corner, .5 center, 1 bottom right   - this is starting draw point of the object
        .setVisible(false);

    if(this.sys.game.device.os.desktop) {
      this._touchControls.createTouchControls();
    }
  }

  override update() {
    if (this._ranger == null || this._platforms == null) { return; }    

    if(this._gameOver && this._cursors.up.isDown){      
      this.resetGame();
      return;
    } 
    
    this._ranger.onUpdate();
  }

  //game mechanics
  private collectStar(player: Phaser.Physics.Arcade.Sprite, star: any) {
    star.disableBody(true, true);
    this._score += 10;
    this._scoreText.setText('Score: ' + this._score);

    if (this._stars.countActive(true) === 0) {
      //respawn stars
      this._stars.children.iterate(function (child: any) {
        child.enableBody(true, child.x, 0, true, true);
      });

      //set bomb location opposite of player
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var bomb = this._bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  private hitBomb() {
    this.physics.pause();
    this._ranger.sprite.setTint(0xff0000);
    this._ranger.sprite.anims.play('idle');
    this._gameOverText.visible = true;
    this._gameOver = true;
    this.add.text(400, 400, 'Press [Jump] to restart', { fontSize: '18px', stroke: '#000', fontFamily: 'Arial Black' });
  }

  private resetGame() {
    this._gameOver = false;
    this._score = 0;
    this.scene.restart(); 
  }

  //private
  private configureCollisions(): void {
    this.physics.add.collider(this._ranger.sprite, this._platforms);
    this.physics.add.collider(this._stars, this._platforms);

    this.physics.add.overlap(this._ranger.sprite, this._stars, (p: any, s: any) => this.collectStar(p, s), null, this);

    this.physics.add.collider(this._bombs, this._platforms);
    this.physics.add.collider(this._ranger.sprite, this._bombs, this.hitBomb, null, this);    
  }

  private createPlatforms(): Phaser.Physics.Arcade.StaticGroup {
    let platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); //refresh is needed because we scaled it after creating

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    return platforms;
  }

  private createStars(): Phaser.Physics.Arcade.Group {
    let stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate((child: any) => {
      child.setScale(.25).refreshBody();
      child.body.setGravityY(500);
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });

    return stars;
  }  
}

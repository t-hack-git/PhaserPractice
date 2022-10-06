import { TouchControls } from "./touchcontrols";

export class Ranger {

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody|null;

  private _initX: number;
  private _initY: number;
  private _spriteKey: string;
  
  private _scene: Phaser.Scene;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _touchControls: TouchControls;

  constructor(scene: Phaser.Scene, initX: number, initY: number) {
    this._initX = initX;
    this._initY = initY;
    this._spriteKey = 'ranger';
    this._scene = scene;
  }

  public loadAssets() {
    this._scene.load.spritesheet(this._spriteKey, 'ranger.png', { frameWidth: 32, frameHeight: 33 });
  }

  public createRanger(cursors: Phaser.Types.Input.Keyboard.CursorKeys, touchControls: TouchControls) {
      this._cursors = cursors;
      this._touchControls = touchControls;

      this.sprite = this._scene.physics.add.sprite(this._initX, this._initY, this._spriteKey);    
  
      this.sprite.setBounce(0.2);
      this.sprite.setCollideWorldBounds(true);
      this.sprite.body.setGravityY(600);    
      this.sprite.setScale(1.5).refreshBody();
  
      this.sprite.anims.create({
        key: 'left',
        frames: this.sprite.anims.generateFrameNumbers(this._spriteKey, { start: 10, end: 17 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.sprite.anims.create({
        key: 'idle',
        frames: this.sprite.anims.generateFrameNumbers(this._spriteKey, { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
      });
  
      this.sprite.anims.create({
        key: 'right',
        frames: this.sprite.anims.generateFrameNumbers(this._spriteKey, { start: 2, end: 9 }),
        frameRate: 10,
        repeat: -1
      });
    }

    public onUpdate() {
      if (this._cursors.left.isDown || this._touchControls.TouchLeft()) {
        this.sprite.setVelocityX(-180);
        this.sprite.anims.play('left', true);
      }
      else if (this._cursors.right.isDown || this._touchControls.TouchRight()) {
        this.sprite.setVelocityX(180);
        this.sprite.anims.play('right', true);
      }
      else {
        this.sprite.setVelocityX(0);
        this.sprite.anims.play('idle', true);
      }
  
      if ((this._cursors.up.isDown || this._touchControls.TouchJump()) && this.sprite.body.touching.down) {
        this.sprite.setVelocityY(-550);
      }
    }
}
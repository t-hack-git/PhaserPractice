import { BasicTouchControls } from "./touch-controls.basic";

export class UserInputWrapper {

    private _scene: Phaser.Scene;
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _touchControls: BasicTouchControls;

    public isTouch: boolean = false;

    constructor(scene: Phaser.Scene) {        
        this._scene = scene;
        this._touchControls = new BasicTouchControls(scene);
    }

    addControls() {
        this._cursors = this._scene.input.keyboard.createCursorKeys();        

        if(!this._scene.sys.game.device.os.desktop) {            
            this._touchControls.createTouchControls();  
            this.isTouch = true;          
        }
    }

    keyDownUp(): boolean {
        if(this.isTouch){
            return this._touchControls.TouchUp();
        } else {
            return this._cursors.up.isDown;
        }        
    }

    keyDownLeft(): boolean {
        if(this.isTouch){
            return this._touchControls.TouchLeft();
        } else {
            return this._cursors.left.isDown;
        }
    }

    keyDownRight(): boolean {
        if(this.isTouch){
            return this._touchControls.TouchRight();
        } else {
            return this._cursors.right.isDown;
        }
    }
}
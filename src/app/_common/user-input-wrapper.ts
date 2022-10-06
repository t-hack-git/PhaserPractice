import { TouchControls } from "./touchcontrols";

export class UserInputWrapper {

    private _scene: Phaser.Scene;
    private _touch: boolean = false;

    //Supported controls
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _touchControls: TouchControls;

    constructor(scene: Phaser.Scene) {        
        this._scene = scene;
        this._touchControls = new TouchControls(scene);
    }

    addControls() {
        this._cursors = this._scene.input.keyboard.createCursorKeys();        

        if(!this._scene.sys.game.device.os.desktop) {
            this._scene.input.addPointer(1);
            this._touchControls.createTouchControls();  
            this._touch = true;          
        }
    }

    keyDownUp(): boolean {
        if(this._touch){
            return this._touchControls.TouchUp();
        } else {
            return this._cursors.up.isDown;
        }        
    }

    keyDownLeft(): boolean {
        if(this._touch){
            return this._touchControls.TouchLeft();
        } else {
            return this._cursors.left.isDown;
        }
    }

    keyDownRight(): boolean {
        if(this._touch){
            return this._touchControls.TouchRight();
        } else {
            return this._cursors.right.isDown;
        }
    }
}
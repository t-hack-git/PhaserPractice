export class TouchControls {

    private _scene: Phaser.Scene;
    private _btnRadius: integer = 34;
    private _btnLeftX: integer = 40;
    private _btnRightX: integer = 124;
    private _btnJumpX: integer = 740;

    private _btnLeftY: integer = 555;
    private _btnRightY: integer = 555;
    private _btnJumpY: integer = 555;

    constructor(scene: Phaser.Scene){
        this._scene = scene;
    }

    public createTouchControls(): void {
        this._scene.add.circle(this._btnLeftX, this._btnLeftY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnRightX, this._btnRightY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnJumpX, this._btnJumpY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
    
        this._scene.add.text(22, 528, "<", { fontSize: '50px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(110, 528, ">", { fontSize: '50px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(721, 530, "^", { fontSize: '60px', stroke: '#000', fontFamily: 'Arial Black' });
    }

    public TouchLeft(): boolean {
        let pointer = this._scene.input.activePointer;

        if(pointer.isDown && this.OnButton(pointer.downX, pointer.downY, this._btnLeftX, this._btnLeftY)) {
            return true;
        }
        
        return false;
    }

    public TouchRight(): boolean {
        let pointer = this._scene.input.activePointer;
        if(pointer.isDown && this.OnButton(pointer.downX, pointer.downY, this._btnRightX, this._btnRightY)) {
            return true;
        }
        
        return false;
    }

    public TouchJump(): boolean {
        let pointer = this._scene.input.activePointer;
        if(pointer.isDown && this.OnButton(pointer.downX, pointer.downY, this._btnJumpX, this._btnJumpY)) {
            return true;
        }
        
        return false;
    }

    private OnButton(pointerX: integer, pointerY: integer, btnX: integer, btnY: integer): boolean {
        return pointerX >= (btnX - this._btnRadius) && pointerX <= (btnX + this._btnRadius) &&
            pointerY >= (btnY - this._btnRadius) && pointerY <= (btnY + this._btnRadius);
    }
}
export class TouchControls {

    private _scene: Phaser.Scene;
    private _btnRadius: integer = 34;
    private _btnLeftX: integer = 40;
    private _btnRightX: integer = 174;
    private _btnUpX: integer = 740;

    private _btnLeftY: integer = 555;
    private _btnRightY: integer = 555;
    private _btnUpY: integer = 555;

    constructor(scene: Phaser.Scene){
        this._scene = scene;
    }

    public createTouchControls(): void {
        this._scene.add.circle(this._btnLeftX, this._btnLeftY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnRightX, this._btnRightY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnUpX, this._btnUpY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
    
        this._scene.add.text(22, 528, "<", { fontSize: '50px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(160, 528, ">", { fontSize: '50px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(721, 530, "^", { fontSize: '60px', stroke: '#000', fontFamily: 'Arial Black' });
    }

    public TouchLeft(): boolean {
        let pointer = this._scene.input.pointer1;

        if(pointer.isDown && this.OnButton(pointer.downX, pointer.downY, this._btnLeftX, this._btnLeftY)) {
            return true;
        }
        
        return false;
    }

    public TouchRight(): boolean {
        let pointer = this._scene.input.pointer1;
        if(pointer.isDown && this.OnButton(pointer.downX, pointer.downY, this._btnRightX, this._btnRightY)) {
            return true;
        }
        
        return false;
    }

    public TouchUp(): boolean {
        let pointer = this._scene.input.pointer2;
        if(pointer.isDown && this.OnButton(pointer.downX, pointer.downY, this._btnUpX, this._btnUpY)) {
            return true;
        }
        
        return false;
    }

    //private methods
    private OnButton(pointerX: integer, pointerY: integer, btnX: integer, btnY: integer): boolean {
        return pointerX >= (btnX - this._btnRadius) && pointerX <= (btnX + this._btnRadius) &&
            pointerY >= (btnY - this._btnRadius) && pointerY <= (btnY + this._btnRadius);
    }
}
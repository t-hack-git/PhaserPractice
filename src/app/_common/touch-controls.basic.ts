export class BasicTouchControls {

    private _scene: Phaser.Scene;
    private _btnRadius: integer = 54;
    private _btnLeftX: integer = 60;
    private _btnRightX: integer = 204;
    private _btnUpX: integer = 740;

    private _btnLeftY: integer = 535;
    private _btnRightY: integer = 535;
    private _btnUpY: integer = 535;

    constructor(scene: Phaser.Scene){
        this._scene = scene;
    }

    public createTouchControls(): void {  
        this._scene.input.addPointer(1);
        
        this._scene.add.circle(this._btnLeftX, this._btnLeftY, this._btnRadius, 0x09090, .5).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnRightX, this._btnRightY, this._btnRadius, 0x09090, .5).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnUpX, this._btnUpY, this._btnRadius, 0x09090, .5).setStrokeStyle(2, 0X000);
    
        this._scene.add.text(32, 508, "<", { fontSize: '60px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(190, 508, ">", { fontSize: '60px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(711, 500, "^", { fontSize: '80px', stroke: '#000', fontFamily: 'Arial Black' });
    }

    public TouchLeft(): boolean {
        return this.isButtonPress(InputTargetSide.ScreenLeft, this._btnLeftX, this._btnLeftY);
    }

    public TouchRight(): boolean {
        return this.isButtonPress(InputTargetSide.ScreenLeft, this._btnRightX, this._btnRightY);
    }

    public TouchUp(): boolean {
        return this.isButtonPress(InputTargetSide.ScreenRight, this._btnUpX, this._btnUpY);
    }

    //private methods
    private isButtonPress(inputSide: InputTargetSide, btnX: integer, btnY: integer): boolean {      

        let buffer:integer = 200;
        let p1 = this._scene.input.pointer1;
        let p2 = this._scene.input.pointer2;

        let pointer = null;
        if(inputSide == InputTargetSide.ScreenRight) {
            if(p1.isDown && p1.x >= this._btnUpX - buffer) {
                pointer = p1;
            } 

            if(p2.isDown && p2.x >= this._btnUpX - buffer) {
                pointer = p2;
            }
        } else if(inputSide == InputTargetSide.ScreenLeft) {
            if(p1.isDown && p1.x <= this._btnRightX + this._btnRadius + buffer) {
                pointer = p1;
            } 
            
            if(p2.isDown && p2.x <= this._btnRightX + this._btnRadius + buffer) {
                pointer = p2
            }
        }

        if(pointer) {
            if(this.isPointerOnButton(pointer.x, pointer.downY, btnX, btnY)) {
                return true;
            }
        }
        
        return false;
    }

    private isPointerOnButton(pointerX: integer, pointerY: integer, btnX: integer, btnY: integer): boolean {
        return pointerX >= (btnX - this._btnRadius) && pointerX <= (btnX + this._btnRadius) &&
            pointerY >= (btnY - this._btnRadius) && pointerY <= (btnY + this._btnRadius);
    }
}

enum InputTargetSide {
    ScreenLeft,
    ScreenRight
}
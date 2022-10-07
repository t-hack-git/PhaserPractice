export class BasicTouchControls {

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
        this._scene.input.addPointer(1);
        
        this._scene.add.circle(this._btnLeftX, this._btnLeftY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnRightX, this._btnRightY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
        this._scene.add.circle(this._btnUpX, this._btnUpY, this._btnRadius, 0x09090, 1).setStrokeStyle(2, 0X000);
    
        this._scene.add.text(22, 528, "<", { fontSize: '50px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(160, 528, ">", { fontSize: '50px', stroke: '#000', fontFamily: 'Arial Black' });
        this._scene.add.text(721, 530, "^", { fontSize: '60px', stroke: '#000', fontFamily: 'Arial Black' });
    }

    public TouchLeft(): boolean {
        return this.isButtonPress(InputSide.ScreenLeft, this._btnLeftX, this._btnLeftY);
    }

    public TouchRight(): boolean {
        return this.isButtonPress(InputSide.ScreenLeft, this._btnRightX, this._btnRightY);
    }

    public TouchUp(): boolean {
        return this.isButtonPress(InputSide.ScreenRight, this._btnUpX, this._btnUpY);
    }

    //private methods
    private isButtonPress(inputSide: InputSide, btnX: integer, btnY: integer): boolean {      
        if(this._scene.input.pointer1.isDown || this._scene.input.pointer2.isDown) {            
            let pointer;
            if(inputSide == InputSide.ScreenRight) {
                if(this._scene.input.pointer1.x >= this._btnUpX) {
                    pointer = this._scene.input.pointer1;
                } else {
                    pointer = this._scene.input.pointer2
                }
            } else {
                if(this._scene.input.pointer2.x <= this._btnRightX) {
                    pointer = this._scene.input.pointer2;
                } else {
                    pointer = this._scene.input.pointer1
                }
            }

            if(this.isPointerOnButton(pointer.downX, pointer.downY, btnX, btnY)) {
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

enum InputSide {
    ScreenLeft,
    ScreenRight
}
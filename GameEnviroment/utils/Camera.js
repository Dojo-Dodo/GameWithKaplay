export default function attachCamera(attachedObj, offsetX, fixedY){
    onUpdate(() => {
        camPos(attachedObj.pos.x + offsetX, fixedY)
    })
}

//If we need more function on camera, use it as class
/*
export class Camera {
    attachedObj = null;

    attach(
        gameObj,
        offsetX = 0,
        fixedY
    ){
        this.attachedObj = gameObj;

        ontimeupdate(() => {
            camPos(this.attachedObj.pos.x + offsetX, )
        })
    }
}
*/
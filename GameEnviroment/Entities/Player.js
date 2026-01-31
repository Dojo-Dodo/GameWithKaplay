
export class Player {
    constructor(
        posX,
        posY,
        speed,
        jumpForce,
        nbLives,
        currentLevelScene,
        isInTerminalScene,
        )
        {
            this.isInTerminalScene = isInTerminalScene;
            this.currentLevelScene = currentLevelScene;
            this.initialX = posX;
            this.initialY = posY;
            this.makePlayer();
            this.speed = speed;
            this.jumpForce = jumpForce;
            this.lives = nbLives;
            this.score = 0;
            this.previousHeight = this.gameObj.pos.y;
            this.moveState = "idle";

            this.wireAnimEvents();
            this.installUpdate();
        }

        makePlayer(){
            this.gameObj = add([
                sprite("player", {anim : "idle"}),
                area({ shape: new Rect(vec2(0,3), 100,500)}),
                anchor("center"),
                pos(this.initialX,this.initialY),
                scale(0.6),
                body(),
                "player",
            ]);
        }

    wireAnimEvents() {
        const p = this.gameObj;

        p.onAnimEnd((ended) => {
        if (ended === "runStart" && this.moveState === "runStart") {
            p.play("runLoop");
            this.moveState = "runLoop";
        }
        });
    }

    startRun() {
        if(this.moveState !== "runStart" && this.moveState !== "runLoop" && this.gameObj.isGrounded()){
            this.gameObj.play("runStart");
            this.moveState = "runStart";
        }
    }

    setIdle() {
        if(this.moveState !== "idle" && this.moveState !== "uncrouch" && this.gameObj.isGrounded()){
            this.gameObj.play("idle");
            this.moveState = "idle";
        }
    }

    setCrouch(){
        if(this.moveState !== "crouch" && this.gameObj.isGrounded()){
            this.gameObj.play("crouch");
            this.moveState = "crouch";
        }
    }

    setUncrouch(){
        if(this.moveState === "crouch"){
            this.gameObj.play("uncrouch");
            this.moveState = "uncrouch";
        }
    }

    setJump(){
        if(this.moveState !== "crouch" && this.gameObj.isGrounded()){
            this.gameObj.jump(this.jumpForce);
            this.moveState = "jump";

            this.gameObj.play("idle");
        }
    }

    updateFromInput(){
        if(isKeyDown("down")){
            this.setCrouch();
            return;
        }

        if (this.moveState === "crouch"){
            this.setUncrouch();
        }

        if(isKeyPressed(["space", "up"])){
            this.setJump();
            console.log("Jumping")
        }

        if(isKeyDown("left")){
            this.gameObj.flipX = true;
            this.startRun();
            this.gameObj.move(-this.speed, 0);
        }
        else if(isKeyDown("right")){
            this.gameObj.flipX = false;
            this.startRun();
            this.gameObj.move(this.speed, 0);
        }
        else{
            if(this.gameObj.isGrounded()){
                this.setIdle();
            }
        }
    }

    installUpdate() {
        this.gameObj.onUpdate(() => this.updateFromInput());
    }
}
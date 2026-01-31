export const load = {
    fonts: () => {
        loadFont("Round","./assets/fonts/Round.ttf");
    },
    assets: () => {
        loadSprite("forest-background", "./Assets/Forest_Background.png");
        loadSprite("logo", "./Assets/moco_logo_primary_white_stroke.png");

        loadSprite("forest_tile", "./Assets/forest_tile.png");
        loadSprite("grass_cover_tile", "./Assets/grass_cover_tile.png");
        loadSprite("player", "./Assets/Player_Sprite.png",{
            sliceX : 5,
            sliceY : 4,
            anims : {
                idle: {from:15, to:15, idle: true},
                runStart : {from:0, to: 14, speed: 15},
                runLoop : {from: 0, to: 14, speed: 15, loop:true },
                
                crouch : {from: 15, to: 18, speed: 15},
                uncrouch : {from: 18, to: 15, speed: 15}
                
            }
        });
    }
}
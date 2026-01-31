import kaplay from "kaplay";
import {uiManager} from "../utils/UIManager.js";
import { load } from "../utils/loader.js";
import { Level } from "../utils/Level.js";
import { level1Layout, level1Mappings } from "../content/level1/level1Layout.js";
import { Player } from "../Entities/Player.js"; 
import attachCamera from "../utils/Camera.js";

const k = kaplay({
    width : 2560,
    height: 1440,
    letterbox: true,
    debug: true, //if finished, set to false so the player can't see the debug info
    global: true,
});



load.assets();

const scenes = {
    menu: () => {
        uiManager.displayMainMenu();
    },
    controls: () => {
        uiManager.displayControlMenu();
    },
     1 : () => {
        const level1 = new Level();
        level1.drawBackground();
        level1.drawMapLayout(level1Layout,level1Mappings);
        setGravity(2200);
        const player = new Player(1500,100,1000,1600,3,1,false);
        attachCamera(player.gameObj, 0 , 650);
     },
     2 : () => {
        
     },
     gameover : () => {

     }
};

for (const key in scenes){
    scene(key, scenes[key]);
}

go("menu");
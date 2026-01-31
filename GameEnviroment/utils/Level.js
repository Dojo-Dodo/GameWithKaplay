export class Level {
    drawMapLayout(levelLayout, mappings) {
        const layerSettings = {
        tileWidth: 563,
        tileHeight: 401,
        tiles: mappings,
        };

        this.map = []
        for (const layerLayout of levelLayout) {
            this.map.push(addLevel(layerLayout, layerSettings))
        }

        for (const layer of this.map) {
            layer.use(scale(1))
        }
   }

    drawBackground(){
        const scaleFactor = 2.8;
        const parallaxFactor = 0.1;

        const bg1 = add([
            sprite("forest-background"), pos(0,height()+100),
            anchor("botleft"),
            scale(scaleFactor),
            z(-10),
        ])

        const bg2 = add([
            sprite("forest-background"), pos(0,height()+100),
            anchor("botleft"),
            scale(scaleFactor),
            z(-10),
        ])

        onUpdate(() =>{
            // get camera position
            const currentCam = camPos();

            const bgWidth = bg1.width * scaleFactor;

            const drift = currentCam.x * (1 - parallaxFactor);

            const loopOffset = drift % bgWidth;
            //const scrollIndex = Math.floor(drift / bgWidth);
            
            //const basePos = scrollIndex * bgWidth;
            bg1.pos.x = currentCam.x - loopOffset;
            bg2.pos.x = bgWidth + currentCam.x - loopOffset;

            if(loopOffset < 0 ){
                bg1.pos.x -= bgWidth;
                bg2.pos.x -= bgWidth;
            }
        });
    }
}
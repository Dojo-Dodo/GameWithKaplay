class UIManager {
    displayMainMenu() {
        const bg = add([sprite("forest-background"), pos(0,0),
            scale(2.8), z(-10)
        ]);
        add([
            sprite("logo"),
            area(),
            anchor("center"),
            pos(center().x, center().y),
            scale(0.75),
        ]);

        this.displayBlinkingUIMessage(
            "Press {Enter} to start game"
            ,vec2(center().x, center().y +200)
        );

       

        onKeyPress("enter", () => go("controls"));
    }
    displayBlinkingUIMessage(content, position){
        const message = add([
            text(content, {
                size: 36,
                font: "Round"
            }),
            area(),
            anchor("center"),
            pos(position),
            opacity(),
            state("flash-up", ["flash-up", "flash-down"]),
        ])

        message.onStateEnter("flash-up", async () => {
            await tween(
                message.opacity,
                1, // target opacity
                1, // duration in seconds
                (nextOpacityValue) => message.opacity = nextOpacityValue, // update function
                easings.linear
            );
            message.enterState("flash-down");
        });

        message.onStateEnter("flash-down", async () => {
            await tween(
                message.opacity, // from current (0)
                0,               // to
                1,             // seconds
                v => (message.opacity = v),
                easings.linear
            );
        message.enterState("flash-up");
        });
    }

    displayControlMenu() {
        add([
            sprite("forest-background"), pos(0,0),
            scale(2.8),
        ]);
        add([
            text("Controls", {size: 48, font: "Round"}),
            area(),
            anchor("center"),
            pos(center().x, center().y - 200),
        ]);

        const controlPrompts = add([
            pos(center().x +30, center().y - 50)
        ])

        onKeyPress("enter", () => go("1"));0
    }

}




export const uiManager = new UIManager();
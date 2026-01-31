export function generateMappings() {
  return {
    '0': () => [
      sprite('forest_tile'),
      area({ shape: new Rect(vec2(0, 80), 563, 401 - 80) }),
      body({ isStatic: true }),
      offscreen( {hide: true}),
      z(0),

      {
        id: 'spawn-grass-overlay',
        require: ['pos', 'z'],
        add() {
          this.__overlay = add([
            sprite('grass_cover_tile'),
            pos(this.pos.clone()),
            z(this.z + 2),
            offscreen(),
            opacity(1), // was "opasity"
          ]);
        },
        update() {
          // keep overlay glued to the base tile if it moves/scales
          if (this.__overlay) this.__overlay.pos = this.pos;
        },
        destroy() {
          this.__overlay?.destroy();
        },
      },
    ],
  };
}
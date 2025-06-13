/*
 * Asteroid spawn system
 */

import { App } from "app";
import { ecs } from "ecs";
import { entity } from "entity";
import { shapes } from "generation/shapes";
import { math } from "math/random";
import { rect } from "physics/rect";
import { vec2 } from "physics/vector";
import { sprites } from "sprites";
import { color } from "visual/color";

let spawnChance = 0.00004;

const asteroidimg = new Image()
asteroidimg.src = "/img/noisemaps/asteroid.png"


export function run() {
	const num = math.rndf(0, 100)
	// Asteroids should spawn off screen
	if (num < (100 * spawnChance)) {
		const viewport = App.getCanvasRect()
		const scale = vec2.scale(vec2.unit(), math.rnd(10, 30))

		const speed = vec2.make(700, 0)

		const spawnRect = rect.shift(viewport, vec2.make(viewport.width + 20, 0))
		const translation = rect.randomPointWithin(spawnRect)

		let e = entity.makeDrawable({
			// Spawn just off screen
			translation,
			speed,
			color: color.make(255, 162, 0, 1),
			scale,
			sprite: sprites.asteroid.random(),
			distance: math.rnd(40, 80),
			renderLayer: 4
		})

		ecs.get().trail.set(e, { color: color.make(255, 152, 0, 1) })
	}
}

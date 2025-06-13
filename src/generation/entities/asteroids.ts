import { entity } from "entity"
import { shapes } from "generation/shapes"
import { math } from "math/random"
import { Rect, rect } from "physics/rect"
import { vec2, Vector2 } from "physics/vector"
import { sprites } from "sprites"
import { color } from "visual/color"


// TODO: Fix this

export function makeAsteroid(within: Rect, maxRoughness: number, speed: Vector2) {
	const roughness = math.rnd(1, maxRoughness)
	const scale = vec2.scale(vec2.unit(), math.rnd(40, 100))

	const rl = math.rnd(1, 4)

	entity.makeDrawable({
		translation: rect.randomPointWithin(within),
		speed,
		color: color.make(100, 70, 0, 1),
		scale,
		distance: math.rnd(4, 100),
		renderLayer: rl,
		sprite: sprites.asteroid.random(),
	})

}

export function makeAsteroids(within: Rect, count: number) {
	for (let i = 0; i < count; i++) {
		makeAsteroid(within, 5, vec2.make(10, 0))
	}
}

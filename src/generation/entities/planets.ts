import { ecs } from "ecs";
import { glow } from "ecs/components/glow";
import { entity } from "entity";
import { noise } from "generation/noise";
import { shapes } from "generation/shapes";
import { math } from "math/random";
import { rect, Rect } from "physics/rect";
import { vec2, Vector2 } from "physics/vector";
import { sprites } from "sprites";
import { stats } from "stats";
import { color } from "visual/color";

type Planet = {
	radius: number,
	points: Vector2[],
	dimensions: Vector2,
	translation: Vector2,
}

export function makePlanet(bounds: Rect, scaleFactor?: number) {

	scaleFactor = scaleFactor ?? math.rnd(100, 600)

	let circle = shapes.circle(0)

	const distance = math.rnd(1, 100)
	const col = color.random()

	const e = entity.makeDrawable({
		translation: bounds.pos,
		sprite: sprites.planet.random(),
		distance,
		scale: vec2.make(scaleFactor, scaleFactor),
		color: col,
		speed: vec2.make(1, 0),
		renderLayer: 2
	})

	ecs.get().glow.set(e, glow.make(2, col))

	stats.incrementPlanetCount()
}

// Makes a planet cluster
export function makePlanetsWithin(r: Rect, maxAmount: number = 1) {
	let amt = math.rnd(1, maxAmount)

	for (let i = 0; i < amt; i++) {
		makePlanet(rect.randomRectInside(r))
	}
}

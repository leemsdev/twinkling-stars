import { ecs } from "ecs";
import { twinkle } from "ecs/components/twinkle";
import { entity } from "entity";
import { math } from "math/random";
import { rect, Rect } from "physics/rect";
import { vec2, Vector2 } from "physics/vector";
import { color, Color } from "visual/color";
import { stats } from "stats";
import { shapes } from "generation/shapes";
import { sprites } from "sprites";
import { glow } from "ecs/components/glow";

// Small chance to generate a star with a non-white color
function randomColor(): Color {
	const res = math.rnd(0, 100)

	if (res < 30) {
		return color.random()
	}

	return color.white()
}

function randomScale() {
	let smoothf = math.rndf(0.006, 0.04)
	const sf = math.rnd(0, 100) * smoothf

	const scaleVector = vec2.make(sf, sf)

	return scaleVector
}

export function makeStar(within: Rect, speed?: Vector2, color?: Color, scale?: Vector2, renderLayer = 1) {

	speed = speed ?? vec2.zero()
	color = color ?? randomColor()
	scale = scale ?? randomScale()

	let e = entity.makeDrawable({
		scale: scale,
		translation: rect.randomPointWithin(within),
		color,
		speed,
		sprite: sprites.star.random(),
		distance: 1,
		renderLayer
	})

	const twinkleSpeedDownScale = Math.random() * Math.random()
	const twinkleSpeed = math.rnd(1, 5) * twinkleSpeedDownScale
	ecs.get().twinkle.set(e, twinkle.make(twinkleSpeed));

	stats.incrementStarCount()

	const rglow = math.rnd(0, 1000)

	if (rglow < 3) {
		const intensity = math.rnd(1, 100) * 0.02
		ecs.get().glow.set(e, glow.make(intensity, color))
	}


	return e
}

/**
 * Distribute stars along a given line.
* TODO: Finish this.
 */
export function distributeStarsAlong(points: Vector2[], color: Color, translation: Vector2, spread: number = 10, maxPerPoint: number = 8) {
	for (let i = 0; i < points.length; i++) {

		let pt = vec2.add(points[i], translation)

		pt.x += spread * i

		console.log(pt.x)

		// make rect
		let r = rect.centredOn(pt, 10, 10)

		let numToCreate = math.rnd(1, maxPerPoint);

		// generate star on line first
		makeStars(r, numToCreate)
	}
}

export function makeStars(within: Rect, count: number) {
	for (let i = 0; i < count; i++) {
		makeStar(within)
	}
}

export function makeCluster(bounds: Rect) {
	const numStars = math.rnd(10, 40)

	makeStars(bounds, numStars)
}



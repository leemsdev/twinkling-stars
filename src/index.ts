import { App } from "app";
import { ecs } from "ecs";
import { glow } from "ecs/components/glow";
import { sprite } from "ecs/components/sprite";
import { twinkle } from "ecs/components/twinkle";
import { systems } from "ecs/systems";
import { entity } from "entity";
import { gen } from "generation";
import { makePlanet } from "generation/entities/planets";
import { distributeStarsAlong, makeStar } from "generation/entities/stars";
import { noise } from "generation/noise";
import { shapes } from "generation/shapes";
import { math } from "math/random";
import { rect } from "physics/rect";
import { vec2 } from "physics/vector";
import { sprites } from "sprites";
import { stats } from "stats";
import { color } from "visual/color";

// Spawns a single planet for testing
function planetTest() {
	const scale = vec2.make(200, 200)

	const r = App.getCanvasRect()

	const col = color.random()

	const e = entity.makeDrawable({
		translation: vec2.make(r.width / 2.1, r.height / 2.1),
		scale,
		sprite: sprites.planet.random(),
		distance: 1,
		speed: vec2.zero(),
		color: col,
		renderLayer: 4
	})

	ecs.get().glow.set(e, glow.make(6, col))


	return e

}

function asteroidTest() {
	const roughness = math.rnd(2, 9)
	const asteroid = shapes.circle(roughness)
	const viewport = App.getCanvasRect()

	const speed = vec2.make(200, 0)

	const spawnRect = rect.shift(viewport, vec2.make(viewport.width + 20, 0))

	const scale = vec2.make(100, 100)

	let e = entity.makeDrawable({
		translation: vec2.make(400, 400),
		speed: vec2.zero(),
		color: color.white(),
		scale,
		sprite: sprites.asteroid.random(),
		distance: 4,
		renderLayer: 4
	})


	ecs.get().trail.set(e, { color: color.make(255, 162, 0, 1) })


}

function nebulaTest() {
	const points = shapes.wave(50, 20, 30)


	distributeStarsAlong(points, color.make(140, 209, 8, 1), vec2.make(400, 400), 10)
}

function starTest() {
	const e = entity.makeDrawable({
		translation: vec2.make(400, 400),
		speed: vec2.zero(),
		color: color.white(),
		scale: vec2.make(5, 5),
		sprite: sprites.star.random(),
		distance: 4,
		renderLayer: 1,
	})

	ecs.get().glow.set(e, glow.make(4, color.white()))
	ecs.get().twinkle.set(e, twinkle.make(2))
}

function makebglayers(): HTMLImageElement[] {
	const r = App.getCanvasRect()
	//	const l1 = noise.makeImg(r.width, r.height, color.make(128, 0, 128, 1), 0.001)
	//	const l2 = noise.makeImg(r.width, r.height, color.make(0, 255, 0, 1), 0.0005)
	//	const l3 = noise.makeImg(r.width, r.height, color.make(0, 0, 255, 1), 0.001)
	//	const l4 = noise.makeImg(r.width, r.height, color.make(255, 0, 0, 1), 0.0002)

	const a1 = math.rndf(0.3, 0.5)
	const a2 = math.rndf(0.3, 0.5)
	const a3 = math.rndf(0.3, 0.5)
	const a4 = math.rndf(0.3, 0.5)

	const l1 = noise.makeImg(r.width, r.height, color.makeFrom(color.random(), { a: a1 }), 0.001)
	const l2 = noise.makeImg(r.width, r.height, color.makeFrom(color.random(), { a: a2 }), 0.0005)
	const l3 = noise.makeImg(r.width, r.height, color.makeFrom(color.random(), { a: a3 }), 0.001)
	const l4 = noise.makeImg(r.width, r.height, color.makeFrom(color.random(), { a: a4 }), 0.0002)


	return [l1, l2, l3, l4]
}

function drawBgLayers(layers: HTMLImageElement[]) {
	const { ctx } = App.get()

	for (const l of layers) {
		ctx.beginPath()
		ctx.drawImage(l, 0, 0)
		ctx.closePath()
	}

}

function baseState() {
	ecs.clear();
	stats.clear();
	// planetTest()
	gen.sky(App.getCanvasRect())
	//asteroidTest()
	//nebulaTest()
	//starTest()
}

function main() {
	App.setup()

	let bg = makebglayers()

	window.addEventListener("keypress", (e) => {
		if (e.key == ' ') {
			baseState()
		}
	})


	baseState()



	setInterval(() => {
		App.syncCanvas()
		App.syncDeltaTime()

		drawBgLayers(bg)
		stats.render()
		systems.run()
	}, 16)
}

main()

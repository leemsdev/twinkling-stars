import { Sprite } from "ecs/components/sprite";
import { shapes } from "generation/shapes";
import { math } from "math/random";

const asteroidimg = new Image()
asteroidimg.src = "/img/noisemaps/asteroid.png"


export function randomAsteroid(): Sprite {
	const roughness = math.rnd(1, 3)
	const asteroid = shapes.circle(roughness)

	return {
		drawMode: 'fill',
		img: {
			ref: asteroidimg,
			mask: true,
		},
		...asteroid,
	}
}

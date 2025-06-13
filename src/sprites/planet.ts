import { Sprite } from "ecs/components/sprite";
import { shapes } from "generation/shapes";
import { math } from "math/random";
import { Vector2 } from "physics/vector";

const num_maps = 40;

const loadNoiseMaps = (): HTMLImageElement[] => {
	let imgs = []

	for (let i = 0; i < num_maps; i++) {
		let img = new Image()

		img.src = `/img/noisemaps/noise_${i}.png`

		imgs.push(img)
	}

	return imgs
}

const noisemaps = loadNoiseMaps()

// TODO: Make this planet specific. Sort images folder too.
// TODO: Also out of bounds checking
function randomImage(): HTMLImageElement {
	const i = math.rnd(0, 9)

	return noisemaps[i]
}

export function randomSprite(): Sprite {
	const circle = shapes.circle(0)
	return {
		img: {
			mask: true,
			ref: randomImage()
		},
		drawMode: 'fill',
		...circle,
	}
}

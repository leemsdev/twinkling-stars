import { createNoise2D } from "simplex-noise";
import { Color, color } from "visual/color";

import alea from 'alea';
import { shapes } from "./shapes";
import { math } from "math/random";

const getNF = () => {
	let prng = alea()
	return createNoise2D(prng)
}

function fbm(x: number, y: number, f: (x: number, y: number) => number, octaves = 4, persistence = 0.5) {
	let total = 0
	let amplitude = 1
	let frequency = 1
	let maxValue = 0

	for (let i = 0; i < octaves; i++) {
		total += f(x * frequency, y * frequency) * amplitude
		maxValue += amplitude
		amplitude *= persistence
		frequency *= 2
	}

	return total / maxValue
}



function makeImg(w: number, h: number, col: Color, sf: number = 0.001, step: number = 6): HTMLImageElement {
	const fnoise = getNF()

	const tempCanvas = document.createElement("canvas") as HTMLCanvasElement

	tempCanvas.width = w
	tempCanvas.height = h

	const ctx = tempCanvas.getContext("2d")

	if (!ctx) throw new Error("Couldn't create temp canvas to gen noise")

	// optional: clear canvas to transparent
	ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

	const ba = math.rndf(0.2, 0.3)

	for (let x = 0; x < w; x += step) {
		for (let y = 0; y < h; y += step) {
			const n = fnoise(x * sf, y * sf)
			//const n = fbm((x + math.rndf(-step, step)) * sf, (y + math.rndf(-step, step)) * sf, fnoise, 4, 0.6)

			const ca = color.multiply(col, ba)
			ca.a *= n

			if (n < 0.1) continue

			if (n > 0.8) {
				ca.a + 0.4
			}

			ctx.fillStyle = color.rgba(ca)

			ctx.fillRect(x, y, step, step)
		}
	}

	const img = new Image();
	img.src = tempCanvas.toDataURL();

	return img

}

export const noise = {
	makeImg
}


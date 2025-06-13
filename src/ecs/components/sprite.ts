import { Vector2 } from "physics/vector"

export type Img = {
	ref: HTMLImageElement,
	mask: boolean
}

// Describes how to draw the sprite.
export type Sprite = {
	points: Vector2[],
	drawMode: 'stroke' | 'fill',
	img?: Img,
	size: Vector2
}

function make(points: Vector2[], drawMode: 'stroke' | 'fill', size: Vector2, img?: Img): Sprite {
	return {
		points,
		drawMode,
		img,
		size
	}
}

export const sprite = {
	make,
}

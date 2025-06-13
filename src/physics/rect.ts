import { math } from "math/random"
import { vec2, Vector2 } from "./vector"

export type Rect = {
	pos: Vector2,
	width: number,
	height: number,
}

function make(pos: Vector2, width: number, height: number): Rect {
	return {
		pos,
		width,
		height
	}
}

function randomPointWithin(r: Rect): Vector2 {
	const x = math.rnd(r.pos.x, r.pos.x + r.width)
	const y = math.rnd(r.pos.y, r.pos.y + r.height)

	return vec2.make(x, y)
}

function randomRectInside(r: Rect): Rect {
	const xy = randomPointWithin(r)

	// We need a random point between the random x
	// val we just generated and the edge of the outer rect
	const w = math.rnd(xy.x, xy.x + r.width)
	const h = math.rnd(xy.y, xy.y + r.height)

	return {
		pos: xy,
		width: w,
		height: h
	}
}

/**
* Returns a rect with the given centre point and dimensions
*/
function boundary(centre: Vector2, dimensions: Vector2): Rect {
	const pos = vec2.subtract(centre, vec2.make(dimensions.x / 2, dimensions.y / 2))

	return {
		pos,
		width: dimensions.x,
		height: dimensions.y
	}
}

// Returns the actual value of the right edge
function rightEdge(r1: Rect): number {
	return r1.pos.x + r1.width;
}

function bottomEdge(r1: Rect): number {
	return r1.pos.y + r1.height;
}

function contains(outer: Rect, inner: Rect): boolean {
	// Right edge of inner *must* be larger than the left edge of outer
	const reOk = rightEdge(inner) > outer.pos.x;

	// Bottom edge of inner must be larger than the top edge of the outer
	const beOk = bottomEdge(inner) > outer.pos.y;

	// Top edge of inner must be smaller than the bottom edge of the outer
	const teOk = inner.pos.y < bottomEdge(outer)

	// Left edge of inner must be smaller than the right edge of the outer
	const leOk = inner.pos.x < rightEdge(outer)

	return reOk && beOk && teOk && leOk;
}

function scale(r: Rect, n: number): Rect {
	let new_w = r.width * n
	let new_h = r.height * n

	return {
		pos: r.pos,
		width: new_w,
		height: new_h
	}
}

function shift(r: Rect, shiftVector: Vector2) {
	const newPos = vec2.add(r.pos, shiftVector)

	return rect.make(newPos, r.width, r.height)
}

// Create a rectangle with the given point as its centre
function centredOn(p: Vector2, w: number, h: number) {
	const r = rect.make(p, w, h)

	return boundary(r.pos, { x: r.width, y: r.height })
}

export const rect = {
	make,
	randomPointWithin,
	randomRectInside,
	scale,
	boundary,
	contains,
	shift,
	centredOn
}


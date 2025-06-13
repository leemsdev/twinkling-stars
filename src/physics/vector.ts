export type Vector2 = {
	x: number,
	y: number,
}

function make(x: number, y: number) {
	return { x, y }
}

function add(v1: Vector2, v2: Vector2): Vector2 {
	return {
		x: v1.x + v2.x,
		y: v1.y + v2.y
	}
}

function scale(v1: Vector2, factor: number): Vector2 {
	return {
		x: v1.x * factor,
		y: v1.y * factor
	}
}

function multiply(v1: Vector2, v2: Vector2): Vector2 {
	return {
		x: v1.x * v2.x,
		y: v1.y * v2.y
	}
}

function distance(v1: Vector2, v2: Vector2): number {
	const dx = v1.x - v2.x;
	const dy = v1.y - v2.y;

	const distance = Math.sqrt((dx * dx) + (dy * dy))

	return distance
}

function subtract(v1: Vector2, v2: Vector2): Vector2 {
	return {
		x: v1.x - v2.x,
		y: v1.y - v2.y
	}
}

function unit(): Vector2 {
	return make(1, 1)
}

function rotate(v: Vector2, theta: number): Vector2 {
	let x = (v.x * Math.cos(theta)) - (v.y * Math.sin(theta))
	let y = (v.x * Math.sin(theta)) + (v.y * Math.cos(theta))

	return make(x, y)
}

export const vec2 = {
	make,
	add,
	scale,
	distance,
	// don't return the literal object as that creates shared references and 
	// very hard to debug issues
	zero: () => make(0, 0),
	subtract,
	multiply,
	unit,
	rotate
}

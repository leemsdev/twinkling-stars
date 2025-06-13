/*
 * Functions for generating different kinds of circles
 * & working with the unit circle
 */

import { vec2, Vector2 } from "physics/vector"

// Returns a point on the circumference of the unit circle
function pointOnUnitCircle(theta: number): Vector2 {
	const x = Math.cos(theta)
	const y = Math.sin(theta)

	return vec2.make(x, y)
}

// Converts an angle to a point on the unit circle
// then scales by the radius to give the cartesian point
function pointOnCircle(theta: number, radius: number): Vector2 {
	return vec2.scale(pointOnUnitCircle(theta), radius)
}

function makeShape(edges: number, radius: number): Vector2[] {
	let angleStep = (Math.PI * 2) / edges;
	let points: Vector2[] = []

	for (let i = 0; i < edges; i++) {
		let point = pointOnCircle(i * angleStep, radius)
		points.push(point)
	}

	// close the circle
	points.push(points[0])

	return points
}

export const Circle = {
	pointOnUnitCircle,
	pointOnCircle,
	makeShape
}

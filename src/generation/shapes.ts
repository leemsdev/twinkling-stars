import { Circle } from "math/circle";
import { math } from "math/random";
import { vec2, Vector2 } from "physics/vector";

function star(spikes: number = 5) {
	const points: Vector2[] = []
	const angleStep = (Math.PI * 2) / spikes;

	for (let i = 0; i < spikes; i++) {
		const theta = angleStep * i;

		const x = Math.cos(theta)
		const y = Math.sin(theta)

		points.push(vec2.make(x, y))
		points.push(vec2.make(0, 0))
	}

	return points

}

// Roughness level of 0 gives a perfect circle.
function circle(roughness: number = 0) {
	let edges = 50
	let smoothedEdges = edges - (10 * roughness)
	let angleStep = (Math.PI * 2) / smoothedEdges;

	// For completely smooth circles, we want these two values to be the same.
	let minScale = 10 - (1 * roughness)
	let maxScale = 10 + (1 * roughness)

	// The radius is equal to the distance between the furthest point on the circumference
	// from the centre. 
	// i.e. our planets are not perfect circles, and certain points on the cirumference
	// will be further away from the centre than other points.
	// To ensure we can fit a bounding box around all of the circle, we need to set the radius to
	// the point on the circumference that is the furthest away from the centre.
	let radius = 0;
	let points: Vector2[] = []

	let centre = vec2.zero()

	for (let i = 0; i < edges; i++) {
		let scale = math.rnd(minScale, maxScale);

		// normalise the scale to be between 0 and 1
		scale = scale / 10

		let point = Circle.pointOnCircle(i * angleStep, scale)

		radius = Math.max(radius, vec2.distance(centre, point))

		points.push(point)
	}

	points.push(points[0]) // close the circle


	// multiplying the radius by 2 gives us a box that fits the circle
	let size = vec2.make(radius * 2, radius * 2)

	return {
		radius,
		points,
		size,
	}

}

function teardrop(width: number, length: number, rotation: number, steps: number = 10) {
	let initial = Math.PI / 2;

	width /= 10
	length /= 2

	let stepSize = ((5 * Math.PI) / 2 - (Math.PI / 2)) / steps;

	let points: Vector2[] = []

	for (let i = 0; i < steps; i++) {
		let t = (i * stepSize) + initial;

		let x = 2 * width * Math.cos(t) - width * Math.sin(2 * t)
		let y = length * Math.sin(t)

		let p: Vector2 = { x, y }

		p = vec2.rotate(p, rotation)

		points.push(p)
	}

	points.push(points[0])

	return points
}

// Generates a nice wavy line using the below function
// f(x) = sin(xn^2) * cos(x^2) * 1/m 
// n = frequency
// m = height
function wave(pcount: number, freq: number, height: number): Vector2[] {
	let points = []

	// Height needs to be smaller than one. Rather than require that in the arg
	// we can just do the calc here

	if (height == 0) {
		// this is invalid
		return []
	}

	height = 1 / height

	const f = (x: number) => Math.sin(x * (freq * freq)) * Math.cos(x * x) * (1 / height)

	for (let i = 0; i < pcount; i++) {
		let x = i
		let y = f(x)

		points.push({ x, y })
	}

	return points;
}

export const shapes = {
	star,
	circle,
	teardrop,
	wave
}

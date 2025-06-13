/*
 * Makes a shooting star
 */

import { Vector2 } from "physics/vector"

export type Shoot = {
	speed: Vector2,

	// duration in seconds
	duration: number,

	// We use the start position to draw a trail
	start: Vector2,

	elapsedTime: number,
}

function make(start: Vector2, speed: Vector2, duration: number): Shoot {
	return {
		speed,
		duration,
		start,
		elapsedTime: 0
	}
}

export const shoot = {
	make,
}

/*
 * Mathematical operations that are specific to this app.
 */

import { vec2, Vector2 } from "physics/vector";

const getNormalisedDistance = (distance: number) => (100 / distance) / 100

// Returns a vector which we use to scale a specific entity.
// This is based on the actual scale of the entity and the distance it is from the camera in the z direction.
function getScaleFactor(distance: number, scale: Vector2): Vector2 {
	const normalisedDistance = (100 / distance) / 100

	return vec2.scale(scale, normalisedDistance)
}

export const transformations = {
	getScaleFactor,
	getNormalisedDistance
}

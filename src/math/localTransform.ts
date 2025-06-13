import { transformations } from "math/transformations";
import { Rect, rect } from "physics/rect";
import { vec2, Vector2 } from "physics/vector";

type LocalTransform = {
	normalisedDistance: number,
	scaleVector: Vector2,
	size: Vector2,
	bounds: Rect,
	centre: Vector2,
}

/*
* Returns the local transform of the entity,
* i.e. with all scaling, distancing, translations applied.
*/
function get(distance: number, scale: Vector2, translation: Vector2, size: Vector2): LocalTransform {
	const nd = transformations.getNormalisedDistance(distance)
	const scaleVector = transformations.getScaleFactor(distance, scale)
	const scaledSize = vec2.multiply(size, scaleVector)
	const bounds = rect.boundary(translation, scaledSize)
	const centre = vec2.make(translation.x, translation.y)

	return {
		normalisedDistance: nd,
		scaleVector,
		size: scaledSize,
		bounds,
		centre
	}
}

export const localTransform = {
	get,
}

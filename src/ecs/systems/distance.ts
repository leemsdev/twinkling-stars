/*
 * Modifies translations, colors and scale based on distance factor.
 * Used to make further away entities seem smaller, darker and like they move slower.
 * Also creates a parallax background effect.
 */

import { ecs, Entity } from "ecs";

export function run(e: Entity) {
	const distance = ecs.get().distance.get(e)


}

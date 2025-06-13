import { ecs } from "ecs";
import { vec2, Vector2 } from "physics/vector";

export type Camera = {
	speed: Vector2,

	// We only record the translation of the camera so that
	// systems who operate based on camera offset (e.g. procedural generation system)
	// can get this info.
	translation: Vector2
}

/*
*  Modifies the entity's translation component by the camera's movement.
*/
export function run() {
	const cam = ecs.get().camera

	if (!cam) {
		throw new Error("No camera is set!")
	}

	cam.translation = vec2.add(cam.translation, cam.speed)
}


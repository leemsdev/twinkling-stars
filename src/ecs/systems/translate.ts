import { App } from "app";
import { ecs, Entity } from "ecs";
import { entity } from "entity";
import { transformations } from "math/transformations";
import { vec2 } from "physics/vector";

// Performs some kind of translation on an entity
// Atm it just translates the entity according to the camera's translation, which is how we create a 
// movement effect
// Also marks the entity for deletion is it has scrolled off the left hand side of the screen
// TODO: Do parallax in here. We just apply some factor to the translation vector based on the distance
export function run(e: Entity) {
	const camera = ecs.get().camera
	const translation = ecs.get().translation.get(e)

	if (!translation) return;

	const distance = ecs.get().distance.get(e) ?? 1;
	const moveSpeed = ecs.get().speed.get(e) ?? vec2.zero();

	// Scale the translation speed by the normalised distance. This will make further away elements move slower
	let translationSpeed = vec2.scale(camera.speed, transformations.getNormalisedDistance(distance))

	// And by the entities speed
	translationSpeed = vec2.multiply(translationSpeed, moveSpeed)

	// Then scale it all by delta time
	translationSpeed = vec2.scale(translationSpeed, App.deltaTime())

	const newTranslation = vec2.subtract(translation, translationSpeed)

	ecs.get().translation.set(e, newTranslation)

	// TODO: Don't use magic numbers here
	if (newTranslation.x < -800) {
		console.log(`Entity is offscreen: ${e}`)
		entity.markForCleanup(e)
		return
	}
}

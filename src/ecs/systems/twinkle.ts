import { App } from "app";
import { ecs, Entity } from "ecs";
import { Color } from "visual/color";

export function run(entity: Entity) {
	const twinkle = ecs.get().twinkle.get(entity)

	if (!twinkle) return

	const col = ecs.get().color.get(entity)

	if (!col) return

	if (col.a < 0.1) {
		twinkle.factor = 1
	}

	if (col.a >= 0.9) {
		twinkle.factor = -1
	}

	// Doing this means whole numbers can be provided for speed
	// but we can still get a good range
	const speed = twinkle.speed * App.deltaTime()

	twinkle.intensity += (speed * twinkle.factor)

	let newcol: Color = {
		...col,
		a: twinkle.intensity
	}

	ecs.get().color.set(entity, newcol)
}

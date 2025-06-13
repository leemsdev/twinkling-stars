import { ecs, Entity } from "ecs";


export function run(e: Entity) {
	const cleanup = ecs.get().cleanup.get(e)

	if (!cleanup) return;

	console.log(`cleaning up entity: ${e.id}`)

	ecs.get().active.set(e, false)
	ecs.get().cleanup.delete(e)
}

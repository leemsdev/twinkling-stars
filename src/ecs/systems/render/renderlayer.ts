import { ecs } from "ecs";

import * as render from './render'
import * as effects from './effects'
import { stats } from "stats";

export function run() {
	const layers = ecs.get().renderLayers

	let renderCalls = 0

	for (const l of layers) {
		for (const e of l) {
			const isActive = ecs.get().active.get(e)

			if (!isActive) continue

			// Render visual effects right before rendering the actual entity
			// this ensures the entity is rendered on top of the effect.
			// NOTE: This is brittle. If we want to add effects later that render over the entity, this won't work, but it's fine for now cos our effects only need to render behind the entity.

			effects.run(e)
			render.run(e)



			renderCalls++
		}
	}

	stats.setRenderCalls(renderCalls)
}

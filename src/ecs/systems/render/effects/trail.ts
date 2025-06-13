import { App } from "app";
import { ecs, Entity } from "ecs";
import { shapes } from "generation/shapes";
import { transformations } from "math/transformations";
import { vec2 } from "physics/vector";
import { color } from "visual/color";

// Renders a line behind an entity
export function run(e: Entity) {
	const trail = ecs.get().trail.get(e)

	if (!trail) return;

	const translation = ecs.get().translation.get(e)

	if (!translation) return

	const scale = ecs.get().scale.get(e)

	if (!scale) return

	const col = trail.color

	const distance = ecs.get().distance.get(e)

	if (!distance) return

	const sprite = ecs.get().sprites.get(e)

	if (!sprite) return

	const { ctx } = App.get()

	const scaleVector = transformations.getScaleFactor(distance, scale)
	const scaledDim = vec2.multiply(sprite.size, scaleVector)

	const l = scaledDim.x * 80;
	const w = scaledDim.x * 4;

	const points = shapes.teardrop(w, l, -(Math.PI / 2), 30)

	ctx.beginPath()
	ctx.fillStyle = color.rgba(col)

	ctx.moveTo(translation.x, translation.y)

	for (const p of points) {
		ctx.lineTo((translation.x + p.x) + l / 3, translation.y + p.y)
	}

	ctx.fill()
	ctx.closePath()


}

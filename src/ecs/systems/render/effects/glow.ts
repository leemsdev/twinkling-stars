import { App } from "app";
import { ecs, Entity } from "ecs";
import { localTransform } from "math/localTransform";
import { Vector2 } from "physics/vector";
import { Color, color } from "visual/color";

function drawCircle(ctx: CanvasRenderingContext2D, centre: Vector2, radius: number, col: Color) {
	if (radius < 0) radius = 1
	ctx.beginPath()

	ctx.fillStyle = color.rgba(col)
	ctx.arc(centre.x, centre.y, radius, 0, Math.PI * 2)
	ctx.fill()


	ctx.closePath()
}

export function run(e: Entity) {
	const glow = ecs.get().glow.get(e)

	if (!glow) return;

	const translation = ecs.get().translation.get(e)

	if (!translation) return;

	const sprite = ecs.get().sprites.get(e)

	if (!sprite) return;

	const scale = ecs.get().scale.get(e)

	if (!scale) return;

	const distance = ecs.get().distance.get(e)

	if (!distance) return;

	const { ctx } = App.get()

	const lt = localTransform.get(distance, scale, translation, sprite.size);

	const col = { ...glow.color }

	const intensity = glow.intensity
	const radius = lt.size.x / 2


	const spread = 10 + (scale.x * 0.007)
	const startingAlpha = 0.01 * intensity
	const steps = 10
	const alphaChange = 0.001 * intensity
	const radiusChange = spread / steps
	const centre = lt.centre;

	col.a = startingAlpha

	ctx.beginPath()

	for (let i = 0; i < steps; i++) {
		const nextRadius = radius + (spread - (radiusChange * i) - i)
		drawCircle(ctx, centre, nextRadius, color.makeFrom(col, { a: col.a + (alphaChange * i) }))
	}

	ctx.closePath()
}

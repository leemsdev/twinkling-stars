import { App } from "app";
import { ecs, Entity } from "ecs"
import { localTransform } from "math/localTransform";
import { Rect } from "physics/rect";
import { vec2 } from "physics/vector";
import { Color, color } from "visual/color";

const noiseMap = new Image()
noiseMap.src = "img/noisemaps/noise_map_5.png"

const shadowMap = new Image()
shadowMap.src = "img/noisemaps/shadowmap.png"

const drawBounds = false

let mvamt = 0

function drawNoiseMap(img: HTMLImageElement, ctx: CanvasRenderingContext2D, r: Rect) {
	mvamt += 0.01;
	ctx.clip()
	ctx.beginPath()
	ctx.globalAlpha = 0.5
	ctx.drawImage(img, r.pos.x, r.pos.y, r.width, r.height)
	ctx.globalAlpha = 0.5
	// These numbers are literally made up lol but they look good
	ctx.drawImage(shadowMap, r.pos.x - (r.width * 0.17), r.pos.y - (r.height * 0.17), r.width * 2, r.height * 2)
	ctx.globalAlpha = 1
	ctx.closePath()
	ctx.restore()

}

function drawGradient(ctx: CanvasRenderingContext2D, bounds: Rect, drawColor: Color) {
	const gradient = ctx.createRadialGradient(bounds.pos.x, bounds.pos.y, bounds.width / 2, bounds.pos.x, bounds.pos.y, bounds.width);

	const c1 = drawColor
	const c2 = color.darken(drawColor, 0.2)

	c2.a = 0.7
	c1.a = 0.1


	// Add three color stops
	gradient.addColorStop(0, color.rgba(c1));
	gradient.addColorStop(1, color.rgba(c2));

	// Set the fill style and draw a rectangle
	ctx.fillStyle = gradient;

	ctx.fill()

}

// TODO: Move calculations out of here into either maths or physics file
// TODO: Create multiple render steps which work on render layers ( basically we run a render function for each layer, and it allows us to draw elements on top of
// other elements) - because we don't want to see stars rendered in front of planets
export function run(entity: Entity) {

	const sprite = ecs.get().sprites.get(entity)

	if (!sprite) return

	const translation = ecs.get().translation.get(entity)

	if (!translation) return;

	const col = ecs.get().color.get(entity)

	if (!col) return;

	const scale = ecs.get().scale.get(entity)

	if (!scale) return
	const { ctx } = App.get()

	const distance = ecs.get().distance.get(entity) ?? 1

	const lt = localTransform.get(
		distance,
		scale,
		translation,
		sprite.size,
	)

	// draw sprite
	ctx.beginPath()


	// draw to each point
	for (let i = 0; i < sprite.points.length; i++) {
		const p = sprite.points[i]

		// Scale the point based on the scale vector and then add it to the centre
		// This gives us the actual point position
		const pos = vec2.add(lt.centre, vec2.multiply(p, lt.scaleVector))

		ctx.lineTo(pos.x, pos.y)
	}

	if (sprite.img?.mask) {
		ctx.save()
	}


	if (sprite.drawMode == 'stroke') {
		ctx.strokeStyle = color.rgba(col)
		ctx.stroke()
	} else {
		// For fill style elements, we darken the fill color by the distance factor
		ctx.fillStyle = color.rgba(color.darken(col, lt.normalisedDistance));
		ctx.fill()
	};

	ctx.closePath()

	// no point drawing images for stuff that small
	if (sprite.img?.mask && lt.size.x > 10 && lt.size.y > 10) {
		drawNoiseMap(sprite.img.ref, ctx, lt.bounds)
	}

	if (drawBounds) {
		ctx.beginPath()
		ctx.strokeStyle = "rgba(255, 0, 0, 1)"
		ctx.rect(lt.bounds.pos.x, lt.bounds.pos.y, lt.bounds.width, lt.bounds.height)
		ctx.stroke()
		ctx.closePath()
	}



}

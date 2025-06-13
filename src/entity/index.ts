/*
 * Helpers to perform actions on entities
 */

import { ecs, Entity } from "ecs";
import { Sprite } from "ecs/components/sprite";
import { Vector2 } from "physics/vector";
import { Color } from "visual/color";

function setDimensions(e: Entity, d: Vector2) {
	ecs.get().dimensions.set(e, d)
}

function setTranslation(e: Entity, t: Vector2) {
	ecs.get().translation.set(e, t)
}

function setActive(e: Entity, active: boolean) {
	ecs.get().active.set(e, active)
}

function setColor(e: Entity, color: Color) {
	ecs.get().color.set(e, color)
}

function setScale(e: Entity, scale: Vector2) {
	ecs.get().scale.set(e, scale)
}

function setSprite(e: Entity, sprite: Sprite) {
	ecs.get().sprites.set(e, sprite)
}

function setDistance(e: Entity, distance: number) {
	if (distance < 0 || distance > 100) {
		throw new Error("Distance must be a number between 1 and 100")
	}

	ecs.get().distance.set(e, distance)
}

function setSpeed(e: Entity, speed: Vector2) {
	ecs.get().speed.set(e, speed)
}

function markForCleanup(e: Entity) {
	ecs.get().cleanup.set(e, true)
	ecs.get().active.set(e, false)
}

function setRenderLayer(e: Entity, layer: number) {
	const layers = ecs.get().renderLayers

	if (layers.length <= layer) {
		while (layers.length <= layer) {
			layers.push(new Set<Entity>())
		}
	}

	layers[layer].add(e)
}

type EntityArgs = {
	translation: Vector2,
	speed: Vector2,
	color: Color,
	scale: Vector2,
	distance: number,
	sprite: Sprite,
	renderLayer?: number
}

const madeEntities = new Set<Entity>()

function makeDrawable(args: EntityArgs) {
	const e = ecs.makeEntity()

	if (madeEntities.has(e)) {
		console.log("I already have that entity!")
	}

	setTranslation(e, args.translation)
	setSpeed(e, args.speed)
	setColor(e, args.color)
	setDistance(e, args.distance)
	setScale(e, args.scale)
	setSprite(e, args.sprite)
	setActive(e, true)
	setRenderLayer(e, args.renderLayer ?? 0)

	return e

}

export const entity = {
	setDimensions,
	setTranslation,
	setActive,
	setColor,
	setScale,
	setSprite,
	setDistance,
	setSpeed,
	markForCleanup,
	makeDrawable,
	setRenderLayer
}

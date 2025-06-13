import { vec2, Vector2 } from "physics/vector"
import { Color } from "visual/color"
import { Twinkle } from "./components/twinkle"
import { Sprite } from "./components/sprite"
import { Shoot } from "./components/shoot"
import { Camera } from "./systems/camera"
import { Trail } from "./components/trail"
import { Glow } from "./components/glow"

export type Entity = {
	id: number,
}

export type ECS = {
	nextEntity: number,


	active: Map<Entity, boolean>,

	// Entities marked for cleanup will be deleted by the cleanup system
	cleanup: Map<Entity, boolean>,

	// Width and height of an entity
	dimensions: Map<Entity, Vector2>,

	// Describes some tranlation to be performed on the entity.
	// Used to position entities
	translation: Map<Entity, Vector2>,

	speed: Map<Entity, Vector2>,

	scale: Map<Entity, Vector2>,

	color: Map<Entity, Color>,
	twinkle: Map<Entity, Twinkle>,
	sprites: Map<Entity, Sprite>,
	shoot: Map<Entity, Shoot>,

	// This represents how far away from the camera the entity is.
	// It sort-of simulates depth 
	// The scale and color.alpha values of each entity with a distance component
	// are multipled by the value (which is normalised to between 0 and 1) and
	// this way we can shrink and dim further away elements.
	// Larger numbers = further distance = a lower distance factor (e.g. 0.1 will significantly
	// shrink and darken a further away entity)
	distance: Map<Entity, number>,

	camera: Camera,

	trail: Map<Entity, Trail>,

	glow: Map<Entity, Glow>,

	// Render layers
	renderLayers: Set<Entity>[]
}

let ecsobj: ECS = {
	nextEntity: 0,
	camera: { speed: vec2.make(4, 0), translation: vec2.zero() },
	active: new Map(),
	dimensions: new Map(),
	translation: new Map(),
	color: new Map(),
	twinkle: new Map(),
	scale: new Map(),
	sprites: new Map(),
	shoot: new Map(),
	distance: new Map(),
	speed: new Map(),
	cleanup: new Map(),
	trail: new Map(),
	glow: new Map(),

	// Have at least 1 render layer setup
	renderLayers: [new Set<Entity>()]
}

function get(): ECS {
	return ecsobj
}

function clear() {
	ecsobj = {
		nextEntity: 0,
		active: new Map(),
		dimensions: new Map(),
		translation: new Map(),
		color: new Map(),
		twinkle: new Map(),
		scale: new Map(),
		sprites: new Map(),
		shoot: new Map(),
		distance: new Map(),
		cleanup: new Map(),
		speed: new Map(),
		glow: new Map(),
		camera: { speed: vec2.make(4, 0), translation: vec2.zero() },
		renderLayers: [new Set<Entity>()],
		trail: new Map()
	}
}

function makeEntity(): Entity {
	const e = { id: ecsobj.nextEntity++ }


	return e;
}

export const ecs = {
	get,
	makeEntity,
	clear
}



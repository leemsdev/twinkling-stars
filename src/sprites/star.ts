import { Sprite } from "ecs/components/sprite";
import { shapes } from "generation/shapes";
import { vec2 } from "physics/vector";

// NOTE: This name is kind of a misnomer because currently the stars are pretty much always the same.
export function randomStar(): Sprite {
	const star = shapes.star(5);

	return {
		points: star,
		drawMode: 'stroke',
		size: vec2.make(10, 10)
	}
}

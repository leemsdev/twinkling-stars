/*
 * This system is responsible for spawning new stars,
 * like shooting stars.
 */

import { App } from "app";
import { gen } from "generation";
import { makeStar } from "generation/entities/stars";
import { math } from "math/random";
import { vec2 } from "physics/vector";
import { color } from "visual/color";

const spawn_chance = 0.001;

export function run() {
	const shouldSpawn = math.rndf(0, 100)

	if (shouldSpawn < (100 * spawn_chance)) {
		// makeStar(App.getCanvasRect(), vec2.make(1000, 50), color.make(255, 165, 0, 1))
	}

}

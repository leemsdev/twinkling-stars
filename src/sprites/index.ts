import { randomAsteroid } from "./asteroid";
import { randomSprite } from "./planet";
import { randomStar } from "./star";


export const sprites = {
	planet: {
		random: randomSprite
	},
	asteroid: {
		random: randomAsteroid
	},
	star: {
		random: randomStar,
	}
}

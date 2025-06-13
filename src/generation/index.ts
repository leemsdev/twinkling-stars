import { math } from 'math/random'
import { rect, Rect } from 'physics/rect'
import { makeCluster, makeStar, makeStars } from './entities/stars'
import { makePlanetsWithin } from './entities/planets'
import { makeAsteroids } from './entities/asteroids'

function sky(r: Rect) {
	let starClusterCount = math.rnd(50, 100)
	let planetClusterCount = math.rnd(10, 30)

	for (let i = 0; i < starClusterCount; i++) {
		const sf = Math.random() * Math.random() * Math.random() * Math.random()
		const clusterBounds = rect.scale(rect.randomRectInside(r), sf)

		clusterBounds.width *= 1.3
		clusterBounds.height *= 1.3

		makeCluster(clusterBounds)
	}

	for (let i = 0; i < planetClusterCount; i++) {
		const clusterBounds = rect.randomRectInside(r)

		makePlanetsWithin(clusterBounds, 4)
	}

	makeStars(r, 500)
	makeAsteroids(r, 200)
}

function star(r: Rect) {
	return makeStar(r)
}

export const gen = {
	sky,
	star
}

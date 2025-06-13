import { App } from "app"
import { ecs } from "ecs"

const statElem = document.getElementById("stats")

type Stats = {
	starCount: number,
	planetCount: number,
	renderCalls: number,
}

const defaultStats: Stats = {
	starCount: 0,
	planetCount: 0,
	renderCalls: 0,
}

let _stats = { ...defaultStats }

function incrementStarCount() {
	_stats.starCount++
}

function incrementPlanetCount() {
	_stats.planetCount++
}

function setRenderCalls(n: number) {
	_stats.renderCalls = n
}

function clear() {
	if (!statElem) return;

	_stats = { ...defaultStats }
}

function render() {
	if (!statElem) return

	statElem.innerText = `
		Stars: ${_stats.starCount}
		Planets: ${_stats.planetCount}
		Renders: ${_stats.renderCalls}
		Active: (${ecs.get().active.size} / ${ecs.get().nextEntity}))
		Resolution: (${App.getCanvasRect().width}, ${App.getCanvasRect().height})
	`
}

export const stats = {
	clear,
	incrementStarCount,
	incrementPlanetCount,
	render,
	setRenderCalls
}

import { rect, Rect } from "physics/rect"
import { vec2 } from "physics/vector"

type AppState = {
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	time: {
		delta: number,
		last: number,
	},
}

let _app: AppState
let isSetup = false

function setup() {
	const canvas = document.getElementById("canvas")

	if (!(canvas instanceof HTMLCanvasElement)) {
		throw new Error("Canvas is not present in document")
	}

	const ctx = canvas.getContext("2d")

	if (!ctx) {
		throw new Error("Couldnt get canvas context")
	}

	const vp = rect.make(vec2.zero(), canvas.width, canvas.height)

	_app = {
		ctx,
		canvas,
		time: { delta: 0, last: Date.now() },
	}

	isSetup = true

	syncCanvas()
	syncDeltaTime()
}

function get(): AppState {
	if (!isSetup) throw new Error("Can't call app.get() before app.setup()")

	return _app
}

function syncCanvas() {
	const app = get()

	app.canvas.width = app.canvas.clientWidth
	app.canvas.height = app.canvas.clientHeight
}

function syncDeltaTime() {
	const app = get();

	const now = Date.now()
	const lastTime = app.time.last;

	app.time = {
		delta: (now - lastTime) / 1000,
		last: now
	}
}

function getCanvasRect(): Rect {
	const app = get()
	const canvas = app.canvas

	return rect.make(vec2.make(0, 0), canvas.width, canvas.height)
}

function deltaTime() {
	const app = get()

	return app.time.delta
}

export const App = {
	setup,
	get,
	syncCanvas,
	syncDeltaTime,
	getCanvasRect,
	deltaTime,
}

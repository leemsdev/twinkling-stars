import { math } from "math/random"

export type Color = {
	r: number,
	g: number,
	b: number,
	a: number
}

function make(r: number, g: number, b: number, a: number): Color {
	return { r, g, b, a }
}

function random(): Color {
	return {
		r: math.rnd(0, 255),
		g: math.rnd(0, 255),
		b: math.rnd(0, 255),
		a: math.rnd(0, 255)
	}
}

function makeFrom(col: Color, changes: Partial<Color>): Color {
	return {
		...col,
		...changes
	}
}

function darken(col: Color, amt: number): Color {
	return {
		r: col.r * amt,
		g: col.g * amt,
		b: col.b * amt,
		a: 255 * amt
	}
}

function rgba(c: Color): string {
	return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`
}

function multiply(c: Color, factor: number): Color {
	return {
		r: c.r * factor,
		g: c.g * factor,
		b: c.b * factor,
		a: c.a
	}
}

export const color = {
	random,
	rgba,
	multiply,
	make,
	white: () => make(255, 255, 255, 1),
	black: () => make(0, 0, 0, 1),
	darken,
	makeFrom
}

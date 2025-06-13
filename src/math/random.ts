function rand(min: number, max: number): number {
	let r = Math.random() * (max - min) + min

	return Math.floor(r)
}

function randf(min: number, max: number): number {
	let r = Math.random() * (max - min) + min

	return r
}

export const math = {
	rnd: rand,
	rndf: randf
}

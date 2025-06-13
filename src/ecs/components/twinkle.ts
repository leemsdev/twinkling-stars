export type Twinkle = {
	// color is multiplied by this value in order to emulate
	// when this value reaches 0, the factor is reversed, creating
	// the twinkling effect
	intensity: number

	// 1 or -1, depending on the twinkle direction
	factor: number,

	// How fast the twinkle animation should happen
	speed: number,
}

function make(speed: number): Twinkle {
	return {
		intensity: 1,
		factor: 1,
		speed,
	}
}

export const twinkle = {
	make
}

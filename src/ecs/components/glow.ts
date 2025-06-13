import { color, Color } from "visual/color"

export type Glow = {
	intensity: number,
	color: Color
}

export const glow = {
	make: (intensity: number, col?: Color): Glow => ({
		intensity,
		color: col ?? color.white()
	})
}



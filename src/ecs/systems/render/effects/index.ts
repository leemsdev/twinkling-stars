import { Entity } from "ecs";

import * as trail from './trail'
import * as glow from './glow'

export function run(e: Entity) {
	trail.run(e)
	glow.run(e)
}

import type { Builder, Command, Describe, Handler } from 'landlubber'

import { ZonedTime } from 'zoned-time'

interface Options {
  thing: string
}

export const command: Command = 'parse thing'

export const describe: Describe = 'Parse a string as a ZonedTime'

export const builder: Builder = {
  thing: {
    type: 'string',
    describe: 'String to parse',
  },
}

export const handler: Handler<Options> = async ({ thing, logger }) => {
  const zonedTime = ZonedTime.from(thing)
  logger.info(zonedTime, zonedTime.toString())
}

import { Temporal } from '@js-temporal/polyfill'

export type ZonedTimeLike = PartialZonedTime | string

interface PartialZonedTime {
  hour: number
  minute?: number
  second?: number
  millisecond?: number
  microsecond?: number
  nanosecond?: number
  timeZone: string
}

export const parseZonedTimeLike = (input: ZonedTimeLike): PartialZonedTime => {
  if (typeof input === 'string') {
    return parseZonedTimeString(input.trim())
  }
  return input
}

const parseZonedTimeString = (input: string): PartialZonedTime => {
  if (input === '') {
    throw new UnparsableZonedTimeStringError(input, 'empty string')
  }

  return {
    ...Temporal.PlainTime.from(input),
    timeZone: 'UTC',
  }
}

export class UnparsableZonedTimeStringError extends Error {
  constructor(input: string, message: string) {
    super(`Cannot parse ${input} as ZonedTime: ${message}`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

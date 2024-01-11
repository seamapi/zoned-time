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

export const parseZonedTimeString = (
  input: ZonedTimeLike,
): PartialZonedTime => {
  if (typeof input !== 'string') return input

  if (input.trim() === '') {
    throw new UnparsableZonedTimeStringError(input, 'empty string')
  }

  return { hour: 0, timeZone: 'UTC' }
}

export class UnparsableZonedTimeStringError extends Error {
  constructor(input: string, message: string) {
    super(`Cannot parse ${input} as ZonedTime: ${message}`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export interface ZonedTimeInput {
  hour: number
  minute?: number
  second?: number
  millisecond?: number
  microsecond?: number
  nanosecond?: number
  timeZone: string
}

export const parseInput = (input: ZonedTimeInput | string): ZonedTimeInput => {
  if (typeof input !== 'string') return input

  if (input.trim() === '') {
    throw new UnparsableZonedTimeInputError(input, 'empty string')
  }

  return { hour: 0, timeZone: 'UTC' }
}

export class UnparsableZonedTimeInputError extends Error {
  constructor(input: string, message: string) {
    super(`Cannot parse ${input} as ZonedTime: ${message}`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

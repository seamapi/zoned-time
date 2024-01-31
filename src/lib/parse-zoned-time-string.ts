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

  try {
    const [time, rest] = input.split('[')

    if (time == null) {
      throw new UnparsableZonedTimeStringError(input, 'cannot parse date')
    }

    if (rest == null || rest?.length < 2 || !rest?.endsWith(']')) {
      throw new UnparsableZonedTimeStringError(input, 'cannot parse time zone')
    }

    const plainTime = Temporal.PlainTime.from(time)
    return {
      ...plainTimeToPlainObject(plainTime),
      timeZone: rest.slice(0, -1),
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new UnparsableZonedTimeStringError(input, err.message)
    }
    throw new UnparsableZonedTimeStringError(input, 'unknown error')
  }
}

const plainTimeToPlainObject = (
  plainTime: Temporal.PlainTime,
): Omit<Required<PartialZonedTime>, 'timeZone'> => ({
  hour: plainTime.hour,
  minute: plainTime.minute,
  second: plainTime.second,
  millisecond: plainTime.millisecond,
  microsecond: plainTime.microsecond,
  nanosecond: plainTime.nanosecond,
})

export class UnparsableZonedTimeStringError extends Error {
  constructor(input: string, message: string) {
    super(`Cannot parse ${input} as ZonedTime: ${message}`)
    this.name = this.constructor.name
  }
}

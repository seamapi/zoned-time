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
    const [head, tail] = input.split('[')

    if (head == null) {
      throw new UnparsableZonedTimeStringError(input, 'cannot parse time')
    }

    if (tail == null || tail?.length < 2 || !tail?.endsWith(']')) {
      throw new UnparsableZonedTimeStringError(input, 'cannot parse time zone')
    }

    const timeZone = tail.slice(0, -1)

    const offsetSign = head.includes('-') ? '-' : '+'
    const [time, offsetValue] = head.split(offsetSign)

    const offset = offsetValue == null ? null : `${offsetSign}${offsetValue}`

    if (
      offset !== null &&
      offset !==
        new Temporal.TimeZone(timeZone).getOffsetStringFor(
          Temporal.Now.instant(),
        )
    ) {
      throw new Error(`Offset ${offset} is invalid for ${timeZone}`)
    }

    if (time == null) {
      throw new UnparsableZonedTimeStringError(input, 'cannot parse time')
    }

    const plainTime = Temporal.PlainTime.from(time)

    return {
      ...plainTimeToPlainObject(plainTime),
      timeZone,
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

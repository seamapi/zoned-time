import { Temporal } from '@js-temporal/polyfill'

import { parseInput, type ZonedTimeInput } from './parse-input.js'

export class ZonedTime {
  hour: number
  minute: number
  second: number
  millisecond: number
  microsecond: number
  nanosecond: number
  timeZone: string

  constructor(
    isoHour: number = 0,
    isoMinute: number = 0,
    isoSecond: number = 0,
    isoMillisecond: number = 0,
    isoMicrosecond: number = 0,
    isoNanosecond: number = 0,
    timeZone: string = 'UTC',
  ) {
    this.timeZone = timeZone
    this.hour = isoHour
    this.minute = isoMinute
    this.second = isoSecond
    this.millisecond = isoMillisecond
    this.microsecond = isoMicrosecond
    this.nanosecond = isoNanosecond
  }

  static from(input: string | ZonedTimeInput): ZonedTime {
    const {
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond,
      timeZone,
    } = parseInput(input)

    return new ZonedTime(
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond,
      timeZone,
    )
  }

  toString(): string {
    const { timeZone, ...rest } = this
    const time = Temporal.PlainTime.from(rest)
    return `${time.toString()}[${timeZone}]`
  }
}

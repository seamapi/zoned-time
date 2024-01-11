import { Temporal } from '@js-temporal/polyfill'

import {
  parseZonedTimeString,
  type ZonedTimeLike,
} from './parse-zoned-time-string.js'

export class ZonedTime {
  readonly #plainTime: Temporal.PlainTime
  readonly #timeZone: Temporal.TimeZone

  constructor(
    isoHour: number = 0,
    isoMinute: number = 0,
    isoSecond: number = 0,
    isoMillisecond: number = 0,
    isoMicrosecond: number = 0,
    isoNanosecond: number = 0,
    timeZone: string = 'UTC',
  ) {
    this.#plainTime = new Temporal.PlainTime(
      isoHour,
      isoMinute,
      isoSecond,
      isoMillisecond,
      isoMicrosecond,
      isoNanosecond,
    )
    this.#timeZone = new Temporal.TimeZone(timeZone)
  }

  static from(thing: ZonedTimeLike): ZonedTime {
    const {
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond,
      timeZone,
    } = parseZonedTimeString(thing)

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

  get hour(): number {
    return this.#plainTime.hour
  }

  get minute(): number {
    return this.#plainTime.minute
  }

  get second(): number {
    return this.#plainTime.second
  }

  get millisecond(): number {
    return this.#plainTime.millisecond
  }

  get microsecond(): number {
    return this.#plainTime.microsecond
  }

  get nanosecond(): number {
    return this.#plainTime.nanosecond
  }

  get timeZone(): string {
    return this.#timeZone.toString()
  }

  getTimeZone(): Temporal.TimeZone {
    return this.#timeZone
  }

  toString(): string {
    return `${this.#plainTime.toString()}[${this.timeZone}]`
  }
}

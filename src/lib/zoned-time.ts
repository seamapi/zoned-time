import { Temporal } from '@js-temporal/polyfill'

import {
  parseZonedTimeLike,
  type ZonedTimeLike,
} from './parse-zoned-time-string.js'

export class ZonedTime {
  readonly #plainTime: Temporal.PlainTime
  readonly #zonedDateTime: Temporal.ZonedDateTime

  constructor(
    isoHour: number = 0,
    isoMinute: number = 0,
    isoSecond: number = 0,
    isoMillisecond: number = 0,
    isoMicrosecond: number = 0,
    isoNanosecond: number = 0,
    timeZoneId: string = 'UTC',
  ) {
    this.#plainTime = new Temporal.PlainTime(
      isoHour,
      isoMinute,
      isoSecond,
      isoMillisecond,
      isoMicrosecond,
      isoNanosecond,
    )
    this.#zonedDateTime = Temporal.ZonedDateTime.from(
      Temporal.Now.instant().toZonedDateTimeISO(timeZoneId),
    )
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
    } = parseZonedTimeLike(thing)

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

  get timeZoneId(): string {
    return this.#zonedDateTime.timeZoneId
  }

  toPlainTime(): Temporal.PlainTime {
    return this.#plainTime
  }

  toLocaleString(): string {
    return [this.#plainTime.toLocaleString(), this.timeZoneId].join(' ')
  }

  toString(): string {
    return `${this.#plainTime.toString()}[${this.timeZoneId}]`
  }

  toJSON(): string {
    return this.toString()
  }

  round(
    roundTo:
      | 'hour'
      | 'minute'
      | 'second'
      | 'millisecond'
      | 'microsecond'
      | 'nanosecond',
  ): ZonedTime {
    const { hour, minute, second, millisecond, microsecond, nanosecond } =
      this.#plainTime.round(roundTo)

    return new ZonedTime(
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond,
      this.timeZoneId,
    )
  }
}

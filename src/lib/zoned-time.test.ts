import test from 'ava'

import { ZonedTime } from './zoned-time.js'

test('ZonedTime: constructor', (t) => {
  const zonedTime = new ZonedTime(1, 2, 3, 4, 5, 6, 'America/Los_Angeles')
  t.is(zonedTime.hour, 1)
  t.is(zonedTime.minute, 2)
  t.is(zonedTime.second, 3)
  t.is(zonedTime.millisecond, 4)
  t.is(zonedTime.microsecond, 5)
  t.is(zonedTime.nanosecond, 6)
  t.is(zonedTime.timeZoneId, 'America/Los_Angeles')
})

test('ZonedTime: constructor with defaults', (t) => {
  const zonedTime = new ZonedTime()
  t.is(zonedTime.hour, 0)
  t.is(zonedTime.minute, 0)
  t.is(zonedTime.second, 0)
  t.is(zonedTime.millisecond, 0)
  t.is(zonedTime.microsecond, 0)
  t.is(zonedTime.nanosecond, 0)
  t.is(zonedTime.timeZoneId, 'UTC')
})

test('ZonedTime: toString', (t) => {
  const zonedTime = new ZonedTime(1, 2, 3, 4, 5, 6, 'America/Los_Angeles')
  t.is(zonedTime.toString(), '01:02:03.004005006[America/Los_Angeles]')
})

test('ZonedTime: toJSON', (t) => {
  const zonedTime = new ZonedTime(1, 2, 3, 4, 5, 6, 'America/Los_Angeles')
  t.is(zonedTime.toJSON(), '01:02:03.004005006[America/Los_Angeles]')
})

test('ZonedTime: toLocaleString', (t) => {
  const zonedTime = new ZonedTime(1, 2, 3, 4, 5, 6, 'America/Los_Angeles')
  t.truthy(zonedTime.toLocaleString())
})

test('ZonedTime: round', (t) => {
  const zonedTime = new ZonedTime(
    1,
    2,
    3,
    4,
    5,
    6,
    'America/Los_Angeles',
  ).round('minute')
  t.is(zonedTime.hour, 1)
  t.is(zonedTime.minute, 2)
  t.is(zonedTime.second, 0)
  t.is(zonedTime.millisecond, 0)
  t.is(zonedTime.microsecond, 0)
  t.is(zonedTime.nanosecond, 0)
  t.is(zonedTime.timeZoneId, 'America/Los_Angeles')
})

test('ZonedTime: from', (t) => {
  const zonedTime = ZonedTime.from({
    hour: 1,
    minute: 2,
    second: 3,
    millisecond: 4,
    microsecond: 5,
    nanosecond: 6,
    timeZone: 'America/Los_Angeles',
  })

  t.is(zonedTime.hour, 1)
  t.is(zonedTime.minute, 2)
  t.is(zonedTime.second, 3)
  t.is(zonedTime.millisecond, 4)
  t.is(zonedTime.microsecond, 5)
  t.is(zonedTime.nanosecond, 6)
  t.is(zonedTime.timeZoneId, 'America/Los_Angeles')
})

test('ZonedTime: from with defaults', (t) => {
  const zonedTime = ZonedTime.from({
    hour: 0,
    timeZone: 'UTC',
  })

  t.is(zonedTime.hour, 0)
  t.is(zonedTime.minute, 0)
  t.is(zonedTime.second, 0)
  t.is(zonedTime.millisecond, 0)
  t.is(zonedTime.microsecond, 0)
  t.is(zonedTime.nanosecond, 0)
  t.is(zonedTime.timeZoneId, 'UTC')
})

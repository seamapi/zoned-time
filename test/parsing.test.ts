import test from 'ava'

import { UnparsableZonedTimeStringError, ZonedTime } from 'zoned-time'

test('parses object with defaults', (t) => {
  t.is(
    ZonedTime.from({ hour: 1, timeZone: 'Pacific/Honolulu' }).toString(),
    '01:00:00-10:00[Pacific/Honolulu]',
  )
  t.is(
    ZonedTime.from({ hour: 0, timeZone: 'UTC', minute: 2 }).toString(),
    '00:02:00+00:00[UTC]',
  )
  t.is(
    ZonedTime.from({ hour: 0, timeZone: 'UTC', second: 3 }).toString(),
    '00:00:03+00:00[UTC]',
  )
  t.is(
    ZonedTime.from({ hour: 0, timeZone: 'UTC', millisecond: 4 }).toString(),
    '00:00:00.004+00:00[UTC]',
  )
  t.is(
    ZonedTime.from({ hour: 0, timeZone: 'UTC', microsecond: 5 }).toString(),
    '00:00:00.000005+00:00[UTC]',
  )
  t.is(
    ZonedTime.from({ hour: 0, timeZone: 'UTC', nanosecond: 6 }).toString(),
    '00:00:00.000000006+00:00[UTC]',
  )
})

test('parses "PlainDate[TimeZone]" format', (t) => {
  t.is(
    ZonedTime.from('01:02:03.000000004[Pacific/Honolulu]').toString(),
    '01:02:03.000000004-10:00[Pacific/Honolulu]',
  )
})

test('parses "PlainDate+-offset[TimeZone]" format', (t) => {
  t.is(
    ZonedTime.from('01:02:03.000000004-10:00[Pacific/Honolulu]').toString(),
    '01:02:03.000000004-10:00[Pacific/Honolulu]',
  )

  t.is(
    ZonedTime.from('01:02:03.000000004+00:00[UTC]').toString(),
    '01:02:03.000000004+00:00[UTC]',
  )
})

test('error if offset does not match time zone', (t) => {
  t.throws(() => ZonedTime.from('01:02:03.000000004-00:02[Pacific/Honolulu]'), {
    instanceOf: UnparsableZonedTimeStringError,
  })
})

test('cannot parse empty string', (t) => {
  t.throws(() => ZonedTime.from(''), {
    instanceOf: UnparsableZonedTimeStringError,
  })
})

test('cannot parse malformed standard input', (t) => {
  t.throws(() => ZonedTime.from('01:00:00[UTC'), {
    instanceOf: UnparsableZonedTimeStringError,
  })
  t.throws(() => ZonedTime.from('01:00:00UTC]'), {
    instanceOf: UnparsableZonedTimeStringError,
  })
  t.throws(() => ZonedTime.from('0100:00[UTC]'), {
    instanceOf: UnparsableZonedTimeStringError,
  })
})

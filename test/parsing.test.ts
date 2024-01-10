import test from 'ava'

import { UnparsableZonedTimeInputError, ZonedTime } from 'zoned-time'

test('parses with defaults', (t) => {
  t.is(ZonedTime.from({ hour: 0, timeZone: 'UTC' }).toString(), '00:00:00[UTC]')
})

test('cannot parse empty string', (t) => {
  t.throws(() => ZonedTime.from(''), {
    instanceOf: UnparsableZonedTimeInputError,
  })
})

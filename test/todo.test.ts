import test from 'ava'

import { todo } from 'zoned-time'

test('todo: returns argument', (t) => {
  t.is(todo('todo'), 'todo', 'returns input')
})

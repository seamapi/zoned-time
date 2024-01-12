#!/usr/bin/env tsx

import landlubber from 'landlubber'

import * as parse from './parse.js'

const commands = [parse]

await landlubber(commands).parse()

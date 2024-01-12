# ZonedTime

[![npm](https://img.shields.io/npm/v/zoned-time.svg)](https://www.npmjs.com/package/zoned-time)
[![GitHub Actions](https://github.com/seamapi/zoned-time/actions/workflows/check.yml/badge.svg)](https://github.com/seamapi/zoned-time/actions/workflows/check.yml)

A ZonedTime is a [PlainTime] with a [TimeZone], as specified in the [Temporal] proposal.

[PlainTime]: https://tc39.es/proposal-temporal/docs/plaintime.html
[TimeZone]: https://tc39.es/proposal-temporal/docs/timezone.html
[Temporal]: https://tc39.es/proposal-temporal/docs/

## Description

A `ZonedTime` is an input and output specification for representing a time of day and associated time zone.
The input specification is generous, allowing a natural specification of time e.g. `"3pm ET"`.
The output specification is strict, normalized, and simple to parse.

The implementation closely follows the other Temporal specifications
as a natural extension of the standard.

_A `ZonedTime` implements most of the same methods as `PlainTime`.
Some methods of `PlainTime` are still being evaluated for inclusion in `ZonedTime`._

## Motivation

- A time of day, without a reference to a particular date, is useful for the representation of recurring daily events or events that adapt to local time.
- `Temporal.PlainTime` is a promising standard for representing a time of day, but does not incorporate the time zone.
- Many contexts require a time zone to unambiguously interpret the time of day.
- There is no standard de-facto format for time of day that clearly incorporates time zone information, so a new standard or derivative standard is necessary.

### Alternatives

- ISO8601/RFC3339 is an excellent standard for representing a point in time.,
  but does not work well for representing recurring daily events such as a meeting that occurs every day at 9am.
- The iCal standard represents recurring events,
  but is not widely an accepted standard for representing simple daily recurring events.

## Installation

Add this as a dependency to your project using [npm] with

```
$ npm install zoned-time
```

[npm]: https://www.npmjs.com/

## Usage

```ts
import { ZonedTime } from 'zoned-time'

const zonedTime = ZonedTime.from('14:05:00[ET]')
zonedTime.toString() //=> ''
```

## Development and Testing

### Quickstart

```
$ git clone https://github.com/seamapi/zoned-time.git
$ cd zoned-time
$ nvm install
$ npm install
$ npm run test:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `npm run`.
View them with

```
$ npm run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:seamapi/zoned-time.git
```

[source code]: https://github.com/seamapi/zoned-time

### Requirements

You will need [Node.js] with [npm] and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ npm install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

### Publishing

#### Automatic

New versions are released automatically with [semantic-release]
as long as commits follow the [Angular Commit Message Conventions].

[Angular Commit Message Conventions]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format
[semantic-release]: https://semantic-release.gitbook.io/

#### Manual

Publish a new version by triggering a [version workflow_dispatch on GitHub Actions].
The `version` input will be passed as the first argument to [npm-version].

This may be done on the web or using the [GitHub CLI] with

```
$ gh workflow run version.yml --raw-field version=<version>
```

[GitHub CLI]: https://cli.github.com/
[npm-version]: https://docs.npmjs.com/cli/version
[version workflow_dispatch on GitHub Actions]: https://github.com/seamapi/zoned-time/actions?query=workflow%3Aversion

## GitHub Actions

_GitHub Actions should already be configured: this section is for reference only._

The following repository secrets must be set on [GitHub Actions]:

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `GH_TOKEN`: A personal access token for the bot user with
  `packages:write` and `contents:write` permission.
- `GIT_USER_NAME`: The GitHub bot user's real name.
- `GIT_USER_EMAIL`: The GitHub bot user's email.
- `GPG_PRIVATE_KEY`: The GitHub bot user's [GPG private key].
- `GPG_PASSPHRASE`: The GitHub bot user's GPG passphrase.

[GitHub Actions]: https://github.com/features/actions
[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

## Contributing

> If using squash merge, edit and ensure the commit message follows the [Angular Commit Message Conventions] specification.
> Otherwise, each individual commit must follow the [Angular Commit Message Conventions] specification.

1. Create your feature branch (`git checkout -b my-new-feature`).
2. Make changes.
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin my-new-feature`).
5. Create a new draft pull request.
6. Ensure all checks pass.
7. Mark your pull request ready for review.
8. Wait for the required approval from the code owners.
9. Merge when ready.

[Angular Commit Message Conventions]: https://semantic-release.gitbook.io/semantic-release/#commit-message-format

## License

This npm package is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.

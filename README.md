# SnapTrade Mobile App - Getting started

## Background

SnapTrade is a platform to do Stock analysis, research and trading (in future).

The mobile code is developed us ing [React Native](https://facebook.github.io/react-native/)

## Installation

### Prerequisite

1. Install [HomeBrew](https://brew.sh/).
2. `brew install node`
3. `brew install watchman`
4. `npm install -g expo-cli`
5. `brew install yarn`

### Editor

I recommend Atom.
[Setup Nuclide](https://jesperln.dk/how-to-setup-atom-with-nuclide-eslint-flow/)

### Running the App

1. Download Expo app on your phone for running the app there.
2. Run `yarn` in project root.
3. Run `expo start` from project root.

## Project structure

| Directory        | Group all these files                                            |
| ---------------- | ---------------------------------------------------------------- |
| `src`            | Directory for all source code                                    |
| `src/components` | Directory for shared components                                  |
| `src/config`     | Directory for shared config e.g. styles                          |
| `src/screens`    | Directory for each screen in the app, along with their reducers. |

### Adding a new module

We use **yarn** to install new react native modules.

## Recommended Reading

1. [Motivation](https://shift.infinite.red/react-native-faq-8dc5c1083baa) for using React.
2. React [Docs](https://reactjs.org/docs/hello-world.html).
3. React Native [Docs](https://facebook.github.io/react-native/docs/getting-started.html)
4. [Redux](https://redux.js.org/) for component/app state management.
5. [Organizing](https://medium.com/the-react-native-log/organizing-a-react-native-project-9514dfadaa0) react native project

# README #

## Installation
- git clone https://ramsuthar305@bitbucket.org/namdan-app/namdan-fe.git
- cd namdan-fe
- npm ci [It uses package-lock.json to install dependencies]
- npm start
- Then run `npm run android` in a separate terminal window.

## Branche Rules
- DO NOT PUSH DIRECTLY INTO MAIN
- Create branch of the your work with following rules
    - For feature - feature/[NAME OF THE FEATURE]
    - For update - update/[NAME OF THE UPDATE]
    - For bugFix - bugFix/[NAME OF THE BUGFIX]
- Raise PR
- Merge it

## Constants Rules
- No strings should be used directly in the component or screens
- All the constant string in the app should be exported from ./src/constants/[FILENAME of the screen]

## Styles Rule
- No inline style should be used
- Create file inside ./src/styles with name of the screen


# README #

## Installation
- sudo npm i -g expo-cli
- git clone https://ramsuthar305@bitbucket.org/namdan-app/namdan-fe.git
- cd namdan-fe
- npm install
- expo start

## Branche Rules
- DO NOT PUSH DIRECTLY INTO MASTER
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


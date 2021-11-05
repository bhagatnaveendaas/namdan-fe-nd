# README

## Installation

```
git clone https://github.com/Satlok-Ashram/namdan-fe.git
```
```
cd namdan-fe
```
```
npm ci
```
[npm ci uses package-lock.json to install dependencies]

```
npm start
```
Then run the following command in a separate terminal window:

```
npm run android
```
Optionally you can run the following in another terminal window, to see the output of console.log on your terminal:

```
npm run android:logs
```

## Standards and Norms
 - All the components and screens should be built in functional component/react hooks
 - Use Only Axios as http client
 - No api should be called directly from the components
 - Do not ignore eslint errors
 - Incase any external component is needed it should only be used from react-native-element library
 - Try to minimize as much warnings as possible
 - Do not use deprecated features

## Branche Rules
- DO NOT PUSH DIRECTLY INTO MAIN
- Create branch of the your work with following rules
    - For feature - feature/[NAME OF THE FEATURE]
    - For bugFix - bugFix/[NAME OF THE BUGFIX]
- Raise PR
- Merge it

## Constants Rules
- No strings should be used directly in the component or screens
- All the constant string in the app should be exported from ./src/constants/[FILENAME of the screen]

## Styles Rule
- No inline style should be used.
- Create file in the respective component.

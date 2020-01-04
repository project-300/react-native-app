# react-native-app

Before committing code to GitHub, run TSLint tests on your code.

**Prerequisites:** Have `tslint` and `typescript` installed.

Run `tslint --project .` within the project folder. Then correct any errors.

## Setup

In order to run your own local version of the app, make sure to add the environment variables.

- Go to the `/environment` directory
- Copy the `env.tpl.ts` template file
- Name the new file `env.ts`
- Fill in the URL and Config values

## MacOS

Running an iOS simulator is very easy. Android can cause issues.

Using the latest version of Java can and probably will cause issues.
Use an older version (8) to run the app.

If you get this error, your Java version is incorrect.
```
General error during semantic analysis: Unsupported class file major version 57
```

https://nandovieira.com/setting-up-react-native-on-macos-mojave

This may not be a Mac specific issue, but run this within the `android` directory.
Replace `USERNAME` with the username of your machine profile. 
```
echo "sdk.dir = /Users/USERNAME/Library/Android/sdk" > local.properties
```

This create a file that points to the Android SDK.

## Serverless Offline
If you want to connect to a locally running instance of the serverless API, change the IS_OFFLINE
variable in the .env file to true.

## New Screen With Redux

- Create appropriate directory
- Create index.tsx
- Create interfaces.ts
- Create styles.ts
- Add Styles, Props and State interfaces to interfaces.ts
- Create Styles in styles.ts

`The Styles must match the Styles interface. Any changes to either means you have to alter the other.`

- Adding Redux
    - Create Redux action file in the appropriate directory
    - Create Redux reducer file in the appropriate directory
    - Figure out what actions will take place on the screen that require Redux (state management)
    - Create these action functions
    - Add these actions constants to `src/constants/redux-actions.ts`
    - Add these actions types to `src/types/redux-action-types.ts`
        - Create a component type which references each action type
        - Add the component type to the AppActions 
    - If you're using HTTP calls
        - Add the expected HTTP result interface(s) to `src/types/http-responses.ts`
        - Add the HTTP call to the HttpAPI in `src/api/http.ts`
        - Add the HTTP API URL path to `src/constants/api-paths.ts`
    - Export all from the actions index.ts
    - Create the Reducer
        - Add the reducer state type to `src/types/redux-reducer-state-types.ts`
        - Add an initial state
    - Combine the Reducer in the reducers index.ts

- Create component
    - The state must match the State interface
    - Anything you want to access via `this.props` must have been added to the Props interface
    - Import the Action(s) 
    - Map the Actions to Props (mapDispatchToProps)
    - Map the State to Props (mapStateToProps) by `...state.{{reducer_name}}`

- If you are using Redux and mapping actions (mapDispatchToProps), ensure you add a definition for these action functions to the Props interface
- Interface definitions must be exact - If undefined or null is possible, make sure you state that

```
I may have missed one or two small points - Please update if you spot anything.

If you miss any of the steps, you will most likely have a lot of reference, type or linting errors

Referencing any state values managed by Redux is obtained using this.props, not this.state

Also, be aware that not every screen or component will need Redux, but most will.

It may only require component state management, using this.state

Dispatch Redux actions within the main Action being called wherever possible to reduce the code and references within the component.
```

## Maps

To use Google Maps types, add this line to the top of your file.

Include the forward slashes (3) - This is not a comment. It is a reference.

```
/// <reference types="@types/googlemaps" />
```

Or use the `/src/types/maps.ts` types. 

If a type does not exist in this file, add it for convenience.

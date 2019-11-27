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


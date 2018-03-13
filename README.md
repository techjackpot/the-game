# React Native Firebase Starter<a href="https://rnfirebase.io"><img align="left" src="http://i.imgur.com/01XQL0x.png"></a>

[![Backers on Open Collective](https://opencollective.com/react-native-firebase/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/react-native-firebase/sponsors/badge.svg)](#sponsors)
[![npm version](https://img.shields.io/npm/v/react-native-firebase.svg?style=flat-square)](https://www.npmjs.com/package/react-native-firebase)
[![NPM downloads](https://img.shields.io/npm/dm/react-native-firebase.svg?style=flat-square)](https://www.npmjs.com/package/react-native-firebase)
[![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg?style=flat-square)](https://discord.gg/C9aK28N)
[![Twitter Follow](https://img.shields.io/twitter/follow/rnfirebase.svg?style=social&label=Follow)](https://twitter.com/rnfirebase)

---

A basic react native app with [`react-native-firebase`](https://github.com/invertase/react-native-firebase) pre-integrated  to get you started quickly.

---


### Getting Started

If you're only developing for one platform you can ignore the steps below that are tagged with the platform you don't require.

#### 1) Clone & Install Dependencies

- 1.1) Install NPM packages with your package manager of choice - i.e run `yarn` or `npm install`
- 1.2) **[iOS]** `cd ios` and run `pod install` - if you don't have CocoaPods you can follow [these instructions](https://guides.cocoapods.org/using/getting-started.html#getting-started) to install it.
- 1.3) **[Android]** No additional steps for android here.

#### 2) Start your app

- 2.1) Start the react native packager, run `yarn run start` or `npm start` from the root of your project.
- 2.2) **[iOS]** Build and run the iOS app, run `npm run ios` or `yarn run ios` from the root of your project. The first build will take some time. This will automatically start up a simulator also for you on a successful build if one wasn't already started.
- 2.3) **[Android]** If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `npm run android` or `yarn run android` from the root of your project.

### License

- See [LICENSE](/LICENSE)

### FYI

- 1. 1) If you don't see `ios/GoogleService-Info.plist` and `android/app/google-services.json`, contact to administrator to get these files.
- 2. 2) **[Android]** You will need to have JDK 8.0 installed. (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html : `Java SE Development Kit 8u162`)
  		Useful Resource: Setting Up React Native android without Android Studio (https://medium.com/surabayadev/setting-up-react-native-android-without-android-studio-35a496e1dfa3)
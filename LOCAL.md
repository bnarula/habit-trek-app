# Local Development Setup

To run this React Native app locally, ensure you have the following tools and dependencies installed and configured on your system.

## Prerequisites

### 1. Homebrew (macOS only)
Install [Homebrew](https://brew.sh/) if you haven't already:
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Node.js & Watchman
- **Node.js**: Version 18.18 or newer is required.
- **Watchman**: Improves file watching performance (recommended for macOS).

Install both with Homebrew:
```sh
brew install node
brew install watchman
```

### 3. Java Development Kit (JDK)
- **JDK 17** is recommended for Android builds.

Install with Homebrew:
```sh
brew install --cask zulu@17
```
After installation, set your `JAVA_HOME` in your shell config (e.g., `~/.zshrc`):
```sh
export JAVA_HOME="/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home"
```

### 4. Android Studio & Android SDK
- Download and install [Android Studio](https://developer.android.com/studio).
- During installation, ensure the following are checked:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (AVD)
- After installation, open Android Studio and use the SDK Manager to install:
  - **Android 15 (VanillaIceCream) SDK**
  - **Android SDK Platform 35**
  - **Android SDK Build-Tools 35.0.0**

#### Environment Variables (add to `~/.zshrc` or `~/.bash_profile`):
```sh
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools"
```

#### Verify adb (Android Debug Bridge):
```sh
adb --version
```
If not found, ensure `platform-tools` is in your `PATH` as above.

#### Emulator/Device Setup:
- Use AVD Manager in Android Studio to create and start a virtual device.
- Or connect a physical device with USB debugging enabled.
- Verify device connection:
```sh
adb devices
```

### 5. Xcode (macOS, for iOS development)
- Install the latest [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from the Mac App Store.
- Open Xcode and install Command Line Tools (Xcode > Settings > Locations > Command Line Tools).
- Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html):
```sh
sudo gem install cocoapods
```

### 6. Project Dependencies
Install JS dependencies:
```sh
npm install
# or
yarn install
```

For iOS native dependencies:
```sh
cd ios
pod install
cd ..
```

---

For more details, see the official [React Native Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment).

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
# Setup Guide

This guide will help you set up and run the M43x2 project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **macOS** (for iOS development) or **Linux/Windows** (for Android only)
- **Git**
- **[mise](https://mise.jdx.dev/)** - A version manager for managing multiple runtime versions (recommended)

## Quick Setup with mise (Recommended)

This project uses [mise](https://mise.jdx.dev/) to manage development tool versions, ensuring consistency across all contributors.

### 1. Install mise

```bash
# Install mise (if not already installed)
curl https://mise.run | sh

# Or using Homebrew on macOS
brew install mise

# Add mise to your shell (follow instructions from mise installation)
echo 'eval "$(mise activate bash)"' >> ~/.bashrc   # for bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc    # for zsh
```

### 2. Clone the Repository

```bash
git clone <repository-url>
cd project-m43x2/code
```

### 3. Install Required Tools

The project will automatically install the correct versions when you enter the `code` directory:

```bash
cd code
mise install  # Installs Node.js 20.19.5, Ruby 3.2.2, and Java openjdk-17
```

### 4. Install Dependencies

```bash
# Install Node.js dependencies
yarn install

# Install iOS dependencies (macOS only)
cd ios
pod install
cd ..
```

### 5. Configuration

Create your environment configuration:

```bash
# Copy the template
cp app.config.template.js app.config.js

# Edit app.config.js and add your API keys and configuration
```

## Running the App

### Development Mode

```bash
# Start the development server
yarn start:dev

# Run on iOS (macOS only)
yarn ios:dev

# Run on Android
yarn android:dev
```

### Other Environments

```bash
# Staging
yarn start:staging
yarn ios:staging
yarn android:staging

# Production
yarn start:prod
yarn ios:prod
yarn android:prod
```

## Manual Setup (Without mise)

If you prefer not to use mise, ensure you have the following versions installed manually:

- **Node.js**: v20.19.5 (check `.nvmrc`)
- **Ruby**: v3.2.2 (check `.ruby-version`)
- **Java**: openjdk-17 (for Android)

### Using nvm and rbenv

```bash
# Install Node.js version
nvm install 20.19.5
nvm use 20.19.5

# Install Ruby version
rbenv install 3.2.2
rbenv local 3.2.2

# Then follow steps 4-5 from the Quick Setup
```

## Troubleshooting

### iOS Build Issues

```bash
# Clean iOS build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

### Metro Bundler Cache Issues

```bash
# Clear Metro bundler cache
yarn start --clear
```

## Project Structure

- `/code` - Main application code
  - `/src` - Source code (components, screens, hooks, etc.)
  - `/ios` - iOS native code
  - `/android` - Android native code
  - `/assets` - Images, fonts, and other static assets

## Available Scripts

- `yarn start` - Start Expo development server
- `yarn start:dev` - Start in development mode
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors automatically

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [mise Documentation](https://mise.jdx.dev/)

## Need Help?

If you encounter any issues during setup, please:

1. Check the existing GitHub issues
2. Create a new issue with details about your environment and the error message

---

Built with ❤️ by the M43 community

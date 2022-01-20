#!/usr/bin/env bash
echo "Starting bootstrapping..."

# Check for Homebrew, install if we don't have it
if test ! $(which brew); then
    echo "Installing Homebrew..."
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Update homebrew recipes

echo "Update Brew..."
brew update

# Check for Node, install if we don't have it
if test ! $(which node); then
    echo "Installing Node..."
    brew install node
fi

echo "Wiping all old version of Brew dependencies..."
brew remove ideviceinstaller
brew remove ios-webkit-debug-proxy
brew remove libimobiledevice
brew remove ios-deploy
brew remove usbmuxd

echo "Installing packages..."
brew install carthage
brew install --HEAD usbmuxd
brew install --HEAD libimobiledevice
brew install --HEAD ideviceinstaller
brew install ios-webkit-debug-proxy
brew install ios-deploy
echo "Installing fastlane for setting up WebDriverAgent of Appium..."
brew cask install fastlane

xcode-select --install

echo "Cleaning up..."
brew cleanup

echo "Bootstrapping complete"

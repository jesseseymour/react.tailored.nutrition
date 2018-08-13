# Iams Tailored Nutrition React Application

## Requirements

For development, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/epsilondigital/EA-Mars-Iams-TailoredNutrition.git
    $ cd EA-Mars-Iams-TailoredNutrition
    $ npm install
    
### Configure app

The app is configured to ping a web service on the [Iams dev website](https://iams-develop.catapultstaging.com). You can change this setting in `webpack.dev.js` if you wish to run the site locally.
The web service is used to fetch survey questions, submit user answers, and fetch the product recommendations. The surveys and recommendations can be edited in Sitefinity under `Content - Tailored Nutrition`

## Start & watch

    $ npm run dev

## Simple build for production

    $ npm run build

**Note:** Be sure to edit the build path in `build.sh`

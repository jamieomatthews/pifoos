# Pongbot
This is basically a clone of Slack Pongbot (https://github.com/andrewvy/slack-pongbot) which will be editied to use a raspberri pi to track scores.  A web page will be served out of the pi which can keep track of teams, and scores.


# Development
To setup pifoos on your computer, clone the git repo to your computer.  Then run ```npm install``` in the root directory to install some dependencies.  

The app uses Mongodb, so you will need to install mongo before running the app.

```
brew update
brew install mongodb
```

Then, make sure mongo will launch
```
ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```

That should be it for setting up mongo, so you should be able to now run the app.

```
node app.js
```


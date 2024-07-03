# Loggage
A simple logging library for Node.js. This package is used with [CountBot](https://count.bot) and open sourced for public use.

# Install
Install loggage by entering `npm i @countbot/loggage` into your CLI.

# Usage
```ts
const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, logToFile: false });

loggage.warning('This is a warning message');
```

# Output
![image](https://github.com/Count-Bot/loggage/assets/31144090/854c0c47-2e39-4d82-9bf5-5ffb92783b6b)

# Usage
> Run locally


## Development
To serve the front-end app.
```
npm run serve
```

To start the backend app.
```
npm run backend
```

## Compiles and minifies for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```

## Queue Admin
If you have logged into Heroku, you can connect to the Dyno running the app to
run commands.

```
heroku ps:exec
```

This will bring up a Bash shell, from where you can run queue admin commands.
For example, to create a queue.

```
./cli queue create "My Queue"
```

For a full list of commands you can run

```
./cli help
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

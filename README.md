# keep-open

A CLI tool to keep the forwarded ports (e.g. with SSH or Kubernetes) connected; a cross platform equivalent of

```sh
while true; do sleep $SECONDS; nc -vz $HOST $PORT; done
```

Periodically sends empty package to a given list of server / ports.

## Usage

One-time run without installation:

```sh
npx keep-open -p localhost:1234 localhost:4321
```

Specify custom interval (default is 60s) and initial waiting time (default is 60s):

```sh
npx keep-open -p localhost:1234 localhost:4321 -w 10 -i 10
```

## Install globally

```
npm i -g keep-open
```

## Use in project

```
npm i -D keep-open
```

Then, can be used within the `package.json`'s scripts.

Plays nicely with `npm-run-all`: can be run in parallel with npm scripts.

## License

[MIT](LICENSE.md)

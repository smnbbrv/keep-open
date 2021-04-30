#!/usr/bin/env node

const { Socket } = require('net');
const { Command } = require('commander');

const commander = new Command();

commander.requiredOption('-p, --ports <ports...>', 'an array of `host:port` combinations to keep connected to, e.g. localhost:1234');
commander.option('-w, --wait <interval>', 'interval to wait before sending the first package, seconds', 60);
commander.option('-i, --interval <interval>', 'interval to send the empty package, seconds', 60);
commander.option('-v, --verbose', 'enables verbose output', false);

commander.parse(process.argv);

const { ports, interval, verbose, wait } = commander.opts();

ports.forEach(hostPort => {
  const [host, port] = hostPort.split(':');

  verbose && console.log(`Waiting ${wait}s to connect to ${hostPort}`);

  setTimeout(() => {
    function send() {
      const client = new Socket();

      client.connect(port, host, () => {
        verbose && console.log(`Connected to ${hostPort}`);

        client.write(new Uint8Array());

        verbose && console.log(`Sent message to to ${hostPort}, closing connection...`);

        client.destroy();
      });

      client.on('error', (error) => {
        console.error(`Error: cannot connect to ${hostPort}, next attempt in ${interval}s`);
        verbose && console.error(error);
      })
    }

    send();
    setInterval(() => send(host, port), interval * 1e3);
  }, wait * 1e3);
});

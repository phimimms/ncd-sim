import dotenv from 'dotenv';
import net from 'net';

_subscribeToNodeProcess();

dotenv.config();

const server = net.createServer();

server.on('connection', _handleConnection);

const port = Number.isInteger(+process.env.PORT) ? +process.env.PORT : 2040;

server.listen(port, () => {
  console.log('Listening to %j', server.address());
});

function _handleConnection(connection) {
  const remoteAddress = `${connection.remoteAddress}:${connection.remotePort}`;

  console.log('New connection from %s', remoteAddress);

  connection.on('data', onConnectionData);
  connection.once('close', onConnectionClose);
  connection.on('error', onConnectionError);

  function onConnectionData(data) {
    console.log('Data from %s: %j', remoteAddress, data);
  }

  function onConnectionClose() {
    console.log('Connection from %s closed', remoteAddress);
  }

  function onConnectionError(error) {
    console.log('Error occurred in connection from %s: %s', remoteAddress, error.message);
  }
}

async function _onEndProcess() {
  await new Promise<void>((resolve) => {
    if (!server.listening) {
      resolve();

      return;
    }

    server.close((error) => {
      if (error) {
        console.log('Error occurred upon closing server: %s', error.message);
      }

      resolve();
    });
  });

  process.exit();
}

function _subscribeToNodeProcess() {
  process.stdin.resume();

  process.on('SIGINT', _onEndProcess);
  process.on('SIGUSR1', _onEndProcess);
  process.on('uncaughtException', _onEndProcess);
}

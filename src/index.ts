import { Buffer } from 'buffer';
import dotenv from 'dotenv';
import net from 'net';

import { Command, CommandPayload } from './commands';

_subscribeToNodeProcess();

dotenv.config();

const server = net.createServer();

server.on('connection', _handleConnection);

const port = Number.isInteger(+process.env.PORT) ? +process.env.PORT : 2040;

const state = {
  relay1: Number.isInteger(+process.env.RELAY_1) ? +process.env.RELAY_1 : 0,
  relay2: Number.isInteger(+process.env.RELAY_2) ? +process.env.RELAY_2 : 0,
  relay3: Number.isInteger(+process.env.RELAY_3) ? +process.env.RELAY_3 : 0,
  relay4: Number.isInteger(+process.env.RELAY_4) ? +process.env.RELAY_4 : 0,
  adc1: Number.isInteger(+process.env.ADC_1) && !!+process.env.ADC_1,
  adc2: Number.isInteger(+process.env.ADC_2) && !!+process.env.ADC_2,
  adc3: Number.isInteger(+process.env.ADC_3) && !!+process.env.ADC_3,
  adc4: Number.isInteger(+process.env.ADC_4) && !!+process.env.ADC_4,
  adc5: Number.isInteger(+process.env.ADC_5) && !!+process.env.ADC_5,
  adc6: Number.isInteger(+process.env.ADC_6) && !!+process.env.ADC_6,
  adc7: Number.isInteger(+process.env.ADC_7) && !!+process.env.ADC_7,
  adc8: Number.isInteger(+process.env.ADC_8) && !!+process.env.ADC_8,
};

server.listen(port, () => {
  console.log('Listening to %j', server.address());
});

function _handleConnection(connection: net.Socket) {
  const remoteAddress = `${connection.remoteAddress}:${connection.remotePort}`;

  console.log('New connection from %s', remoteAddress);

  connection.on('data', onConnectionData);
  connection.once('close', onConnectionClose);
  connection.on('error', onConnectionError);

  function onConnectionData(data: Buffer) {
    const request: number[] = [ ...data ];

    const [ command ] = Object.entries(CommandPayload).find(([ , payload ]) => (
      request.length === payload.length && request.every((value, index) => value === payload[index])
    ));

    _updateRelayState(command);

    connection.write(_generateResponse(command));
  }

  function onConnectionClose() {
    console.log('Connection from %s closed', remoteAddress);
  }

  function onConnectionError(error) {
    console.log('Error occurred in connection from %s: %s', remoteAddress, error.message);
  }
}

function _generateResponse(command: Command[keyof Command]): Buffer { // eslint-disable-line complexity
  switch (command) {
    case Command.CLOSE_ALL_RELAYS:
    case Command.CLOSE_RELAY_1:
    case Command.CLOSE_RELAY_2:
    case Command.CLOSE_RELAY_3:
    case Command.CLOSE_RELAY_4:
    case Command.OPEN_ALL_RELAYS:
    case Command.OPEN_RELAY_1:
    case Command.OPEN_RELAY_2:
    case Command.OPEN_RELAY_3:
    case Command.OPEN_RELAY_4:
      return Buffer.from([ 170, 1, 85, 0 ]);
    case Command.READ_RELAY_1:
      return Buffer.from([ 170, 1, state.relay1, state.relay1 ? 172 : 171 ]);
    case Command.READ_RELAY_2:
      return Buffer.from([ 170, 1, state.relay2, state.relay2 ? 172 : 171 ]);
    case Command.READ_RELAY_3:
      return Buffer.from([ 170, 1, state.relay3, state.relay3 ? 172 : 171 ]);
    case Command.READ_RELAY_4:
      return Buffer.from([ 170, 1, state.relay4, state.relay4 ? 172 : 171 ]);
    case Command.READ_ADC_1:
    case Command.READ_ADC_2:
    case Command.READ_ADC_3:
    case Command.READ_ADC_4:
    case Command.READ_ADC_5:
    case Command.READ_ADC_6:
    case Command.READ_ADC_7:
    case Command.READ_ADC_8:
      return Buffer.from([ 170, 2, 255, 255, 170 ]);
    default:
      return Buffer.from([ 170, 1, 0, 171 ]);
  }
}

function _updateRelayState(command: Command[keyof Command]) {
  switch (command) {
    case Command.CLOSE_ALL_RELAYS:
      state.relay1 = 0;
      state.relay2 = 0;
      state.relay3 = 0;
      state.relay4 = 0;

      break;
    case Command.CLOSE_RELAY_1:
      state.relay1 = 0;

      break;
    case Command.CLOSE_RELAY_2:
      state.relay2 = 0;

      break;
    case Command.CLOSE_RELAY_3:
      state.relay3 = 0;

      break;
    case Command.CLOSE_RELAY_4:
      state.relay4 = 0;

      break;
    case Command.OPEN_ALL_RELAYS:
      state.relay1 = 1;
      state.relay2 = 1;
      state.relay3 = 1;
      state.relay4 = 1;

      break;
    case Command.OPEN_RELAY_1:
      state.relay1 = 1;

      break;
    case Command.OPEN_RELAY_2:
      state.relay2 = 1;

      break;
    case Command.OPEN_RELAY_3:
      state.relay3 = 1;

      break;
    case Command.OPEN_RELAY_4:
      state.relay4 = 1;

      break;
  }
}

async function _onEndProcess() {
  await new Promise<void>((resolve) => {
    if (!server?.listening) {
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

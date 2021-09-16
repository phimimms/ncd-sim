# NCD Relay Simulator

## System Requirements

* [NodeJS](https://nodejs.org/en/download/current/)

## Installation

1. Download the latest [package](https://github.com/phimimms/ncd-sim/packages/904085) // TODO:
2. Extract the compressed download
3. Open a terminal to the extracted package directory
4. Run the TCP server via `node index.js`

## Usage

Prior to running the TCP server, the `.env` file can be edited to configure the behavior of the NCD Relay simulator.

* `PORT` - The port number of the TCP server
* `RELAY_X` - The initial state of the relay where `X` is the relay number (`1 - 4`)
  * `0` - The relay is off
  * `1` - The relay is on
* `FAN_X` - Indicates whether the fan will be simulated where `X` is the fan channel (`1 - 3`)
  * `0` - The fan will not be simulated
  * `1` - The fan will be simulated
* `TEMP_X` - Indicates whether the thermometer will be simulated where `X` is the thermometer channel (`1 - 2`)
  * `0` - The thermometer will not be simulated
  * `1` - The thermometer will be simulated
* `TEMP_BASE` - The base value of the simulated temperature readings
* `TEMP_VARIANCE` - The absolute variance of the simulated temperature readings

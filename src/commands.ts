export enum Command {
  CLOSE_ALL_RELAYS = 'CLOSE_ALL_RELAYS',
  OPEN_ALL_RELAYS = 'OPEN_ALL_RELAYS',

  CLOSE_RELAY_1 = 'CLOSE_RELAY_1',
  CLOSE_RELAY_2 = 'CLOSE_RELAY_2',
  CLOSE_RELAY_3 = 'CLOSE_RELAY_3',
  CLOSE_RELAY_4 = 'CLOSE_RELAY_4',

  OPEN_RELAY_1 = 'OPEN_RELAY_1',
  OPEN_RELAY_2 = 'OPEN_RELAY_2',
  OPEN_RELAY_3 = 'OPEN_RELAY_3',
  OPEN_RELAY_4 = 'OPEN_RELAY_4',

  READ_RELAY_1 = 'READ_RELAY_1',
  READ_RELAY_2 = 'READ_RELAY_2',
  READ_RELAY_3 = 'READ_RELAY_3',
  READ_RELAY_4 = 'READ_RELAY_4',

  READ_ADC_1 = 'READ_ADC_1',
  READ_ADC_2 = 'READ_ADC_2',
  READ_ADC_3 = 'READ_ADC_3',
  READ_ADC_4 = 'READ_ADC_4',
  READ_ADC_5 = 'READ_ADC_5',
  READ_ADC_6 = 'READ_ADC_6',
  READ_ADC_7 = 'READ_ADC_7',
  READ_ADC_8 = 'READ_ADC_8',
}

export const CommandPayload: Record<Command, readonly number[]> = {
  [Command.CLOSE_ALL_RELAYS]: [ 170, 3, 254, 129, 1, 45 ],
  [Command.OPEN_ALL_RELAYS]: [ 170, 3, 254, 130, 1, 46 ],

  [Command.CLOSE_RELAY_1]: [ 170, 3, 254, 100, 1, 16 ],
  [Command.CLOSE_RELAY_2]: [ 170, 3, 254, 101, 1, 17 ],
  [Command.CLOSE_RELAY_3]: [ 170, 3, 254, 102, 1, 18 ],
  [Command.CLOSE_RELAY_4]: [ 170, 3, 254, 103, 1, 19 ],

  [Command.OPEN_RELAY_1]: [ 170, 3, 254, 108, 1, 24 ],
  [Command.OPEN_RELAY_2]: [ 170, 3, 254, 109, 1, 25 ],
  [Command.OPEN_RELAY_3]: [ 170, 3, 254, 110, 1, 26 ],
  [Command.OPEN_RELAY_4]: [ 170, 3, 254, 111, 1, 27 ],

  [Command.READ_RELAY_1]: [ 170, 3, 254, 116, 1, 32 ],
  [Command.READ_RELAY_2]: [ 170, 3, 254, 117, 1, 33 ],
  [Command.READ_RELAY_3]: [ 170, 3, 254, 118, 1, 34 ],
  [Command.READ_RELAY_4]: [ 170, 3, 254, 119, 1, 35 ],

  [Command.READ_ADC_1]: [ 170, 2, 254, 158, 72 ],
  [Command.READ_ADC_2]: [ 170, 2, 254, 159, 73 ],
  [Command.READ_ADC_3]: [ 170, 2, 254, 160, 74 ],
  [Command.READ_ADC_4]: [ 170, 2, 254, 161, 75 ],
  [Command.READ_ADC_5]: [ 170, 2, 254, 162, 76 ],
  [Command.READ_ADC_6]: [ 170, 2, 254, 163, 77 ],
  [Command.READ_ADC_7]: [ 170, 2, 254, 164, 78 ],
  [Command.READ_ADC_8]: [ 170, 2, 254, 165, 79 ],
} as const;

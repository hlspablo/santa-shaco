import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { SetupModel } from './Setup';

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  setup: types.optional(SetupModel, {
    // Ensure all required string properties have default values
    ownerName: '',
    ownerAgency: '',
    ownerAccount: '',
    ownerCPF: '',
    ownerBank: '',
    ownerCard: '0602',
    balance: 0,
    clientBank: '',
    clientCPF: '',
    clientName: '',
    clientPix: '',
    lastTransactionAuthCode: '',
    lastTransactionNumber: '',
    lastTransactionTime: '',
    transferValue: 0,
  }),
});

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>;
/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;

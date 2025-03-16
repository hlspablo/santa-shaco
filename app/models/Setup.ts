import { formatToday, formatToday2, gRS, generateRandomNumbers } from "@/utils/format";
import { types, SnapshotIn } from "mobx-state-tree";

export const SetupModel = types
    .model("SetupModel", {
        ownerName: types.string,
        ownerAgency: types.string,
        ownerAccount: types.string,
        ownerCPF: types.string,
        ownerBank: types.string,
        ownerCard: types.string,
        balance: types.number,
        clientName: types.string,
        clientPix: types.string,
        clientCPF: types.string,
        clientBank: types.string,
        transferValue: types.number,
        lastTransactionNumber: types.string,
        lastTransactionTime: types.string,
        lastTransactionAuthCode: types.string,
    })
    .actions(self => ({
        setSetupData(data: SnapshotIn<typeof self>) {
            Object.assign(self, data);
        },
        withdraw() {
            const authCode = `${gRS(10)}${gRS(10)}${gRS(3)}`.toUpperCase();
            const transaction = `E${generateRandomNumbers(30)}`;
            const latestTime = formatToday2();
            self.balance -= self.transferValue;
            self.lastTransactionAuthCode = authCode;
            self.lastTransactionNumber = transaction;
            self.lastTransactionTime = latestTime;
        },
        setTransferValue(value: number) {
            self.transferValue = value;
        },
    }));

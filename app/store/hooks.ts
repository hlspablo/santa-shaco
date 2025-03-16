import { useAtom, useSetAtom, useAtomValue } from 'jotai';

import {
  setupAtom,
  balanceAtom,
  transferValueAtom,
  withdrawAction,
  setSetupDataAction,
  SetupData,
} from './atoms';

// This is a replacement for the useStores hook to maintain code compatibility
export function useSetup() {
  const setup = useAtomValue(setupAtom);
  const [, setBalance] = useAtom(balanceAtom);
  const [, setTransferValue] = useAtom(transferValueAtom);
  const [, withdrawFn] = useAtom(withdrawAction);
  const [, setSetupData] = useAtom(setSetupDataAction);

  return {
    setup: {
      ...setup,
      setTransferValue,
      withdraw: () => withdrawFn(),
      setSetupData: (data: Partial<SetupData>) => setSetupData(data),
    },
  };
}

import { ForceAny } from '@shared/typescript/utility.types';

export interface DownloadProgress {
  percent: number;
  transferred: number; // MB
  total: number; // MB
  speed: number; // KB/s
}

type TEventCb<TData = ForceAny> = (event: string, data: TData) => void;

export interface ElectronOnEventFn {
  onLogFromElectron: (callback: TEventCb) => Promise<void>;
  onDownloadProgress: (callback: TEventCb<DownloadProgress>) => Promise<void>;
}

export interface ElectronHandleEventFn {
  getAppVersion: () => Promise<string>;
}

declare global {
  interface Window {
    electron: ElectronOnEventFn &
      ElectronHandleEventFn & {
        removeListener: (event: string, callback: ForceAny) => Promise<void>;
      };
    folderManager: {
      createClientFolder: (clientName: string) => Promise<string>;
      viewClientFolders: () => Promise<string[]>;
      openFolderDialog: () => Promise<string>;
    };
  }
}

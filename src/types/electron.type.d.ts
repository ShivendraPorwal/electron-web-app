import { DownloadProgress, OsInfo } from '@shared/types';
import { ForceAny } from '@shared/typescript';

type TEventCb<TData = ForceAny> = (event: string, data: TData) => void;

export interface ElectronOnEventFn {
  onLogFromElectron: (callback: TEventCb) => Promise<void>;
  onDownloadProgress: (callback: TEventCb<DownloadProgress>) => Promise<void>;
  onRouteChange: (callback: TEventCb<string>) => Promise<void>;
}

export interface ElectronHandleEventFn {
  getAppVersion: () => Promise<string>;
  getOsInfo: () => Promise<OsInfo>;
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
      selectAndCreateClientFolder: (clientName: string) => Promise<string>;
      deleteClientFolder: (clientName: string) => Promise<string>;
    };
  }
}

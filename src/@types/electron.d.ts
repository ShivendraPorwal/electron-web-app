export {};

export type DownloadProgress = {
  percent: number;
  transferred: number; // MB
  total: number; // MB
  speed: number; // KB/s
};

type TEventCb<TData = any> = (event: string, data: TData) => void;

export type ElectronOnEventFn = {
  onLogFromElectron: (callback: TEventCb) => Promise<void>;
  onDownloadProgress: (callback: TEventCb<DownloadProgress>) => Promise<void>;
};

export type ElectronHandleEventFn = {
  getAppVersion: () => Promise<string>;
};

declare global {
  interface Window {
    electron: ElectronOnEventFn &
      ElectronHandleEventFn & {
        removeListener: (event: string, callback: any) => Promise<void>;
      };
    folderManager: {
      createClientFolder: (clientName: string) => Promise<string>;
      viewClientFolders: () => Promise<string[]>;
      openFolderDialog: () => Promise<string>;
    };
  }
}

export {};

export type DownloadProgress = {
  percent: number;
  transferred: number; // MB
  total: number; // MB
  speed: number; // KB/s
};

type TEventCb<TData = any> = (event: string, data: TData) => void;

export type ElectronEventFn = {
  onLogFromElectron: (callback: TEventCb) => Promise<void>;
  onDownloadProgress: (callback: TEventCb<DownloadProgress>) => Promise<void>;
};

declare global {
  interface Window {
    electron: ElectronEventFn & {
      removeListener: (event: string, callback: any) => Promise<void>;
      getAppVersion: () => Promise<string>;
    };
  }
}

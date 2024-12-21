export {};

export type DownloadProgress = {
  percent: number;
  transferred: number; // MB
  total: number; // MB
  speed: number; // KB/s
};

declare global {
  interface Window {
    electron: {
      removeListener: (event: string) => Promise<void>;

      getAppVersion: () => Promise<string>;
      onLogFromElectron: (
        callback: (event: string, message: any) => void
      ) => Promise<void>;
      onDownloadProgress: (
        callback: (event: string, data: DownloadProgress) => void
      ) => Promise<void>;
    };
  }
}

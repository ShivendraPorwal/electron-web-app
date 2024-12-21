export {};

declare global {
  interface Window {
    electron: {
      getAppVersion: () => Promise<string>;
    };
  }
}

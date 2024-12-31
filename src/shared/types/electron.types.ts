import { SuggestionString } from '@shared/typescript';

export interface DownloadProgress {
  percent: number;
  transferred: number; // MB
  total: number; // MB
  speed: number; // KB/s
}

export interface OsInfo {
  type: 'Linux' | 'Darwin' | 'Windows_NT';
  platform: 'linux' | 'darwin' | 'win32';
  architecture: SuggestionString<'x64' | 'arm64'>;
  version: string;
}

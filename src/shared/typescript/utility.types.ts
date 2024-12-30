import { SelectItem } from 'primeng/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ForceAny = any;

export type Nullable<T> = T | null;

export type ObjectUnknown = Record<string, unknown>;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type Noop = () => void;

export type ArrayValue<T extends { value: string }[]> = T[number]['value'];

export type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'help'
  | 'danger';

export type Position =
  | 'center'
  | 'left'
  | 'top'
  | 'bottom'
  | 'right'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

/**
 * Makes object properties Nullable
 */
export type NullableProperties<T> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Object keys leaves
 * @example 'user.name.first'
 */
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

/**
 * Path of the key in an nested object as an array
 */
export type PathArray<T> = T extends object
  ? { [K in keyof Required<T>]: [K, ...PathArray<Required<T[K]>>] }[keyof T]
  : [];

export type DefaultAllType =
  | object
  | undefined
  | string
  | number
  | boolean
  | null;

/**
 * Its a string type with intellisense
 */
export type SuggestionString<TKey extends string> =
  | TKey
  | (string & NonNullable<unknown>);

/**
 * Record with undefined value
 */
export type PartialRecord<K extends string | number | symbol, T> = Partial<
  Record<K, T>
>;

/**
 * Utility type that enforces exclusivity of properties in an object, allowing only one property at a time.
 * @template T - The input object type.
 */
export type ExclusiveProperty<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  } & {
    [Q in Exclude<keyof T, K>]?: never;
  };
}[keyof T];

/**
 * Make object properties required
 */
export type DefinedProperties<T> = {
  [K in keyof T]: Exclude<T[K], null | undefined>;
};

export type NoTrailingSegment<
  TSeg extends string,
  TValue extends string
> = TValue extends `${string}${TSeg}` ? never : TValue;

export type Option<
  T extends string | number | boolean = string,
  TOption = Record<string, ForceAny>
> = {
  label: string;
  value: T;
  inactive?: boolean;
} & TOption;

export interface ExtractGroupOptionConfig<DType = Record<string, ForceAny>> {
  headingId: keyof DType;
  mapping?: { label: keyof DType; value: keyof DType };
  mappingFn?: (item: DType) => SelectItem;
  isIncludeAll?: boolean;
}

export type Optionalify<T> = { [P in keyof T]?: T[P] };

export interface ToastConfirmationConfig {
  key: 'confirm';
  sticky: true;
  severity: 'error' | 'info' | 'success';
  summary: string;
  detail: string;
}

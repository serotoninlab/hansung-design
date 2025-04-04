import '@unocss/runtime';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    text?: string;
    font?: string;
    [key: `${string}-${string}`]: string | number | undefined;
  }
}

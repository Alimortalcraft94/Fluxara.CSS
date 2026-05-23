export declare const version: string;
export declare const defaultTheme: {
  color: Record<string, string>;
  space: Record<string, string>;
};
export declare function defineFluxaraConfig<T extends Record<string, unknown>>(config?: T): T & {
  theme: typeof defaultTheme;
  content: string[];
  output: string;
};
export declare function setFluxaraTheme(themeName: string, root?: Element): void;
export declare function toggleFluxaraTheme(a?: string, b?: string, root?: Element): string | undefined;

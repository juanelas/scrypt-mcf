export interface ScryptParams {
    logN?: number;
    r?: number;
    p?: number;
}
export declare function kdf(password: string, saltBase64?: string, params?: ScryptParams, derivedKeyLength?: number): Promise<string>;
export declare function verify(password: string, mcf: string): Promise<boolean>;
//# sourceMappingURL=index.d.ts.map
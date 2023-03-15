export declare class ApiError extends Error {
    name: string;
    statusCode: number;
    constructor(name: string, statusCode: number, message?: string);
    update(name?: string, statusCode?: number, message?: string): void;
}
//# sourceMappingURL=ApiError.d.ts.map
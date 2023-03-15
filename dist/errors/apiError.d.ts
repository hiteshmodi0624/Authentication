export declare class ApiError extends Error {
    name: string;
    readonly statusCode: number;
    constructor(name: string, statusCode: number, message?: string);
}

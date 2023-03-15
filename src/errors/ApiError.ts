export class ApiError extends Error {
    constructor(public name: string, public readonly statusCode: number, message?: string) {
        super(message);
    }
}
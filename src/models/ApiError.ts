export class ApiError extends Error {
    constructor(public name: string, public statusCode: number, message?: string) {
        super(message);
    }
    update(name?:string,statusCode?:number,message?:string):void{
        if(name)
            this.name=name
        if(statusCode)
            this.statusCode=statusCode
        if(message)
            this.message=message
    }
}
export interface ISuccessResponse<T> {
    status: number;
    data: T;
}

export interface IErrorResponse {
    status: number
    message: string;
}
export interface BaseResponseInterface<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

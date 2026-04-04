export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success?: boolean;
    errors?: Record<string, string[]>;
}

export interface ApiResponseUnknown<T = unknown> {
    data: T
    message?: string
    success?: boolean
    errors?: Record<string, string[]>
}

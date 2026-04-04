export type ApiResponse<T = any> {
    data: T;
    message?: string;
    success?: boolean;
    errors?: Record<string, string[]>;
}

export type ApiResponseUnknown<T = unknown> {
    data: T
    message?: string
    success?: boolean
    errors?: Record<string, string[]>
}

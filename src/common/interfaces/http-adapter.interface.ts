

export interface HttpAdapter_I {
    _get<T>( url: string ): Promise<T>
}
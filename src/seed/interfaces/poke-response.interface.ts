// Generated by https://quicktype.io

export interface PokeResponse_I {
    count:    number;
    next:     string;
    previous: null;
    results:  Results_I[];
}

export interface Results_I {
    name: string;
    url:  string;
}
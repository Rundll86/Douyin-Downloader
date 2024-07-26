export type TypeOrNull<T> = T | undefined;
export interface Searcher {
    element?: TypeOrNull<string>;
    classNames?: TypeOrNull<string[]>;
    id?: TypeOrNull<string>;
    attrs?: {
        name: string,
        value: string
    }[];
    nthChild?: TypeOrNull<number>;
};
export interface CrawlRule {
    field: string;
    searchers: Searcher[];
    name: string;
    execute?: ((e: CrawlRule) => void) | string;
};
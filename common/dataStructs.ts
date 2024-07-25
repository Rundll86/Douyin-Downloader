export type TypeOrNull<T> = T | null;
export interface Searcher {
    element: TypeOrNull<string>;
    classNames: TypeOrNull<string[]>;
    id: TypeOrNull<string>;
    attrs: {
        name: string,
        value: string
    }[];
};
export interface CrawlRule<T extends HTMLElement = HTMLElement> {
    field: keyof T;
    searchers: Searcher[];
    name: string;
};
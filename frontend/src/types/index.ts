export interface Snippet {
    id: string;
    title: string;
    language: string;
    code: string;
    description: string;
    complexity: number;
    references: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Article } from "@/types";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
        fetch(`${apiUrl}/articles/${id}`)
            .then(async (res) => {
                if (!res.ok) throw new Error("Failed to fetch article");
                return res.json();
            })
            .then((data) => {
                setArticle(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-muted-foreground animate-pulse">Loading article...</div>;
    if (!article) return <div className="text-center mt-20 text-muted-foreground">Article not found.</div>;

    return (
        <div className="container mx-auto px-4 py-32 max-w-5xl transition-all duration-300 ease-in-out">
            <div className="max-w-4xl mx-auto animate-fade-in">
                <Link href="/docs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-all hover:-translate-x-1 group">
                    <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Back to documentation</span>
                </Link>

                <article className="glass-panel p-10 md:p-14">
                    <header className="mb-10 pb-10 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(article.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                            {article.title}
                        </h1>
                    </header>

                    <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-[#1e293b] prose-pre:border prose-pre:border-white/5">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
}

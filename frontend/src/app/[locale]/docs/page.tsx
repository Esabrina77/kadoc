"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { Article } from "@/types";
import { Book, Plus, ArrowRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DocsPage() {
    const t = useTranslations('DocsList');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
        fetch(`${apiUrl}/articles`)
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredArticles = articles.filter(article => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            article.title.toLowerCase().includes(lowerTerm) ||
            article.category.toLowerCase().includes(lowerTerm)
        );
    });

    if (loading) return <div className="text-center mt-20 text-muted-foreground animate-pulse">{t('loading')}</div>;

    return (
        <div className="container mx-auto px-4 py-32 max-w-5xl transition-all duration-300 ease-in-out">
            <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{t('title')}</h1>
                        <p className="text-muted-foreground">{t('subtitle')}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 h-10 rounded-xl bg-secondary/30 border border-white/5 focus:bg-secondary/50 focus:border-primary/20 text-sm outline-none transition-all shadow-sm"
                            />
                        </div>
                        <Link href="/docs/new">
                            <button className="h-10 px-5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">{t('newArticle')}</span>
                                <span className="sm:hidden">{t('new')}</span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.length === 0 ? (
                        <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
                            <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">{t('noMatches')}</h3>
                            <p className="text-muted-foreground mb-6">
                                {searchTerm ? t('noMatchesDesc', { query: searchTerm }) : t('emptyDesc')}
                            </p>
                            {!searchTerm && (
                                <Link href="/docs/new">
                                    <button className="text-primary font-bold hover:underline">{t('createBtn')}</button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredArticles.map((article, idx) => (
                            <Link href={`/docs/${article.id}`} key={article.id} className="glass-card group p-6 flex flex-col h-full hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                                <div className="mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md mb-3 inline-block">
                                        {article.category}
                                    </span>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                </div>
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

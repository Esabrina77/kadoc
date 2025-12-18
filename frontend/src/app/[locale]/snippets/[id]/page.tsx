"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/routing";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, ArrowLeft, Calendar } from "lucide-react";
import { Snippet } from "@/types";

export default function SnippetDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!id) return;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
        fetch(`${apiUrl}/snippets/${id}`)
            .then(async (res) => {
                if (!res.ok) throw new Error("Snippet not found");
                return res.json();
            })
            .then((data) => {
                setSnippet(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch snippet", err);
                setLoading(false);
                // router.push("/"); // Optional: Redirect on error
            });
    }, [id, router]);

    const copyToClipboard = () => {
        if (!snippet) return;
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return <div className="text-center text-muted-foreground mt-20 animate-pulse">Loading snippet...</div>;
    }

    if (!snippet) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Snippet not found</h2>
                <Link href="/" className="text-primary hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-32 max-w-5xl transition-all duration-300 ease-in-out">
            <div className="max-w-4xl mx-auto animate-fade-in pb-20">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-all hover:-translate-x-1 group">
                    <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Back to library</span>
                </Link>

                <div className="glass-panel overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-white/5 bg-white/5 flex items-start justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs uppercase tracking-wider font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-md border border-accent/20">
                                    {snippet.language}
                                </span>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{new Date(snippet.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                                {snippet.title}
                            </h1>
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                        >
                            {copied ? (
                                <>
                                    <span className="font-medium text-sm">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                                    <span className="font-medium text-sm text-muted-foreground group-hover:text-white">Copy</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Description if present */}
                    {snippet.description && (
                        <div className="p-8 pb-0">
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {snippet.description}
                            </p>
                        </div>
                    )}

                    {/* Code Block */}
                    <div className="p-8">
                        <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[var(--code-bg)] shadow-inner">
                            <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                <span className="ml-auto text-xs font-mono text-muted-foreground opacity-50">
                                    {snippet.language.toLowerCase()}
                                </span>
                            </div>
                            <div className="pt-10 overflow-x-auto">
                                <SyntaxHighlighter
                                    language={snippet.language.toLowerCase()}
                                    style={oneDark}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        background: 'transparent',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.6',
                                    }}
                                    showLineNumbers={true}
                                    wrapLines={true}
                                >
                                    {snippet.code}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

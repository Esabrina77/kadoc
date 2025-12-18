"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Snippet } from "@/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Tag, Check, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('SnippetsList');
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
    const query = searchQuery ? `?q=${searchQuery}` : "";

    setLoading(true);
    fetch(`${apiUrl}/snippets${query}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch snippets");
        return res.json();
      })
      .then((data) => {
        setSnippets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch snippets", err);
        setLoading(false);
      });
  }, [searchQuery]);

  // Keep input in sync if URL changes externally
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      router.push(`/snippets?${params.toString()}`);
    }, 500);
    setTimer(newTimer);
  };

  const copyToClipboard = (e: React.MouseEvent, text: string, id: string) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-5xl transition-all duration-300 ease-in-out">
      {/* Local Search Bar */}
      <div className="mb-8 relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 h-11 rounded-xl bg-secondary/30 border border-white/5 focus:bg-secondary/50 focus:border-primary/20 text-sm outline-none transition-all shadow-sm"
        />
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground mt-20 animate-pulse">{t('loading')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {snippets.length === 0 ? (
            <div className="col-span-full text-center py-32">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">
                {searchQuery ? t('noMatches') : t('emptyCanvas')}
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {searchQuery ? t('noMatchesDesc', { query: searchQuery }) : t('emptyDesc')}
              </p>
            </div>
          ) : (
            snippets.map((snippet, index) => (
              <Link
                href={`/snippets/${snippet.id}`}
                key={snippet.id}
                className="glass-card flex flex-col group overflow-hidden animate-fade-in relative block hover:no-underline"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                        {snippet.language}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {new Date(snippet.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-foreground leading-tight truncate group-hover:text-primary transition-colors duration-300">
                      {snippet.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(e, snippet.code, snippet.id)}
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-secondary hover:bg-primary hover:text-white text-muted-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 shadow-sm z-10"
                    title="Copy code"
                  >
                    {copiedId === snippet.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Code Snippet Area */}
                <div className="relative flex-1 border-t border-b border-white/5 transition-colors duration-500 bg-[var(--code-bg)]">
                  <div className="max-h-[200px] overflow-hidden relative font-mono text-sm leading-relaxed select-none pointer-events-none">
                    <SyntaxHighlighter
                      language={snippet.language.toLowerCase()}
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.875rem',
                        lineHeight: '1.6'
                      }}
                      wrapLines={true}
                    >
                      {/* Truncate logically by limiting lines or chars for preview */}
                      {snippet.code.length > 300 ? snippet.code.slice(0, 300) + '\n...' : snippet.code}
                    </SyntaxHighlighter>

                    {/* Heavy fade out bottom for "preview" feel */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--code-bg)] pointer-events-none" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {snippet.description || t('noDescription')}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { ArrowLeft, Save } from "lucide-react";

export default function NewSnippet() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<{
        title: string;
        language: string;
        description: string;
        code: string;
        complexity: number;
        references: string[];
    }>({
        title: "",
        language: "javascript",
        description: "",
        code: "",
        complexity: 1,
        references: [],
    });

    const languages = [
        "javascript",
        "python",
        "go",
        "typescript",
        "html",
        "css",
        "sql",
        "bash",
        "json",
        "markdown",
        "java",
        "csharp",
        "cpp",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
            const res = await fetch(`${apiUrl}/snippets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create snippet");

            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Error creating snippet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-32 max-w-5xl transition-all duration-300 ease-in-out">
            <div className="max-w-4xl mx-auto animate-fade-in relative">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-10 transition-all hover:-translate-x-1 group">
                    <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Back to library</span>
                </Link>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2 relative group">
                        <input
                            id="title"
                            required
                            type="text"
                            className="w-full h-auto py-4 bg-transparent border-b-2 border-transparent focus:border-primary/50 text-5xl font-bold text-foreground placeholder:text-muted-foreground/30 focus:outline-none px-0 tracking-tight transition-all"
                            placeholder="Untitled Snippet"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div className="glass-panel p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Language</label>
                                <div className="relative">
                                    <select
                                        id="language"
                                        className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-transparent text-foreground focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none appearance-none cursor-pointer hover:bg-secondary/70 transition-all font-medium"
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                    >
                                        {languages.map(lang => (
                                            <option key={lang} value={lang} className="bg-zinc-900 text-white font-medium">{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Complexity (1-5)</label>
                                <div className="flex items-center gap-4 h-12">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        value={formData.complexity}
                                        onChange={(e) => setFormData({ ...formData, complexity: parseInt(e.target.value) })}
                                    />
                                    <span className="text-xl font-bold text-primary w-8 text-center">{formData.complexity}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
                            <textarea
                                id="description"
                                className="w-full min-h-[100px] px-5 py-4 rounded-xl bg-secondary/50 border border-transparent text-foreground focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none resize-y placeholder:text-muted-foreground/50 hover:bg-secondary/70 transition-all leading-relaxed"
                                placeholder="Describe what this code does..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">References (URLs)</label>
                            <div className="space-y-3">
                                {formData.references.map((ref, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="url"
                                            placeholder="https://example.com"
                                            className="flex-1 h-10 px-4 rounded-xl bg-secondary/50 border border-transparent text-foreground focus:bg-background focus:border-primary/30 outline-none"
                                            value={ref}
                                            onChange={(e) => {
                                                const newRefs = [...formData.references];
                                                newRefs[index] = e.target.value;
                                                setFormData({ ...formData, references: newRefs });
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newRefs = formData.references.filter((_, i) => i !== index);
                                                setFormData({ ...formData, references: newRefs });
                                            }}
                                            className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center font-bold"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, references: [...formData.references, ""] })}
                                    className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
                                >
                                    <span className="text-lg">+</span> Add Reference
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Code Block</label>
                            <div className="relative rounded-xl overflow-hidden border border-border/10 focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10 transition-all bg-[#1e293b] dark:bg-black shadow-inner">
                                <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                                    <div className="ml-auto text-xs text-white/30 font-mono">Editor</div>
                                </div>
                                <textarea
                                    id="code"
                                    required
                                    className="w-full min-h-[400px] p-6 pt-16 bg-transparent text-gray-200 font-mono text-sm outline-none resize-y block whitespace-pre leading-relaxed placeholder:text-gray-600"
                                    placeholder="// Start typing your code..."
                                    spellCheck={false}
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 pb-20">
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {loading ? "Saving..." : "Save Snippet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

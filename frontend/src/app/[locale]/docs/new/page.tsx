"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { ArrowLeft, Save } from "lucide-react";

export default function NewArticle() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "General",
        content: "",
    });

    const categories = ["General", "Architecture", "Guide", "Troubleshooting", "Setup"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006/api";
            const res = await fetch(`${apiUrl}/articles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create article");

            router.push("/docs");
        } catch (error) {
            console.error(error);
            alert("Error creating article");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-32 max-w-5xl transition-all duration-300 ease-in-out">
            <div className="max-w-4xl mx-auto animate-fade-in relative">
                <Link href="/docs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-10 transition-all hover:-translate-x-1 group">
                    <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Back to documentation</span>
                </Link>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <input
                            id="title"
                            required
                            type="text"
                            className="w-full h-auto py-4 bg-transparent border-b-2 border-transparent focus:border-primary/50 text-5xl font-bold text-foreground placeholder:text-muted-foreground/30 focus:outline-none px-0 tracking-tight transition-all"
                            placeholder="Untitled Article"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div className="glass-panel p-8 space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Category</label>
                            <div className="relative">
                                <select
                                    id="category"
                                    className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-transparent text-foreground focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none appearance-none cursor-pointer hover:bg-secondary/70 transition-all font-medium"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="bg-zinc-900 text-white font-medium">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Content (Markdown)</label>
                            <textarea
                                id="content"
                                required
                                className="w-full min-h-[500px] p-6 rounded-xl bg-secondary/30 border border-transparent focus:bg-secondary/50 focus:border-primary/30 outline-none resize-y text-base leading-relaxed font-mono placeholder:text-muted-foreground/50"
                                placeholder="# Write your documentation here..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 pb-20">
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {loading ? "Saving..." : "Save Article"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

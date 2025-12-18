"use client";

import { Link } from "@/i18n/routing";
import { Plus, Command } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageSwitcher from "@/components/language-switcher";
import { useTranslations } from "next-intl";

export function Navbar() {
    const t = useTranslations('Navbar');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 pointer-events-none">
            <div className="container mx-auto max-w-5xl pointer-events-auto">
                <div className="glass-panel px-4 h-16 flex items-center justify-between">
                    {/* Left Section: Logo & Main Nav */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <Command className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground group-hover:opacity-80 transition-opacity">
                                Kadoc.
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/snippets" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                {t('snippets')}
                            </Link>
                            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                {t('docs')}
                            </Link>
                        </div>
                    </div>

                    {/* Right Section: Utilities & Actions */}
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <ModeToggle />

                        {/* Optional: Minimal 'New' Action if desired, or relying on per-page actions */}
                        <Link href="/snippets/new">
                            <button className="w-9 h-9 rounded-lg bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95" title={t('newSnippet')}>
                                <Plus className="h-5 w-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

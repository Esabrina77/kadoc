import Link from "next/link";
import { ArrowRight, Code, Book, Search, Zap, Layers, Database } from "lucide-react";
import { LandingFooter } from "@/components/landing-footer";
import { useTranslations } from "next-intl";

export default function LandingPage() {
    const t = useTranslations('Landing');

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">


                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.1] animate-fade-in" style={{ animationDelay: '100ms' }}>
                            {t.rich('title', {
                                br: () => <br />,
                                span: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50">{chunks}</span>
                            })}
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <Link href="/snippets/new">
                                <button className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2">
                                    {t('startBtn')}
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </Link>
                            <Link href="/docs">
                                <button className="h-12 px-8 rounded-xl bg-secondary/50 border border-white/10 text-foreground font-medium text-lg hover:bg-secondary/80 transition-all hover:-translate-y-0.5">
                                    {t('docsBtn')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="glass-card p-8 space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Code className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('smartSnippetsTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('smartSnippetsDesc')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass-card p-8 space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Search className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('searchTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('searchDesc')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-card p-8 space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Book className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('docsTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('docsDesc')}
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="glass-card p-8 space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Layers className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('versioningTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('versioningDesc')}
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="glass-card p-8 space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Database className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('stackTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('stackDesc')}
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="glass-card p-8 space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('fastTitle')}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t('fastDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
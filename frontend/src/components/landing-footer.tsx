import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function LandingFooter() {
    return (
        <footer className="border-t border-white/5 bg-background/50 backdrop-blur-xl mt-32">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold tracking-tight text-foreground">Kadoc.</span>
                        <span className="text-sm text-muted-foreground">© 2025</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

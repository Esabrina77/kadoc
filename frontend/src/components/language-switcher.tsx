"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChangeEvent, useTransition } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="relative flex items-center">
            <Globe className="h-4 w-4 absolute left-2 text-muted-foreground pointer-events-none" />
            <select
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectChange}
                className="h-8 pl-8 pr-3 rounded-lg bg-secondary/50 border border-transparent text-sm font-medium text-foreground outline-none cursor-pointer hover:bg-secondary/80 focus:bg-background focus:border-primary/20 appearance-none transition-all"
            >
                <option value="en">EN</option>
                <option value="fr">FR</option>
            </select>
        </div>
    );
}

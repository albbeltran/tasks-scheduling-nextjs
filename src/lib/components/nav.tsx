'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
    const pathname = usePathname();

    const linkClasses = (href: string) =>
        `px-4 py-2 rounded-md font-medium transition ${pathname === href
            ? 'bg-blue-600 text-white'
            : 'text-zinc-300 hover:text-white hover:bg-zinc-700'
        }`;

    return (
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-white font-bold text-lg">Task Scheduler</div>
                <div className="flex space-x-2">
                    <Link href="/" className={linkClasses('/')}>
                        Tasks
                    </Link>
                    <Link href="/scheduling" className={linkClasses('/scheduling')}>
                        Scheduling
                    </Link>
                </div>
            </div>
        </nav>
    );
};
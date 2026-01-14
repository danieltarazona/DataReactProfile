'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import clsx from 'clsx';

type SectionId = 'header' | 'education' | 'skills' | 'experience' | 'leadership' | 'certificates';

interface SidebarProps {
    activeSection: SectionId;
    onSectionChange: (section: SectionId) => void;
}

const sections: { id: SectionId; icon: string }[] = [
    { id: 'header', icon: '👤' },
    { id: 'education', icon: '🎓' },
    { id: 'skills', icon: '💻' },
    { id: 'experience', icon: '💼' },
    { id: 'leadership', icon: '🏆' },
    { id: 'certificates', icon: '📜' },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
    const { t } = useTranslation();

    return (
        <aside className="w-64 h-full bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col">
            {/* Logo/Title */}
            <div className="p-6 border-b border-[var(--color-border)]">
                <h1 className="text-xl font-bold gradient-text">{t('app.title')}</h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('app.subtitle')}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={clsx(
                            'w-full flex items-center gap-3 px-4 py-3 rounded-xl',
                            'text-left transition-all duration-200',
                            'relative overflow-hidden',
                            activeSection === section.id
                                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                : 'text-[var(--color-text-muted)] hover:bg-[var(--color-border)]/50 hover:text-[var(--color-text)]'
                        )}
                    >
                        {activeSection === section.id && (
                            <motion.div
                                layoutId="activeSection"
                                className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-xl"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <span className="relative text-lg">{section.icon}</span>
                        <span className="relative font-medium">{t(`nav.${section.id}`)}</span>
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)] text-center">
                    Built with DataKitReactUICore
                </p>
            </div>
        </aside>
    );
}

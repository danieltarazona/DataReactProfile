'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import type { CVHeader } from '@/lib/types';

interface HeaderSectionProps {
    data: CVHeader;
    onChange: (field: keyof CVHeader, value: string) => void;
}

export default function HeaderSection({ data, onChange }: HeaderSectionProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">👤</span>
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">
                        {t('header.title')}
                    </h2>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Name & Title Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('header.name')}
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            placeholder={t('header.name')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('header.jobTitle')}
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => onChange('title', e.target.value)}
                            placeholder={t('header.jobTitle')}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Location & Contact Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('header.location')}
                        </label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => onChange('location', e.target.value)}
                            placeholder={t('header.location')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('header.email')}
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            placeholder={t('header.email')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('header.phone')}
                        </label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            placeholder={t('header.phone')}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* GitHub */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        {t('header.github')}
                    </label>
                    <input
                        type="url"
                        value={data.github}
                        onChange={(e) => onChange('github', e.target.value)}
                        placeholder={t('header.github')}
                        className="w-full"
                    />
                </div>

                {/* Summary */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        {t('header.summary')}
                    </label>
                    <textarea
                        value={data.summary || ''}
                        onChange={(e) => onChange('summary', e.target.value)}
                        placeholder={t('header.summary')}
                        rows={4}
                        className="w-full resize-none"
                    />
                </div>
            </div>
        </motion.div>
    );
}

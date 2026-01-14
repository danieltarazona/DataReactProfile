'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import type { Certificate } from '@/lib/types';
import clsx from 'clsx';

interface CertificatesSectionProps {
    items: Certificate[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, field: string, value: string) => void;
}

export default function CertificatesSection({ items, onAdd, onRemove, onChange }: CertificatesSectionProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">📜</span>
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">
                        {t('certificates.title')}
                    </h2>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-500">
                        {items.length}
                    </span>
                </div>
                <button
                    onClick={onAdd}
                    className={clsx(
                        'px-3 py-1.5 rounded-lg text-sm font-medium',
                        'bg-purple-500 text-white',
                        'hover:bg-purple-500/90',
                        'transition-colors duration-200',
                        'flex items-center gap-1'
                    )}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('certificates.add')}
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-purple-500/30 transition-colors"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => onRemove(index)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title={t('certificates.remove')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>

                            {/* Name & Issuer */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('certificates.name')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => onChange(index, 'name', e.target.value)}
                                        placeholder={t('certificates.name')}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('certificates.issuer')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.issuer}
                                        onChange={(e) => onChange(index, 'issuer', e.target.value)}
                                        placeholder={t('certificates.issuer')}
                                    />
                                </div>
                            </div>

                            {/* Date & Description */}
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('certificates.date')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.date}
                                        onChange={(e) => onChange(index, 'date', e.target.value)}
                                        placeholder={t('certificates.date')}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('certificates.description')}
                                    </label>
                                    <textarea
                                        value={item.description}
                                        onChange={(e) => onChange(index, 'description', e.target.value)}
                                        placeholder={t('certificates.description')}
                                        rows={2}
                                        className="resize-none"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <div className="text-center py-8 text-[var(--color-text-muted)]">
                        <p>No certificates yet. Click &quot;Add Certificate&quot; to get started.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

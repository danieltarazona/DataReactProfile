'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import type { Education } from '@/lib/types';
import clsx from 'clsx';

interface EducationSectionProps {
    items: Education[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, field: string, value: string) => void;
}

export default function EducationSection({ items, onAdd, onRemove, onChange }: EducationSectionProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[var(--color-secondary)]/10 to-transparent border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">
                        {t('education.title')}
                    </h2>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                        {items.length}
                    </span>
                </div>
                <button
                    onClick={onAdd}
                    className={clsx(
                        'px-3 py-1.5 rounded-lg text-sm font-medium',
                        'bg-[var(--color-secondary)] text-white',
                        'hover:bg-[var(--color-secondary)]/90',
                        'transition-colors duration-200',
                        'flex items-center gap-1'
                    )}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('education.add')}
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
                            className="relative p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-secondary)]/30 transition-colors"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => onRemove(index)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title={t('education.remove')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>

                            {/* Institution & Location */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('education.institution')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.institution}
                                        onChange={(e) => onChange(index, 'institution', e.target.value)}
                                        placeholder={t('education.institution')}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('education.location')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.location}
                                        onChange={(e) => onChange(index, 'location', e.target.value)}
                                        placeholder={t('education.location')}
                                    />
                                </div>
                            </div>

                            {/* Degree & Date */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('education.degree')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.degree}
                                        onChange={(e) => onChange(index, 'degree', e.target.value)}
                                        placeholder={t('education.degree')}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[var(--color-text)]">
                                        {t('education.date')}
                                    </label>
                                    <input
                                        type="text"
                                        value={item.date}
                                        onChange={(e) => onChange(index, 'date', e.target.value)}
                                        placeholder={t('education.date')}
                                    />
                                </div>
                            </div>

                            {/* Coursework */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[var(--color-text)]">
                                    {t('education.coursework')}
                                </label>
                                <textarea
                                    value={item.coursework}
                                    onChange={(e) => onChange(index, 'coursework', e.target.value)}
                                    placeholder={t('education.coursework')}
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <div className="text-center py-8 text-[var(--color-text-muted)]">
                        <p>No education entries yet. Click &quot;Add Education&quot; to get started.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

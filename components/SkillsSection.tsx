'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import type { Skills } from '@/lib/types';
import clsx from 'clsx';

interface SkillsSectionProps {
    skills: Skills;
    onSkillChange: (field: 'programming' | 'design' | 'tools', value: string) => void;
    onProjectAdd: () => void;
    onProjectRemove: (index: number) => void;
    onProjectChange: (index: number, field: string, value: string) => void;
}

export default function SkillsSection({
    skills,
    onSkillChange,
    onProjectAdd,
    onProjectRemove,
    onProjectChange,
}: SkillsSectionProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden"
        >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">💻</span>
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">
                        {t('skills.title')}
                    </h2>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
                {/* Skills Grid */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('skills.programming')}
                        </label>
                        <textarea
                            value={skills.programming}
                            onChange={(e) => onSkillChange('programming', e.target.value)}
                            placeholder={t('skills.programming')}
                            rows={2}
                            className="resize-none"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[var(--color-text)]">
                            {t('skills.design')}
                        </label>
                        <textarea
                            value={skills.design}
                            onChange={(e) => onSkillChange('design', e.target.value)}
                            placeholder={t('skills.design')}
                            rows={2}
                            className="resize-none"
                        />
                    </div>
                </div>

                {/* Projects Subsection */}
                <div className="pt-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-md font-semibold text-[var(--color-text)]">
                                {t('skills.projects')}
                            </h3>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                                {skills.projects.length}
                            </span>
                        </div>
                        <button
                            onClick={onProjectAdd}
                            className={clsx(
                                'px-3 py-1.5 rounded-lg text-sm font-medium',
                                'bg-[var(--color-accent)] text-white',
                                'hover:bg-[var(--color-accent)]/90',
                                'transition-colors duration-200',
                                'flex items-center gap-1'
                            )}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {t('skills.add')}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {skills.projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
                                >
                                    {/* Remove Button */}
                                    <button
                                        onClick={() => onProjectRemove(index)}
                                        className="absolute top-2 right-2 p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                        title={t('skills.remove')}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>

                                    {/* Name & Date */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-[var(--color-text)]">
                                                {t('skills.projectName')}
                                            </label>
                                            <input
                                                type="text"
                                                value={project.name}
                                                onChange={(e) => onProjectChange(index, 'name', e.target.value)}
                                                placeholder={t('skills.projectName')}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-[var(--color-text)]">
                                                {t('skills.projectDate')}
                                            </label>
                                            <input
                                                type="text"
                                                value={project.date}
                                                onChange={(e) => onProjectChange(index, 'date', e.target.value)}
                                                placeholder={t('skills.projectDate')}
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-[var(--color-text)]">
                                            {t('skills.projectDescription')}
                                        </label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => onProjectChange(index, 'description', e.target.value)}
                                            placeholder={t('skills.projectDescription')}
                                            rows={3}
                                            className="resize-none"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {skills.projects.length === 0 && (
                            <div className="text-center py-8 text-[var(--color-text-muted)]">
                                <p>No projects yet. Click &quot;Add Project&quot; to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

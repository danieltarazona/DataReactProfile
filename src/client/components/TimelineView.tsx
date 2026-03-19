import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import type { CVEntry } from '../api';
import { useTranslation } from 'react-i18next';

interface TimelineViewProps {
    experience: CVEntry[];
    education: CVEntry[];
    activeRoleId?: string;
}

export function TimelineView({ experience, education, activeRoleId = 'all' }: TimelineViewProps) {
    const { t } = useTranslation();

    const allEvents = useMemo(() => {
        const isVisible = (it: CVEntry) => {
            if (activeRoleId === 'all') return true;
            if (!it.roleIds) return true;
            return it.roleIds.split(',').includes(activeRoleId);
        };

        const events = [
            ...experience.filter(isVisible).map(it => ({ ...it, type: 'experience' as const })),
            ...education.filter(isVisible).map(it => ({ ...it, type: 'education' as const }))
        ];

        // Basic year extraction (expecting format like "2020", "2020 - 2022", "Jul 2020")
        const extractYear = (dateStr: string | null | undefined) => {
            if (!dateStr) return 0;
            const match = dateStr.match(/\d{4}/);
            return match ? parseInt(match[0]) : 0;
        };

        return events
            .filter(it => (it as any).startDate || (it as any).date)
            .sort((a, b) => {
                const yearA = extractYear((a as any).startDate || (a as any).date);
                const yearB = extractYear((b as any).startDate || (b as any).date);
                return yearB - yearA;
            });
    }, [experience, education, activeRoleId]);

    if (allEvents.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
                {t('timeline.noData')}
            </div>
        );
    }

    return (
        <div className="p-8 space-y-12">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">{t('nav.timeline')}</h2>
                <div className="h-1.5 w-12 bg-blue-500 rounded-full" />
            </div>

            <div className="relative border-l-2 border-white/10 ml-4 pl-8 space-y-12">
                {allEvents.map((ev, idx) => {
                    const event = ev as any;
                    return (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative"
                        >
                            {/* Dot */}
                            <div className={`absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-black ${event.type === 'experience' ? 'bg-purple-500' : 'bg-blue-500'
                                }`} />

                            <div className="card-editor hover:scale-[1.01] transition-transform">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                                    {event.startDate || event.date} {event.endDate ? `— ${event.endDate}` : ''}
                                </span>
                                <h3 className="text-xl font-bold">
                                    {event.company || event.institutionEn || event.institutionEs || event.institutionFr}
                                </h3>
                                <p className="text-blue-400 font-medium">
                                    {event.roleEn || event.degreeEn || event.roleEs || event.degreeEs || event.roleFr || event.degreeFr}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

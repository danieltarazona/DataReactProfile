import React from 'react';
import { GripVertical } from 'lucide-react';
import { SortableList } from '../../components/SortableList';
import type { FullCVData } from '../../api';

interface LayoutManagerProps {
    data: FullCVData;
    onReorder: (newOrder: any[]) => void;
    t: (key: string, opts?: any) => string;
}

export function LayoutManager({ data, onReorder, t }: LayoutManagerProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">{t('nav.layout')}</h2>
                <p className="text-gray-400 text-sm">Drag to reorder sections and toggle visibility for your PDF.</p>
                <div className="h-1.5 w-12 bg-blue-500 rounded-full" />
            </div>

            <SortableList
                items={data.sectionOrder.map(s => ({ ...s, id: s.sectionKey }))}
                onReorder={(items: any[]) => {
                    const newOrder = items.map((it: any, idx: number) => ({
                        sectionKey: it.sectionKey,
                        sortOrder: idx,
                        visible: (it as any).visible
                    }));
                    onReorder(newOrder);
                }}
                renderItem={(section: any) => {
                    const isVisible = section.visible !== 0;
                    const toggleVisibility = () => {
                        const newOrder = data.sectionOrder.map(s => 
                            s.sectionKey === section.sectionKey ? { ...s, visible: isVisible ? 0 : 1 } : s
                        );
                        onReorder(newOrder);
                    };

                    return (
                        <div className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                            isVisible ? 'bg-white/5 border-white/10' : 'bg-black/20 border-dashed border-white/10 opacity-60'
                        }`}>
                            <div className="flex items-center gap-4">
                                <GripVertical size={20} className="text-gray-600 cursor-grab active:cursor-grabbing" />
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold capitalize tracking-tight">
                                        {t(`${section.sectionKey}.title`, { defaultValue: section.sectionKey })}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {isVisible ? 'Visible in PDF' : 'Hidden from PDF'}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={toggleVisibility}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                                    isVisible 
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20' 
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {isVisible ? '👁️ Visible' : '👁️‍🗨️ Hidden'}
                            </button>
                        </div>
                    );
                }}
            />
        </div>
    );
}

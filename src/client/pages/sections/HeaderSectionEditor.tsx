import React from 'react';
import { HeaderSection as CoreHeaderSection } from '@datakit/react-core';
import type { SectionEditorProps } from './types';

export function HeaderSectionEditor({ data, t, lang, sectHook }: SectionEditorProps) {
    // Header is unique as it's NOT a list, and it's managed via updateHeader api
    // sectHook here is special (the api object or specialized wrapper)
    
    // In Home.tsx, we had:
    // headerData = { ...data.header!, title: api.getLocalizedField(...), location: api.getLocalizedField(...) }
    
    const headerData = {
        ...data.header!,
        title: data.header![`title${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof data.header] || data.header?.titleEn,
        location: data.header![`location${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof data.header] || data.header?.locationEn,
    } as any;

    return (
        <div className="animate-in fade-in duration-500">
            <CoreHeaderSection
                data={headerData}
                onChange={(field, value) => {
                    const l = lang.charAt(0).toUpperCase() + lang.slice(1);
                    const machineField = (field === 'title' || field === 'location') ? `${field}${l}` : field;
                    sectHook.updateHeader({ [machineField]: value });
                }}
                labels={{
                    title: t('header.title'),
                    name: t('header.name'),
                    email: t('header.email'),
                    phone: t('header.phone'),
                    location: t('header.location'),
                    github: t('header.github'),
                } as any}
            />

            {/* Summary Editor */}
            <div className="mt-8 space-y-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Professional Summary</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {(['en', 'es', 'fr'] as const).map(l => (
                        <div key={l} className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                <span>{l === 'en' ? '🇺🇸' : l === 'es' ? '🇪🇸' : '🇫🇷'} {l.toUpperCase()} Summary</span>
                            </label>
                            <textarea
                                value={data.header?.[`summary${l.charAt(0).toUpperCase() + l.slice(1)}` as keyof typeof data.header] || ''}
                                onChange={(e) => {
                                    const field = `summary${l.charAt(0).toUpperCase() + l.slice(1)}`;
                                    sectHook.updateHeader({ [field]: e.target.value });
                                }}
                                rows={4}
                                placeholder={`Write your professional summary in ${l === 'en' ? 'English' : l === 'es' ? 'Spanish' : 'French'}...`}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

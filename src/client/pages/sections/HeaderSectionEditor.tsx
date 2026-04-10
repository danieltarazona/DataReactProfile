import React from 'react';
import { HeaderSection as CoreHeaderSection } from '@datakit/react-core';
import type { SectionEditorProps } from './types';

export function HeaderSectionEditor({ data, t, lang, sectHook }: SectionEditorProps) {
    // Header is unique as it's NOT a list, and it's managed via updateHeader api
    // sectHook here is special (the api object or specialized wrapper)
    
    // In Home.tsx, we had:
    // headerData = { ...data.header!, title: api.getLocalizedField(...), location: api.getLocalizedField(...) }
    
    const { github: _, ...headerMinusGithub } = data.header!;
    const headerData = {
        ...headerMinusGithub,
        title: data.header![`title${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof data.header] || data.header?.titleEn,
        location: data.header![`location${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as keyof typeof data.header] || data.header?.locationEn,
    } as any;

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header Basic Info */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('header.name')}</label>
                        <input
                            type="text"
                            value={data.header?.name || ''}
                            onChange={(e) => sectHook.updateHeader({ name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('header.title')} ({lang.toUpperCase()})</label>
                        <input
                            type="text"
                            value={data.header?.[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof data.header] || ''}
                            onChange={(e) => {
                                const l = lang.charAt(0).toUpperCase() + lang.slice(1);
                                sectHook.updateHeader({ [`title${l}`]: e.target.value });
                            }}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('header.email')}</label>
                        <input
                            type="email"
                            value={data.header?.email || ''}
                            onChange={(e) => sectHook.updateHeader({ email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('header.phone')}</label>
                        <input
                            type="tel"
                            value={data.header?.phone || ''}
                            onChange={(e) => sectHook.updateHeader({ phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('header.location')} ({lang.toUpperCase()})</label>
                        <input
                            type="text"
                            value={data.header?.[`location${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof typeof data.header] || ''}
                            onChange={(e) => {
                                const l = lang.charAt(0).toUpperCase() + lang.slice(1);
                                sectHook.updateHeader({ [`location${l}`]: e.target.value });
                            }}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Links Section */}
            <div className="mt-8 space-y-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest">Connect & Portfolio</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <span>⌨ GitHub</span>
                        </label>
                        <input
                            type="url"
                            value={data.header?.github || ''}
                            onChange={(e) => sectHook.updateHeader({ github: e.target.value })}
                            placeholder="https://github.com/username"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <span>🔗 LinkedIn</span>
                        </label>
                        <input
                            type="url"
                            value={data.header?.linkedin || ''}
                            onChange={(e) => sectHook.updateHeader({ linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/profile"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            <span>🌐 Website</span>
                        </label>
                        <input
                            type="url"
                            value={data.header?.website || ''}
                            onChange={(e) => sectHook.updateHeader({ website: e.target.value })}
                            placeholder="https://yourwebsite.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

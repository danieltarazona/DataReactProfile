import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@datakit/react-core';
import { RoleSelector } from '../../components/RoleComponents';
import { SortableList } from '../../components/SortableList';
import type { SectionEditorProps } from './types';

export function SkillsSectionEditor({ data, activeRoleId, isVisibleForRole, t, lang, sectHook }: SectionEditorProps) {
    return (
        <div className="space-y-6 mb-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{t('skills.title')}</h2>
            </div>
            <div className="h-1.5 w-12 bg-yellow-500 rounded-full" />

            <div className="card-editor space-y-8">
                {(['programming', 'design', 'tools'] as const).map(category => (
                    <div key={category} className="space-y-4 pt-4 first:pt-0 first:border-0 border-t border-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">{category}</h3>
                        <div className="flex flex-col gap-3">
                            <SortableList
                                items={data.skills.filter(s => s.category === category)}
                                onReorder={(newOrder) => {
                                    const others = data.skills.filter(s => s.category !== category);
                                    sectHook.reorderEntries([...newOrder, ...others]);
                                }}
                                renderItem={(skill) => (
                                    <div className={`group relative flex flex-col gap-2 bg-white/5 border border-white/10 rounded-xl p-3 w-full transition-opacity duration-300 ${!isVisibleForRole(skill) ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex-1 space-y-1">
                                                {!isVisibleForRole(skill) && (
                                                    <span className="text-[9px] text-yellow-500/50 uppercase font-black tracking-tighter">Hidden</span>
                                                )}
                                                <input
                                                    value={skill.nameEn || ''}
                                                    onChange={(e) => sectHook.updateEntry(skill.id, 'nameEn', e.target.value)}
                                                    className="font-medium text-sm text-yellow-100 bg-transparent border-none outline-none w-full"
                                                    placeholder="Skill Name"
                                                />
                                            </div>
                                            <button onClick={() => sectHook.removeEntry(skill.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="border-t border-white/10 pt-2">
                                            <RoleSelector
                                                roles={data.roles}
                                                selectedRoleIds={skill.roleIds}
                                                onChange={(ids) => sectHook.updateRoles(skill.id, ids)}
                                                compact
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder={`Type a ${category} skill...`}
                                    className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-yellow-500/50 flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                            sectHook.addEntry({ nameEn: e.currentTarget.value.trim(), category });
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                                <Button 
                                    onClick={(e) => {
                                        const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                                        if (input && input.value.trim()) {
                                            sectHook.addEntry({ nameEn: input.value.trim(), category });
                                            input.value = '';
                                        }
                                    }}
                                    variant="solid" 
                                    size="sm"
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

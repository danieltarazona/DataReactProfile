import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@datakit/react-core';
import { RoleSelector } from '../../components/RoleComponents';
import { SortableList } from '../../components/SortableList';
import type { SectionEditorProps } from './types';

export function ProjectsSectionEditor({ data, activeRoleId, isVisibleForRole, t, lang, sectHook }: SectionEditorProps) {
    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">{t('projects.title')}</h2>
                    <div className="h-1.5 w-12 bg-indigo-500 rounded-full" />
                </div>
                <Button onClick={() => sectHook.addEntry({ nameEn: 'New Project' })} variant="solid" size="sm">
                    <Plus size={18} className="mr-2" /> {t('projects.add')}
                </Button>
            </div>
            
            <SortableList
                items={data.projects.filter(p => !p.experienceId)}
                onReorder={(newOrder) => {
                    const nested = data.projects.filter(p => !!p.experienceId);
                    sectHook.reorderEntries([...newOrder, ...nested]);
                }}
                renderItem={(item) => (
                    <div className={`card-editor transition-opacity duration-300 ${!isVisibleForRole(item) ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 space-y-4">
                                {!isVisibleForRole(item) && (
                                    <div className="px-2 py-0.5 bg-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-widest rounded w-fit mb-2">
                                        Hidden in current role
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Project Name (EN)</label>
                                        <input
                                            value={item.nameEn || ''}
                                            onChange={(e) => sectHook.updateEntry(item.id, 'nameEn', e.target.value)}
                                            className="text-xl font-bold bg-transparent border-none outline-none w-full mb-4"
                                        />
                                        <div className="flex flex-col md:flex-row gap-4 mt-2">
                                            <div className="flex-1 space-y-1">
                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Start Date</label>
                                                <input
                                                    value={item.dateStart || ''}
                                                    onChange={(e) => sectHook.updateEntry(item.id, 'dateStart', e.target.value)}
                                                    placeholder="Start"
                                                    className="input-field-compact"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">End Date</label>
                                                <input
                                                    value={item.dateEnd || ''}
                                                    onChange={(e) => sectHook.updateEntry(item.id, 'dateEnd', e.target.value)}
                                                    placeholder="End"
                                                    className="input-field-compact"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Project Link</label>
                                        <input
                                            value={item.link || ''}
                                            onChange={(e) => sectHook.updateEntry(item.id, 'link', e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="input-field-compact"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                        <div key={l} className="space-y-3 pt-3 border-t border-white/5">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Location ({l})</label>
                                                <input
                                                    value={item[`location${l}`] || ''}
                                                    onChange={(e) => sectHook.updateEntry(item.id, `location${l}`, e.target.value)}
                                                    className="input-field-compact text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Role ({l})</label>
                                                <input
                                                    value={item[`role${l}`] || ''}
                                                    onChange={(e) => sectHook.updateEntry(item.id, `role${l}`, e.target.value)}
                                                    className="input-field-compact font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Description ({l})</label>
                                                <textarea
                                                    value={item[`description${l}`] || ''}
                                                    onChange={(e) => sectHook.updateEntry(item.id, `description${l}`, e.target.value)}
                                                    className="input-field-compact h-24 text-xs"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => sectHook.removeEntry(item.id)} className="btn-icon ml-4">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <RoleSelector
                            roles={data.roles}
                            selectedRoleIds={item.roleIds}
                            onChange={(ids) => sectHook.updateRoles(item.id, ids)}
                        />
                    </div>
                )}
            />
        </div>
    );
}

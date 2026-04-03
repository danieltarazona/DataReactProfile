import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@datakit/react-core';
import { RoleSelector } from '../../components/RoleComponents';
import { SortableList } from '../../components/SortableList';
import type { SectionEditorProps } from './types';

export function EducationSectionEditor({ data, activeRoleId, isVisibleForRole, t, lang, sectHook }: SectionEditorProps) {
    const renderLocalizedFields = (item: any, baseField: string, label: string, isTextarea: boolean = false) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-l-2 border-blue-500/20 pl-4 py-1">
            {(['En', 'Es', 'Fr'] as const).map(l => (
                <div key={l} className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{label} ({l})</label>
                    {isTextarea ? (
                        <textarea
                            value={item[`${baseField}${l}`] || ''}
                            onChange={(e) => sectHook.updateEntry(item.id, `${baseField}${l}`, e.target.value)}
                            className="input-field-compact h-16 text-xs w-full bg-white/5 border-white/10 rounded"
                        />
                    ) : (
                        <input
                            value={item[`${baseField}${l}`] || ''}
                            onChange={(e) => sectHook.updateEntry(item.id, `${baseField}${l}`, e.target.value)}
                            className="input-field-compact text-xs w-full bg-white/5 border-white/10 rounded"
                        />
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">{t('education.title')}</h2>
                    <div className="h-1.5 w-12 bg-blue-500 rounded-full" />
                </div>
                <Button onClick={() => sectHook.addEntry({ institutionEn: 'New Institution' })} variant="solid" size="sm">
                    <Plus size={18} className="mr-2" /> {t('education.add')}
                </Button>
            </div>
            
            <SortableList
                items={data.education}
                onReorder={(newOrder) => sectHook.reorderEntries(newOrder)}
                renderItem={(item) => (
                    <div className={`card-editor group/card transition-opacity duration-300 ${!isVisibleForRole(item) ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 space-y-6">
                                {!isVisibleForRole(item) && (
                                    <div className="px-2 py-0.5 bg-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-widest rounded w-fit mb-2">
                                        Hidden in current role
                                    </div>
                                )}

                                {/* Dates & Meta Row */}
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <div className="col-span-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Start Date</label>
                                        <input
                                            value={item.dateStart || ''}
                                            onChange={(e) => sectHook.updateEntry(item.id, 'dateStart', e.target.value)}
                                            placeholder="Aug 2022"
                                            className="input-field-compact w-full"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">End Date</label>
                                        <input
                                            value={item.dateEnd || ''}
                                            onChange={(e) => sectHook.updateEntry(item.id, 'dateEnd', e.target.value)}
                                            placeholder="May 2026"
                                            className="input-field-compact w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">GPA</label>
                                        <input
                                            value={item.gpa || ''}
                                            onChange={(e) => sectHook.updateEntry(item.id, 'gpa', e.target.value)}
                                            placeholder="3.55/4.0"
                                            className="input-field-compact w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">SAT Scores</label>
                                        <input
                                            value={item.satScores || ''}
                                            onChange={(e) => sectHook.updateEntry(item.id, 'satScores', e.target.value)}
                                            placeholder="M:780 V:760"
                                            className="input-field-compact w-full"
                                        />
                                    </div>
                                    <div className="flex justify-end pt-5">
                                        <button onClick={() => sectHook.removeEntry(item.id)} className="btn-icon">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Field Groups */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest px-1">Institution</label>
                                        {renderLocalizedFields(item, 'institution', 'Institution')}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest px-1">Degree / Major</label>
                                        {renderLocalizedFields(item, 'degree', 'Degree')}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest px-1">Location</label>
                                        {renderLocalizedFields(item, 'location', 'Location')}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest px-1">Honors / Awards</label>
                                        {renderLocalizedFields(item, 'honors', 'Honors')}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-blue-400 font-bold uppercase tracking-widest px-1">Relevant Coursework</label>
                                        {renderLocalizedFields(item, 'coursework', 'Coursework', true)}
                                    </div>
                                </div>
                            </div>
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

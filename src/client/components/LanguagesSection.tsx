import React from 'react';
import type { CVLanguageEntry, CVRole } from '../api';
import { RoleSelector } from './RoleComponents';
import { SortableList } from './SortableList';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@datakit/react-core';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'] as const;

interface LanguagesSectionProps {
    items: CVLanguageEntry[];
    roles: CVRole[];
    isVisibleForRole: (item: any) => boolean;
    lang: string;
    onAdd: () => void;
    onRemove: (id: string) => void;
    onChange: (id: string, field: string, value: string) => void;
    onRoleChange: (id: string, roleIds: string) => void;
    onReorder: (items: CVLanguageEntry[]) => void;
    t: any;
    labels: {
        title: string;
        add: string;
        remove: string;
        name: string;
        level: string;
    };
}

export function LanguagesSection({
    items, roles, isVisibleForRole, lang, onAdd, onRemove, onChange, onRoleChange, onReorder, labels, t
}: LanguagesSectionProps) {
    return (
        <section id="languages" className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">{labels.title}</h2>
                    <div className="h-1.5 w-12 bg-green-500 rounded-full" />
                </div>
                <Button
                    onClick={onAdd}
                    variant="solid"
                    size="sm"
                >
                    <Plus size={18} className="mr-2" /> {labels.add}
                </Button>
            </div>

            <SortableList
                items={items}
                onReorder={onReorder}
                renderItem={(item) => (
                    <div className={`card-editor group/card transition-opacity duration-300 ${!isVisibleForRole(item) ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}>
                        <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-4">
                                {!isVisibleForRole(item) && (
                                    <div className="px-2 py-0.5 bg-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-widest rounded w-fit mb-2">
                                        Hidden in current role
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                        <div key={l} className="space-y-2">
                                            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{labels.name} ({l})</label>
                                            <input
                                                value={item[`name${l}`] || ''}
                                                onChange={e => onChange(item.id, `name${l}`, e.target.value)}
                                                placeholder={`${labels.name} (${l})`}
                                                className="input-field-compact font-bold"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-1/3 min-w-[200px] space-y-2">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{labels.level}</label>
                                <select
                                    value={item.level}
                                    onChange={e => onChange(item.id, 'level', e.target.value)}
                                    className="input-field cursor-pointer"
                                >
                                    {LEVELS.map(l => (
                                        <option key={l} value={l} className="bg-gray-900">{t(`levels.${l}`)}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => onRemove(item.id)}
                                className="btn-icon self-end mb-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="mt-4">
                            <RoleSelector
                                roles={roles}
                                selectedRoleIds={item.roleIds}
                                onChange={(roleIds) => onRoleChange(item.id, roleIds)}
                            />
                        </div>
                    </div>
                )}
            />
        </section>
    );
}

import type { CVLanguageEntry, CVRole } from '../api';
import { RoleSelector } from './RoleComponents';
import { SortableList } from './SortableList';
import { Plus, Trash2 } from 'lucide-react';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'] as const;

interface LanguagesSectionProps {
    items: CVLanguageEntry[];
    roles: CVRole[];
    lang: string;
    onAdd: () => void;
    onRemove: (id: string) => void;
    onChange: (id: string, field: string, value: string) => void;
    onRoleChange: (id: string, roleIds: string) => void;
    onReorder: (items: CVLanguageEntry[]) => void;
    labels: {
        title: string;
        add: string;
        remove: string;
        name: string;
        level: string;
    };
}

export function LanguagesSection({
    items, roles, lang, onAdd, onRemove, onChange, onRoleChange, onReorder, labels,
}: LanguagesSectionProps) {
    const nameField = lang === 'en' ? 'nameEn' : lang === 'es' ? 'nameEs' : 'nameFr';

    return (
        <section id="languages" className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">{labels.title}</h2>
                    <div className="h-1.5 w-12 bg-green-500 rounded-full" />
                </div>
                <button
                    onClick={onAdd}
                    className="btn-primary"
                >
                    <Plus size={18} /> {labels.add}
                </button>
            </div>

            <SortableList
                items={items}
                onReorder={onReorder}
                renderItem={(item) => (
                    <div className="card-editor group/card">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{labels.name} ({lang.toUpperCase()})</label>
                                <input
                                    value={item[nameField] || ''}
                                    onChange={e => onChange(item.id, nameField, e.target.value)}
                                    placeholder={labels.name}
                                    className="input-field"
                                />
                            </div>
                            <div className="w-32 space-y-2">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{labels.level}</label>
                                <select
                                    value={item.level}
                                    onChange={e => onChange(item.id, 'level', e.target.value)}
                                    className="input-field cursor-pointer"
                                >
                                    {LEVELS.map(l => (
                                        <option key={l} value={l} className="bg-gray-900">{l}</option>
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

import React from 'react';
import { LanguagesSection } from '../../components/LanguagesSection';
import type { SectionEditorProps } from './types';

export function LanguagesSectionEditor({ data, sectHook, t, lang, isVisibleForRole }: SectionEditorProps) {
    return (
        <div className="animate-in fade-in duration-500">
            <LanguagesSection
                items={data.languages}
                roles={data.roles}
                isVisibleForRole={isVisibleForRole}
                lang={lang}
                onAdd={() => sectHook.addEntry({ nameEn: 'New Language', level: 'A1' })}
                onRemove={sectHook.removeEntry}
                onChange={sectHook.updateEntry}
                onRoleChange={sectHook.updateRoles}
                onReorder={sectHook.reorderEntries}
                t={t}
                labels={{
                    title: t('languages.title'),
                    add: t('languages.add'),
                    remove: t('languages.remove'),
                    name: t('languages.name'),
                    level: t('languages.level'),
                }}
            />
        </div>
    );
}

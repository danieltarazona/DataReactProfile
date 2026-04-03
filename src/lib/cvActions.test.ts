import { describe, it, expect } from 'vitest';
import { createActor } from 'xstate';
import { cvMachine } from './cvMachine';
import type { FullCVData, CVEntry } from '../client/api';

const emptyCV: FullCVData = {
    roles: [],
    header: null,
    education: [],
    experience: [],
    projects: [],
    skills: [],
    leadership: [],
    certificates: [],
    languages: [],
    awards: [],
    sectionOrder: [],
};

describe('cvMachine - Universal ADD_ENTRY Actions', () => {
    const sections: (keyof FullCVData)[] = [
        'education',
        'experience',
        'projects',
        'skills',
        'leadership',
        'certificates',
        'languages',
        'awards'
    ];

    sections.forEach(section => {
        it(`should successfully add a new entry to the '${section}' section`, () => {
            const actor = createActor(cvMachine).start();
            
            // 1. Load initial data
            actor.send({ type: 'LOAD_DATA', data: { ...emptyCV } });
            expect(actor.getSnapshot().value).toBe('idle');
            expect(actor.getSnapshot().context.isDirty).toBe(false);

            // 2. Add an entry
            const newEntry = { id: `new-${section}-1`, roleIds: 'all' };
            actor.send({ 
                type: 'ADD_ENTRY', 
                section, 
                entry: newEntry as any 
            });

            // 3. Verify
            const context = actor.getSnapshot().context;
            const entries = context.data![section] as CVEntry[];
            expect(entries).toHaveLength(1);
            expect(entries[0].id).toBe(`new-${section}-1`);
            expect(context.isDirty).toBe(true);
        });
    });

    it('should correctly initialize a new language with the mandatory level field', () => {
        const actor = createActor(cvMachine).start();
        actor.send({ type: 'LOAD_DATA', data: { ...emptyCV } });

        const newLanguage = { id: 'lang-1', nameEn: 'English', level: 'C2', roleIds: 'all' };
        actor.send({ 
            type: 'ADD_ENTRY', 
            section: 'languages', 
            entry: newLanguage as any 
        });

        const context = actor.getSnapshot().context;
        expect(context.data?.languages[0].level).toBe('C2');
    });
});

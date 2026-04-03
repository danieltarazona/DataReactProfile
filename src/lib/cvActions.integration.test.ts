import { describe, it, expect } from 'vitest';
import { createActor } from 'xstate';
import { cvMachine } from './cvMachine';
import type { FullCVData } from '../client/api';

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

describe('cvMachine - Universal ADD_ENTRY Integration', () => {
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
        it(`should successfully and atomically add a new entry to the '${section}' section`, () => {
            const actor = createActor(cvMachine).start();
            
            // 1. Initialize with empty data
            actor.send({ type: 'LOAD_DATA', data: { ...emptyCV } });
            expect(actor.getSnapshot().value).toBe('idle');
            expect(actor.getSnapshot().context.isDirty).toBe(false);

            // 2. Perform the ADD_ENTRY action
            const newEntry = { id: `test-id-${section}`, roleIds: 'all' };
            actor.send({ 
                type: 'ADD_ENTRY', 
                section, 
                entry: newEntry as any 
            });

            // 3. Verify the state and context
            const context = actor.getSnapshot().context;
            const contextData = context.data;
            
            expect(contextData).not.toBeNull();
            const entries = contextData![section] as any[];
            expect(entries).toHaveLength(1);
            expect(entries[0].id).toBe(`test-id-${section}`);
            expect(actor.getSnapshot().context.isDirty).toBe(true);
        });
    });

    it('should correctly initialize a new language with a level', () => {
        const actor = createActor(cvMachine).start();
        actor.send({ type: 'LOAD_DATA', data: { ...emptyCV } });

        actor.send({ 
            type: 'ADD_ENTRY', 
            section: 'languages', 
            entry: { id: 'lang-1', nameEn: 'English', level: 'Native', roleIds: 'all' } as any 
        });

        const context = actor.getSnapshot().context;
        expect(context.data?.languages[0].level).toBe('Native');
    });
});

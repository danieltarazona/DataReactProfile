import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createActor } from 'xstate';
import { cvMachine } from './cvMachine';
import * as api from '../../client/api';

// Mock the API module
vi.mock('../../client/api', async () => {
    const actual = await vi.importActual('../../client/api');
    return {
        ...actual,
        updateHeader: vi.fn().mockResolvedValue({ success: true }),
        updateEntry: vi.fn().mockResolvedValue({ success: true }),
        fetchAllCVData: vi.fn().mockResolvedValue({
            roles: [],
            header: { id: 'default', name: '', titleEn: '', locationEn: '', email: '', phone: '', github: '' },
            education: [],
            experience: [],
            projects: [],
            skills: [],
            leadership: [],
            certificates: [],
            languages: [],
            awards: [],
            sectionOrder: []
        }),
    };
});

describe('CV Persistence & Data Integrity', () => {
    let actor: any;

    beforeEach(() => {
        vi.clearAllMocks();
        actor = createActor(cvMachine);
        actor.start();
        
        // Initial data load
        actor.send({
            type: 'LOAD_DATA',
            data: {
                roles: [{ id: 'all', name: 'All', jobTitle: '', sortOrder: 0 }],
                header: { id: 'default', name: 'Original Name', titleEn: 'Dev', locationEn: 'NYC', email: 'a@b.com', phone: '123', github: 'gh' },
                education: [{ id: 'edu1', institutionEn: 'Uni', locationEn: 'NYC', degreeEn: 'BS', dateStart: '2020', roleIds: 'all' }],
                experience: [{ id: 'exp1', company: 'Corp', locationEn: 'SF', dateStart: '2021', descriptionEn: 'Work', roleIds: 'all' }],
                projects: [{ id: 'prj1', nameEn: 'App', roleEn: 'Lead', locationEn: 'Remote', link: 'url', descriptionEn: 'Dev', roleIds: 'all' }],
                skills: [{ id: 'skl1', nameEn: 'JS', category: 'programming', roleIds: 'all' }],
                leadership: [{ id: 'ldr1', organizationEn: 'Org', roleEn: 'Prez', locationEn: 'NYC', roleIds: 'all' }],
                certificates: [{ id: 'cert1', nameEn: 'AWS', issuerEn: 'Amazon', date: '2022', roleIds: 'all' }],
                languages: [{ id: 'lang1', nameEn: 'English', level: 'Native', roleIds: 'all' }],
                awards: [{ id: 'awd1', nameEn: 'Winner', issuerEn: 'State', date: '2023', roleIds: 'all' }],
                sectionOrder: []
            }
        });
    });

    it('should update and persist Header fields', async () => {
        const fields: (keyof api.CVHeaderData)[] = ['name', 'email', 'phone', 'github', 'locationEn', 'locationEs', 'locationFr'];
        
        for (const field of fields) {
            const newValue = `Updated ${field}`;
            actor.send({ type: 'UPDATE_HEADER', field, value: newValue });
            
            const state = actor.getSnapshot();
            expect(state.context.data.header[field]).toBe(newValue);
            expect(state.context.isDirty).toBe(true);
        }
    });

    it('should update and persist Education localized fields', async () => {
        const educationId = 'edu1';
        const updates = [
            { field: 'institutionEn', value: 'New Uni EN' },
            { field: 'locationEn', value: 'New Location EN' },
            { field: 'locationEs', value: 'New Location ES' },
            { field: 'locationFr', value: 'New Location FR' },
            { field: 'degreeEn', value: 'New Degree EN' },
            { field: 'gpa', value: '4.0' },
        ];

        for (const update of updates) {
            actor.send({
                type: 'UPDATE_ENTRY',
                section: 'education',
                id: educationId,
                field: update.field,
                value: update.value
            });

            const state = actor.getSnapshot();
            const entry = state.context.data.education.find((e: any) => e.id === educationId);
            expect(entry[update.field]).toBe(update.value);
            expect(state.context.isDirty).toBe(true);
        }
    });

    it('should update and persist Project localized fields (including Role)', async () => {
        const projectId = 'prj1';
        const updates = [
            { field: 'nameEn', value: 'New Project Name' },
            { field: 'roleEn', value: 'Senior Lead' },
            { field: 'roleEs', value: 'Lider Senior' },
            { field: 'roleFr', value: 'Chef Senior' },
            { field: 'locationEn', value: 'Paris' },
        ];

        for (const update of updates) {
            actor.send({
                type: 'UPDATE_ENTRY',
                section: 'projects',
                id: projectId,
                field: update.field,
                value: update.value
            });

            const state = actor.getSnapshot();
            const entry = state.context.data.projects.find((e: any) => e.id === projectId);
            expect(entry[update.field]).toBe(update.value);
        }
    });

    it('should update and persist Skills categories', async () => {
        const skillId = 'skl1';
        actor.send({
            type: 'UPDATE_ENTRY',
            section: 'skills',
            id: skillId,
            field: 'category',
            value: 'tools'
        });

        const state = actor.getSnapshot();
        const entry = state.context.data.skills.find((s: any) => s.id === skillId);
        expect(entry.category).toBe('tools');
    });

    it('should reflect changes across all remaining sections', () => {
        const sections = ['experience', 'leadership', 'certificates', 'languages', 'awards'] as const;
        
        sections.forEach(section => {
            const id = (actor.getSnapshot().context.data[section][0] as any).id;
            const field = section === 'languages' ? 'level' : 'descriptionEn';
            const value = 'Deeply Updated Content';

            actor.send({
                type: 'UPDATE_ENTRY',
                section,
                id,
                field,
                value
            });

            const entry = actor.getSnapshot().context.data[section].find((it: any) => it.id === id);
            expect(entry[field]).toBe(value);
        });
    });

    it('should transition to saving state and then clear dirty flag on success', () => {
        actor.send({ type: 'UPDATE_HEADER', field: 'name', value: 'Dirty Name' });
        expect(actor.getSnapshot().context.isDirty).toBe(true);

        actor.send({ type: 'SAVE' });
        expect(actor.getSnapshot().matches('saving')).toBe(true);

        actor.send({ type: 'SAVE_SUCCESS' });
        expect(actor.getSnapshot().matches('idle')).toBe(true);
        expect(actor.getSnapshot().context.isDirty).toBe(false);
        expect(actor.getSnapshot().context.lastSaved).not.toBeNull();
    });
});

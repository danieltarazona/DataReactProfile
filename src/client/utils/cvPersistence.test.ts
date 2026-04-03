import { describe, it, expect } from 'vitest';
import { mapCVDataToPreview } from './cvMapping';

describe('cvMapping - Nested Project Fields Persistence', () => {
    const defaultHeader = { name: 'Test', titleEn: 'Title', email: 'e', phone: 'p', github: 'g' };

    it('should correctly map all fields of a nested project', () => {
        const sampleData: any = {
            header: defaultHeader,
            roles: [{ id: 'dev', name: 'Developer' }],
            experience: [
                {
                    id: 'exp1',
                    company: 'Test Corp',
                    descriptionEn: 'Job Description',
                    roleIds: 'all'
                }
            ],
            projects: [
                {
                    id: 'proj1',
                    experienceId: 'exp1',
                    nameEn: 'Project Alpha',
                    roleEn: 'Lead Architect',
                    locationEn: 'Remote',
                    descriptionEn: 'Building the core.',
                    dateStart: 'Jan 2024',
                    dateEnd: 'Dec 2024',
                    link: 'https://alpha.tech',
                    roleIds: 'all',
                    sortOrder: 1
                }
            ],
            sectionOrder: [{ sectionKey: 'experience', visible: 1 }]
        };

        const mapped = mapCVDataToPreview(sampleData, 'all', 'en');
        const exp = mapped.experience[0];
        const desc = exp.description;
        
        // Verify description is CLEAN (no injected projects)
        expect(desc).toBe('Job Description');
        
        // Verify structural projects array
        expect(exp.projects[0].name).toBe('Project Alpha');
        expect(exp.projects[0].role).toBe('Lead Architect');
        expect(exp.projects[0].description).toBe('Building the core.');
        expect(exp.projects[0].date).toBe('Jan 2024 - Dec 2024');
    });

    it('should maintain sort order of projects within an experience', () => {
        const sampleData: any = {
            header: defaultHeader,
            roles: [{ id: 'all', name: 'All' }],
            experience: [{ id: 'exp1', company: 'Corp', descriptionEn: 'Desc', roleIds: 'all' }],
            projects: [
                { id: 'p2', experienceId: 'exp1', nameEn: 'Second', sortOrder: 2, roleIds: 'all' },
                { id: 'p1', experienceId: 'exp1', nameEn: 'First', sortOrder: 1, roleIds: 'all' }
            ],
            sectionOrder: [{ sectionKey: 'experience', visible: 1 }]
        };

        const mapped = mapCVDataToPreview(sampleData, 'all', 'en');
        const firstProj = mapped.experience[0].projects[0];
        const secondProj = mapped.experience[0].projects[1];
        
        expect(firstProj.name).toBe('First');
        expect(secondProj.name).toBe('Second');
    });
});

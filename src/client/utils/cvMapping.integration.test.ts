import { describe, it, expect, vi } from 'vitest';
import { mapCVDataToPreview } from './cvMapping';
import * as api from '../api';

// Mock getLocalizedField to simplify testing
vi.spyOn(api, 'getLocalizedField').mockImplementation((entry: any, field: string, lang: string) => {
    const suffix = lang === 'en' ? 'En' : lang === 'es' ? 'Es' : 'Fr';
    return entry[`${field}${suffix}`] || entry[`${field}`] || '';
});

describe('cvMapping Integration - Nested Projects', () => {
    const mockData: any = {
        header: { name: 'John Doe', titleEn: 'Dev' },
        experience: [
            { id: 'exp-1', company: 'Google', descriptionEn: 'Base Description', roleIds: 'all' }
        ],
        projects: [
            { id: 'p1', nameEn: 'Project A', roleEn: 'Lead', descriptionEn: 'First one', experienceId: 'exp-1', roleIds: 'all', sortOrder: 1 },
            { id: 'p2', nameEn: 'Project B', roleEn: 'Dev', descriptionEn: 'Second one', experienceId: 'exp-1', roleIds: 'all', sortOrder: 2 }
        ],
        sectionOrder: []
    };

    it('should map nested projects into experience.projects for preview visibility', () => {
        const mapped = mapCVDataToPreview(mockData, 'all', 'en');
        const exp = mapped.experience[0];
        
        expect(exp.description).toBe('Base Description');
        expect(exp.projects).toHaveLength(2);
        expect(exp.projects[0].name).toBe('Project A');
        expect(exp.projects[0].role).toBe('Lead');
    });

    it('should handle nested projects even if base description is empty', () => {
        const dataNoDesc = {
            ...mockData,
            experience: [{ id: 'exp-1', company: 'Google', descriptionEn: '', roleIds: 'all' }]
        };
        const mapped = mapCVDataToPreview(dataNoDesc, 'all', 'en');
        const exp = mapped.experience[0];
        
        expect(exp.description).toBe('');
        expect(exp.projects).toHaveLength(2);
    });

    it('should correctly remove projects from experience when they are detached', () => {
        const projectDetached = {
            ...mockData,
            projects: [
                { id: 'p1', nameEn: 'Project A', roleEn: 'Lead', descriptionEn: 'First one', experienceId: null, roleIds: 'all' },
                { id: 'p2', nameEn: 'Project B', roleEn: 'Dev', descriptionEn: 'Second one', experienceId: 'exp-1', roleIds: 'all' }
            ]
        };
        const mapped = mapCVDataToPreview(projectDetached, 'all', 'en');
        const exp = mapped.experience[0];
        
        expect(exp.description).toBe('Base Description');
        expect(exp.projects).toHaveLength(1);
        expect(exp.projects[0].name).toBe('Project B');
    });

    it('should respect role filtering for nested projects', () => {
        const projectRoles = {
            ...mockData,
            projects: [
                { id: 'p1', nameEn: 'Mobile Job', roleEn: 'Dev', descriptionEn: 'iOS', experienceId: 'exp-1', roleIds: 'mobile' },
                { id: 'p2', nameEn: 'Web Job', roleEn: 'Dev', descriptionEn: 'React', experienceId: 'exp-1', roleIds: 'web' }
            ]
        };
        
        const mappedMobile = mapCVDataToPreview(projectRoles, 'mobile', 'en');
        expect(mappedMobile.experience[0].projects).toHaveLength(1);
        expect(mappedMobile.experience[0].projects[0].name).toBe('Mobile Job');

        const mappedWeb = mapCVDataToPreview(projectRoles, 'web', 'en');
        expect(mappedWeb.experience[0].projects).toHaveLength(1);
        expect(mappedWeb.experience[0].projects[0].name).toBe('Web Job');
    });
});

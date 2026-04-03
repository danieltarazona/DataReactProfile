import { describe, it, expect, vi } from 'vitest';
import { isVisibleForRole, mapCVDataToPreview } from './cvMapping';
import * as api from '../api';

// Mock getLocalizedField to simplify testing
vi.spyOn(api, 'getLocalizedField').mockImplementation((entry: any, field: string, lang: string) => {
    const suffix = lang === 'en' ? 'En' : lang === 'es' ? 'Es' : 'Fr';
    return entry[`${field}${suffix}`] || entry[`${field}En`] || '';
});

describe('isVisibleForRole', () => {
    it('should show all items if activeRoleId is "all"', () => {
        expect(isVisibleForRole({ roleIds: 'specific' }, 'all')).toBe(true);
    });

    it('should show items with "all" in their roleIds', () => {
        expect(isVisibleForRole({ roleIds: 'all' }, 'specific')).toBe(true);
    });

    it('should show item if activeRoleId is in it.roleIds', () => {
        expect(isVisibleForRole({ roleIds: 'mobile,web' }, 'mobile')).toBe(true);
        expect(isVisibleForRole({ roleIds: 'mobile, web' }, 'web')).toBe(true);
    });

    it('should hide item if activeRoleId is not in it.roleIds', () => {
        expect(isVisibleForRole({ roleIds: 'mobile' }, 'web')).toBe(false);
    });

    it('should show item if it has no roleIds (backwards compatibility)', () => {
        expect(isVisibleForRole({}, 'mobile')).toBe(true);
    });
});

describe('mapCVDataToPreview', () => {
    const mockData: any = {
        header: {
            name: 'John Doe',
            titleEn: 'Engineer',
            locationEn: 'NYC'
        },
        education: [
            { id: '1', institutionEn: 'MIT', degreeEn: 'BS', roleIds: 'all' },
            { id: '2', institutionEn: 'Stanford', degreeEn: 'MS', roleIds: 'mobile' }
        ],
        sectionOrder: []
    };

    it('should map education fields correctly for "all" role', () => {
        const mapped = mapCVDataToPreview(mockData, 'all', 'en');
        expect(mapped.education).toHaveLength(2);
        expect(mapped.education[0].institution).toBe('MIT');
        expect(mapped.education[1].institution).toBe('STANFORD');
    });

    it('should filter education by specific role', () => {
        const mapped = mapCVDataToPreview(mockData, 'mobile', 'en');
        expect(mapped.education).toHaveLength(2); // 'all' is included
        
        const mappedSpecific = mapCVDataToPreview({
            ...mockData,
            education: [
                { id: '1', institutionEn: 'MIT', roleIds: 'web' },
                { id: '2', institutionEn: 'Stanford', roleIds: 'mobile' }
            ]
        }, 'mobile', 'en');
        expect(mappedSpecific.education).toHaveLength(1);
        expect(mappedSpecific.education[0].institution).toBe('STANFORD');
    });

    it('should respect sectionOrder visibility', () => {
        const dataWithOrder = {
            ...mockData,
            sectionOrder: [{ sectionKey: 'education', visible: 0 }]
        };
        const mapped = mapCVDataToPreview(dataWithOrder, 'all', 'en');
        expect(mapped.education).toHaveLength(0);
    });

    it('should map skills correctly with separated fields for Programming, Design, and Tools', () => {
        const skillsData = {
            ...mockData,
            skills: [
                { id: 's1', nameEn: 'Figma', category: 'design', roleIds: 'all' },
                { id: 's2', nameEn: 'Cursor', category: 'tools', roleIds: 'all' }
            ]
        };
        const mapped = mapCVDataToPreview(skillsData, 'all', 'en');
        expect(mapped.skills.design).toBe('Figma');
        expect(mapped.skills.tools).toBe('Cursor');
    });

    it('should nest projects within experiences', () => {
        const nestedData = {
            ...mockData,
            experience: [{ id: 'exp-1', company: 'Google', roleIds: 'all' }],
            projects: [{ id: 'proj-1', nameEn: 'AI Bot', experienceId: 'exp-1', roleIds: 'all' }]
        };
        const mapped = mapCVDataToPreview(nestedData, 'all', 'en');
        expect(mapped.experience[0].projects).toHaveLength(1);
        expect(mapped.experience[0].projects[0].name).toBe('AI Bot');
    });

    it('should filter nested projects by role', () => {
        const nestedData = {
            ...mockData,
            experience: [{ id: 'exp-1', company: 'Google', roleIds: 'all' }],
            projects: [
                { id: 'proj-1', nameEn: 'Mobile App', roleEn: 'Dev', descriptionEn: 'iOS', experienceId: 'exp-1', roleIds: 'mobile' },
                { id: 'proj-2', nameEn: 'Web App', roleEn: 'Front', descriptionEn: 'React', experienceId: 'exp-1', roleIds: 'web' }
            ]
        };
        const mappedMobile = mapCVDataToPreview(nestedData, 'mobile', 'en');
        expect(mappedMobile.experience[0].projects[0].name).toBe('Mobile App');

        const mappedWeb = mapCVDataToPreview(nestedData, 'web', 'en');
        expect(mappedWeb.experience[0].projects).toHaveLength(1);
        expect(mappedWeb.experience[0].projects[0].name).toBe('Web App');
    });

    it('should sort certificates by date (most recent first)', () => {
        const certData = {
            ...mockData,
            certificates: [
                { id: 'c1', nameEn: 'Old Cert', issuerEn: 'Org', date: 'January 01, 2010', roleIds: 'all' },
                { id: 'c2', nameEn: 'New Cert', issuerEn: 'Org', date: 'December 31, 2023', roleIds: 'all' },
                { id: 'c3', nameEn: 'Mid Cert', issuerEn: 'Org', date: 'June 15, 2015', roleIds: 'all' }
            ]
        };
        const mapped = mapCVDataToPreview(certData, 'all', 'en');
        expect(mapped.certificates).toHaveLength(3);
        expect(mapped.certificates[0].name).toBe('New Cert');
        expect(mapped.certificates[1].name).toBe('Mid Cert');
        expect(mapped.certificates[2].name).toBe('Old Cert');
    });

    it('should override header title with active role jobTitle', () => {
        const dataWithRoles = {
            ...mockData,
            roles: [
                { id: 'r1', name: 'Mobile', jobTitle: 'Senior iOS Engineer' },
                { id: 'r2', name: 'Web', jobTitle: 'React Expert' }
            ]
        };
        
        const mappedMobile = mapCVDataToPreview(dataWithRoles, 'r1', 'en');
        expect(mappedMobile.header.title).toBe('Senior iOS Engineer');

        const mappedWeb = mapCVDataToPreview(dataWithRoles, 'r2', 'en');
        expect(mappedWeb.header.title).toBe('React Expert');

        const mappedBase = mapCVDataToPreview(dataWithRoles, 'all', 'en');
        expect(mappedBase.header.title).toBe('Engineer'); // Fallback to header.titleEn
    });
});

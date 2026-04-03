import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isVisibleForRole, mapCVDataToPreview } from './cvMapping';
import * as api from '../api';

describe('Role Visibility & Mapping Logic', () => {
    
    describe('isVisibleForRole', () => {
        it('should return true if activeRoleId is "all"', () => {
            const item = { roleIds: 'specific' };
            expect(isVisibleForRole(item, 'all')).toBe(true);
        });

        it('should return true if item roleIds includes "all"', () => {
            const item = { roleIds: 'all' };
            expect(isVisibleForRole(item, 'mobile')).toBe(true);
        });

        it('should return true if specific role match exists', () => {
            const item = { roleIds: 'mobile, web' };
            expect(isVisibleForRole(item, 'mobile')).toBe(true);
            expect(isVisibleForRole(item, 'web')).toBe(true);
        });

        it('should return false if no match and not all', () => {
            const item = { roleIds: 'mobile' };
            expect(isVisibleForRole(item, 'web')).toBe(false);
        });

        it('should handle case insensitivity', () => {
            const item = { roleIds: 'Mobile' };
            expect(isVisibleForRole(item, 'mobile')).toBe(true);
        });
    });

    describe('mapCVDataToPreview - Header Override', () => {
        const mockData: api.FullCVData = {
            roles: [
                { id: 'mobile', name: 'Mobile', jobTitle: 'iOS Developer', sortOrder: 0 },
                { id: 'web', name: 'Web', jobTitle: 'Fullstack Engineer', sortOrder: 1 }
            ],
            header: {
                id: 'default',
                name: 'John Doe',
                titleEn: 'Default Title', titleEs: '', titleFr: '',
                location: 'NYC',
                locationEn: 'NYC', locationEs: '', locationFr: '',
                email: 'john@example.com', phone: '123', github: 'git'
            },
            education: [], experience: [], projects: [], skills: [],
            leadership: [], certificates: [], languages: [], awards: [],
            sectionOrder: []
        };

        it('should use default header title when role is "all"', () => {
            const mapped = mapCVDataToPreview(mockData, 'all', 'en');
            expect(mapped.header.title).toBe('Default Title');
        });

        it('should override header title with active focus role job title', () => {
            const mappedMobile = mapCVDataToPreview(mockData, 'mobile', 'en');
            expect(mappedMobile.header.title).toBe('iOS Developer');

            const mappedWeb = mapCVDataToPreview(mockData, 'web', 'en');
            expect(mappedWeb.header.title).toBe('Fullstack Engineer');
        });

        it('should fallback to default title if role has no jobTitle defined', () => {
            const dataNoTitle = { ...mockData, roles: [{ id: 'empty', name: 'Empty', jobTitle: '', sortOrder: 0 }] };
            const mapped = mapCVDataToPreview(dataNoTitle, 'empty', 'en');
            expect(mapped.header.title).toBe('Default Title');
        });
    });
});

describe('API Role CRUD (Mocked)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.unstubAllGlobals();
    });

    it('should call DELETE /api/cv/roles/:id when deleting a role', async () => {
        const fetchSpy = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });
        vi.stubGlobal('fetch', fetchSpy);

        await api.deleteRole('role-to-delete');
        
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('/api/cv/roles/role-to-delete'),
            expect.objectContaining({ method: 'DELETE' })
        );
    });

    it('should call POST /api/cv/roles when creating a role', async () => {
        const fetchSpy = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: 'new-id', success: true }),
        });
        vi.stubGlobal('fetch', fetchSpy);

        const result = await api.createRole('Designer', 'UI Expert');
        
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('/api/cv/roles'),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ name: 'Designer', jobTitle: 'UI Expert' })
            })
        );
        expect(result.id).toBe('new-id');
    });
});

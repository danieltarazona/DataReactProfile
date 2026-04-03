import { describe, it, expect } from 'vitest';
import { isVisibleForRole } from './cvMapping';

describe('CV Role Management Logic', () => {
    const mockRoles = [
        { id: 'all', name: 'All', jobTitle: 'Fullstack Developer' },
        { id: 'mobile', name: 'Mobile', jobTitle: 'iOS Developer' },
        { id: 'frontend', name: 'Frontend', jobTitle: 'React Developer' },
    ];

    it('should correctly filter visibility based on roleIds string', () => {
        const item = { roleIds: 'mobile, frontend' };
        
        expect(isVisibleForRole(item, 'mobile')).toBe(true);
        expect(isVisibleForRole(item, 'frontend')).toBe(true);
        expect(isVisibleForRole(item, 'backend')).toBe(false);
        expect(isVisibleForRole(item, 'all')).toBe(true);
    });

    it('should treat items with "all" roleIds as visible to everyone', () => {
        const item = { roleIds: 'all' };
        expect(isVisibleForRole(item, 'mobile')).toBe(true);
        expect(isVisibleForRole(item, 'any-other-role')).toBe(true);
    });

    it('should handle missing or empty roleIds by defaulting to visible', () => {
        expect(isVisibleForRole({}, 'mobile')).toBe(true);
        expect(isVisibleForRole({ roleIds: '' }, 'mobile')).toBe(true);
    });

    it('should be case-insensitive for role matching', () => {
        const item = { roleIds: 'Mobile, FRONTEND' };
        expect(isVisibleForRole(item, 'mobile')).toBe(true);
        expect(isVisibleForRole(item, 'frontend')).toBe(true);
    });
});

describe('Role Update Logic (Unit Simulation)', () => {
    it('should correctly merge updates into a role object', () => {
        const roles = [
            { id: 'role-1', name: 'Original Name', jobTitle: 'Original Title' },
            { id: 'role-2', name: 'Other', jobTitle: 'Other' }
        ];
        
        const targetId = 'role-1';
        const updates = { name: 'New Name', jobTitle: 'New Title' };
        
        const updatedRoles = roles.map(r => r.id === targetId ? { ...r, ...updates } : r);
        
        expect(updatedRoles[0].name).toBe('New Name');
        expect(updatedRoles[0].jobTitle).toBe('New Title');
        expect(updatedRoles[1].name).toBe('Other'); // Unchanged
    });
});

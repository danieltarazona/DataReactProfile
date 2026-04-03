/**
 * XState Machine for CV Data State Management
 * Updated for D1 API integration and Trilingual fields
 */

import { createMachine, assign } from 'xstate';
import type { FullCVData, CVRole, CVHeaderData, CVEntry } from '../client/api';

// Machine context
interface CVContext {
    data: FullCVData | null;
    activeRoleId: string;
    isDirty: boolean;
    lastSaved: Date | null;
    error: string | null;
}

// Machine events
type CVEvent =
    | { type: 'LOAD_DATA'; data: FullCVData }
    | { type: 'SET_ROLE'; roleId: string }
    | { type: 'UPDATE_HEADER'; field: keyof CVHeaderData; value: string }
    | { type: 'UPDATE_ENTRY'; section: keyof FullCVData; id: string; field: string; value: string }
    | { type: 'UPDATE_ENTRY_ROLES'; section: keyof FullCVData; id: string; roleIds: string }
    | { type: 'ADD_ENTRY'; section: keyof FullCVData; entry: CVEntry }
    | { type: 'REMOVE_ENTRY'; section: keyof FullCVData; id: string }
    | { type: 'REORDER_ENTRIES'; section: keyof FullCVData; items: any[] }
    | { type: 'REORDER_SECTIONS'; sections: any[] }
    | { type: 'UPDATE_ROLES'; roles: CVRole[] }
    | { type: 'SAVE' }
    | { type: 'SAVE_SUCCESS' }
    | { type: 'SAVE_ERROR'; error: string }
    | { type: 'CLEAR_ERROR' };

// CV State Machine
export const cvMachine = createMachine({
    id: 'cvEditor',
    initial: 'loading',
    types: {} as {
        context: CVContext;
        events: CVEvent;
    },
    context: {
        data: null,
        activeRoleId: 'all',
        isDirty: false,
        lastSaved: null,
        error: null,
    },
    states: {
        loading: {
            on: {
                LOAD_DATA: {
                    target: 'idle',
                    actions: assign({
                        data: ({ event }) => event.data,
                        isDirty: () => false,
                    }),
                },
            },
        },
        idle: {
            on: {
                LOAD_DATA: {
                    actions: assign({
                        data: ({ event }) => event.data,
                        isDirty: () => false,
                    }),
                },
                SET_ROLE: {
                    actions: assign({
                        activeRoleId: ({ event }) => event.roleId,
                    }),
                },
                UPDATE_HEADER: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data || !context.data.header) return context.data;
                            return {
                                ...context.data,
                                header: {
                                    ...context.data.header,
                                    [event.field]: event.value,
                                },
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                UPDATE_ENTRY: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            const section = context.data[event.section] as CVEntry[];
                            const updated = section.map(item =>
                                item.id === event.id ? { ...item, [event.field]: event.value } : item
                            );
                            return {
                                ...context.data,
                                [event.section]: updated,
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                UPDATE_ENTRY_ROLES: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            const section = context.data[event.section] as CVEntry[];
                            const updated = section.map(item =>
                                item.id === event.id ? { ...item, roleIds: event.roleIds } : item
                            );
                            return {
                                ...context.data,
                                [event.section]: updated,
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                ADD_ENTRY: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            return {
                                ...context.data,
                                [event.section]: [...(context.data[event.section] as CVEntry[]), event.entry],
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                REMOVE_ENTRY: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            return {
                                ...context.data,
                                [event.section]: (context.data[event.section] as CVEntry[]).filter(item => item.id !== event.id),
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                REORDER_ENTRIES: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            return {
                                ...context.data,
                                [event.section]: event.items,
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                REORDER_SECTIONS: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            return {
                                ...context.data,
                                sectionOrder: event.sections,
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                UPDATE_ROLES: {
                    actions: assign({
                        data: ({ context, event }) => {
                            if (!context.data) return context.data;
                            return {
                                ...context.data,
                                roles: event.roles,
                            };
                        },
                        isDirty: () => true,
                    }),
                },
                SAVE: {
                    target: 'saving',
                },
                CLEAR_ERROR: {
                    actions: assign({
                        error: () => null,
                    }),
                },
            },
        },
        saving: {
            on: {
                SAVE_SUCCESS: {
                    target: 'idle',
                    actions: assign({
                        isDirty: () => false,
                        lastSaved: () => new Date(),
                    }),
                },
                SAVE_ERROR: {
                    target: 'idle',
                    actions: assign({
                        error: ({ event }) => event.error,
                    }),
                },
            },
        },
    },
});


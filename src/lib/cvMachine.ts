/**
<<<<<<< HEAD
 * XState Machine for CV Data State Management
 * Updated for D1 API integration and Trilingual fields
 */

import { createMachine, assign } from 'xstate';
import type { FullCVData, CVRole, CVHeaderData, CVEntry } from '../client/api';

// Machine context
interface CVContext {
    data: FullCVData | null;
    activeRoleId: string;
=======
 * Custom hook for CV Data State Management
 */

import { useReducer, useEffect } from 'react';
import type { CVData } from '@datakit/react-core';

export interface CVContext {
    data: CVData;
>>>>>>> 3e03fc60d311899ce07700181ff6b72c3def2aa9
    isDirty: boolean;
    lastSaved: Date | null;
    error: string | null;
}

<<<<<<< HEAD
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
=======
export type CVEvent =
    | { type: 'UPDATE_HEADER'; field: keyof CVData['header']; value: string }
    | { type: 'UPDATE_SKILLS'; field: 'programming' | 'design' | 'tools'; value: string }
    | { type: 'UPDATE_ITEM'; section: 'education' | 'experience' | 'leadership' | 'certificates'; index: number; field: string; value: string }
    | { type: 'UPDATE_PROJECT'; index: number; field: string; value: string }
    | { type: 'ADD_ITEM'; section: 'education' | 'experience' | 'leadership' | 'certificates' }
    | { type: 'ADD_PROJECT' }
    | { type: 'REMOVE_ITEM'; section: 'education' | 'experience' | 'leadership' | 'certificates'; index: number }
    | { type: 'REMOVE_PROJECT'; index: number }
>>>>>>> 3e03fc60d311899ce07700181ff6b72c3def2aa9
    | { type: 'SAVE' }
    | { type: 'SAVE_SUCCESS' }
    | { type: 'SAVE_ERROR'; error: string }
    | { type: 'CLEAR_ERROR' };

<<<<<<< HEAD
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
=======
const initialData: CVData = {
    header: {
        name: '',
        title: '',
        location: '',
        email: '',
        phone: '',
        github: '',
        summary: '',
    },
    education: [],
    skills: {
        programming: '',
        design: '',
        tools: '',
        projects: [],
    },
    experience: [],
    leadership: [],
    certificates: [],
};

const defaultItems = {
    education: { institution: '', location: '', degree: '', date: '', coursework: '' },
    experience: { company: '', role: '', date: '', location: '', description: '' },
    leadership: { organization: '', role: '', date: '', location: '', description: '' },
    certificates: { name: '', issuer: '', date: '', description: '' },
    project: { name: '', date: '', description: '' },
};

function cvReducer(state: CVContext, event: CVEvent): CVContext {
    switch (event.type) {
        case 'UPDATE_HEADER':
            return {
                ...state,
                data: {
                    ...state.data,
                    header: {
                        ...state.data.header,
                        [event.field]: event.value,
                    },
                },
                isDirty: true,
            };
        case 'UPDATE_SKILLS':
            return {
                ...state,
                data: {
                    ...state.data,
                    skills: {
                        ...state.data.skills,
                        [event.field]: event.value,
                    },
                },
                isDirty: true,
            };
        case 'UPDATE_ITEM': {
            const section = state.data[event.section] as unknown as Record<string, unknown>[];
            const updatedSection = section.map((item, i) =>
                i === event.index ? { ...item, [event.field]: event.value } : item
            );
            return {
                ...state,
                data: {
                    ...state.data,
                    [event.section]: updatedSection,
                },
                isDirty: true,
            };
        }
        case 'UPDATE_PROJECT':
            return {
                ...state,
                data: {
                    ...state.data,
                    skills: {
                        ...state.data.skills,
                        projects: state.data.skills.projects.map((proj, i) =>
                            i === event.index ? { ...proj, [event.field]: event.value } : proj
                        ),
                    },
                },
                isDirty: true,
            };
        case 'ADD_ITEM':
            return {
                ...state,
                data: {
                    ...state.data,
                    [event.section]: [
                        ...state.data[event.section],
                        { ...defaultItems[event.section] },
                    ],
                },
                isDirty: true,
            };
        case 'ADD_PROJECT':
            return {
                ...state,
                data: {
                    ...state.data,
                    skills: {
                        ...state.data.skills,
                        projects: [...state.data.skills.projects, { ...defaultItems.project }],
                    },
                },
                isDirty: true,
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                data: {
                    ...state.data,
                    [event.section]: state.data[event.section].filter((_, i) => i !== event.index),
                },
                isDirty: true,
            };
        case 'REMOVE_PROJECT':
            return {
                ...state,
                data: {
                    ...state.data,
                    skills: {
                        ...state.data.skills,
                        projects: state.data.skills.projects.filter((_, i) => i !== event.index),
                    },
                },
                isDirty: true,
            };
        case 'LOAD_DATA':
            return {
                ...state,
                data: event.data,
                isDirty: false,
            };
        case 'SAVE':
            return {
                ...state,
            };
        case 'SAVE_SUCCESS':
            return {
                ...state,
                isDirty: false,
                lastSaved: new Date(),
            };
        case 'SAVE_ERROR':
            return {
                ...state,
                error: event.error,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export function useCV() {
    const [state, dispatch] = useReducer(cvReducer, {
        data: initialData,
        isDirty: false,
        lastSaved: null,
        error: null,
    });
>>>>>>> 3e03fc60d311899ce07700181ff6b72c3def2aa9

    const send = (event: CVEvent) => {
        dispatch(event);
        if (event.type === 'SAVE') {
            try {
                // Assuming localStorage saving is handled in the component tracking isDirty,
                // but we emit success immediately here as a surrogate for the machine's "saving" state transition
                dispatch({ type: 'SAVE_SUCCESS' });
            } catch (error: any) {
                dispatch({ type: 'SAVE_ERROR', error: error.message || 'Failed to save' });
            }
        }
    };

    return [state, send] as const;
}

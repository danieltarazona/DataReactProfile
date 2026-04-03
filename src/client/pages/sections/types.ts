import type { FullCVData, CVEntry, CVRole } from '../../api';

/**
 * Common props shared by all section editor components.
 */
export interface SectionEditorProps {
    data: FullCVData;
    activeRoleId: string;
    isVisibleForRole: (item: any) => boolean;
    t: (key: string, opts?: any) => string;
    lang: string;
    sectHook: any;
}

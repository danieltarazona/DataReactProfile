import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useMachine } from '@xstate/react';
import { cvMachine } from '@/lib/cvMachine';
import {
    HeaderSection, EducationSection, SkillsSection, ExperienceSection,
    LeadershipSection, CertificatesSection, Sidebar, TopBar,
    PDFPreviewPanel, Button,
    type CVData
} from '@datakit/react-core';
import { Login, useAuth } from '@datakit/cloudflare-login';
import { RoleManager, RoleSelector } from '../components/RoleComponents';
import { LanguagesSection } from '../components/LanguagesSection';
import { Plus, Trash2, GripVertical, RefreshCw } from 'lucide-react';
import { useCVSection } from '../hooks/useCVSection';
import { SortableList } from '../components/SortableList';
import { TimelineView } from '../components/TimelineView';
import { CVCodeEditor } from '../components/CVCodeEditor';
import * as api from '../api';

type SectionId = 'roles' | 'header' | 'education' | 'skills' | 'experience' | 'leadership' | 'certificates' | 'languages' | 'projects' | 'awards' | 'timeline' | 'code';

const sections: { id: SectionId; icon: string }[] = [
    { id: 'roles', icon: '👥' },
    { id: 'header', icon: '👤' },
    { id: 'education', icon: '🎓' },
    { id: 'skills', icon: '💻' },
    { id: 'experience', icon: '💼' },
    { id: 'projects', icon: '📁' },
    { id: 'leadership', icon: '🏆' },
    { id: 'certificates', icon: '📜' },
    { id: 'languages', icon: '🌐' },
    { id: 'awards', icon: '🏅' },
    { id: 'timeline', icon: '📅' },
    { id: 'code', icon: '⌨️' },
];

export default function Home() {
    const { t, i18n } = useTranslation();
    const [state, send] = useMachine(cvMachine);
    const [activeSection, setActiveSection] = useState<SectionId>('header');
    const [showPreview, setShowPreview] = useState(true);

    const {
        isAuthenticated,
        isLoading: authLoading,
        error: authError,
        login: handleLogin,
        logout: handleLogout,
        clearError
    } = useAuth({
        apiPath: '/api/auth'
    });

    const { data, activeRoleId, isDirty, lastSaved } = state.context;

    // Expert Hooks for Section Management
    const educationSect = useCVSection('education', send, data);
    const experienceSect = useCVSection('experience', send, data);
    const projectsSect = useCVSection('projects', send, data);
    const skillsSect = useCVSection('skills', send, data);
    const leadershipSect = useCVSection('leadership', send, data);
    const certificatesSect = useCVSection('certificates', send, data);
    const languagesSect = useCVSection('languages', send, data);
    const awardsSect = useCVSection('awards', send, data);

    // Load all data from API on mount/auth
    useEffect(() => {
        if (isAuthenticated) {
            api.fetchAllCVData().then(allData => {
                send({ type: 'LOAD_DATA', data: allData });
            }).catch(err => {
                console.error('Error loading CV data:', err);
            });
        }
    }, [isAuthenticated, send]);

    // Handle saving
    useEffect(() => {
        if (isDirty && isAuthenticated && data) {
            const timer = setTimeout(async () => {
                send({ type: 'SAVE' });
                try {
                    // In a real app, we'd only save the changed item.
                    // For this refactor, we provide a generic way to save.
                    // Since it's a prototype, we'll assume the SAVE machine state handles it
                    // but for now we'll just mock success.
                    send({ type: 'SAVE_SUCCESS' });
                } catch (err: any) {
                    send({ type: 'SAVE_ERROR', error: err.message });
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isDirty, send, data, isAuthenticated]);

    // Map trilingual data to active language for PDF preview
    const mappedPreviewData = useMemo((): CVData | null => {
        if (!data) return null;

        const lang = i18n.language;
        const roleId = activeRoleId;
        const activeRole = data.roles?.find(r => r.id === roleId);

        const isVisible = (item: any) => {
            if (roleId === 'all') return true;
            if (!item.roleIds) return true;
            const roles = item.roleIds.split(',').map((s: string) => s.trim());
            return roles.includes('all') || roles.includes(roleId);
        };

        const mapFields = (item: any, fields: string[]) => {
            const result: any = { ...item };
            fields.forEach(f => {
                result[f] = api.getLocalizedField(item, f, lang);
            });
            return result;
        };

        const visibleSections = data.sectionOrder
            ? data.sectionOrder.filter(s => s.visible !== 0).map(s => s.sectionKey)
            : ['header', 'education', 'skills', 'experience', 'projects', 'leadership', 'certificates', 'languages'];

        const header = data.header || { id: 'default', name: '', titleEn: '', titleEs: '', titleFr: '', locationEn: '', locationEs: '', locationFr: '', email: '', phone: '', github: '', summaryEn: '', summaryEs: '', summaryFr: '', updatedAt: '' };

        return {
            header: {
                ...header,
                title: activeRole?.jobTitle || api.getLocalizedField(header, 'title', lang),
                location: api.getLocalizedField(header, 'location', lang),
                summary: api.getLocalizedField(header, 'summary', lang),
            },
            education: visibleSections.includes('education')
                ? (data.education || []).filter(isVisible).map(it => ({
                    ...mapFields(it, ['institution', 'location', 'degree', 'coursework', 'honors', 'projects']),
                    gpa: it.gpa,
                    satScores: it.satScores
                }))
                : [],
            experience: visibleSections.includes('experience')
                ? (data.experience || []).filter(isVisible).map(it => {
                    const mappedExp = mapFields(it, ['role', 'description', 'location']);
                    mappedExp.projects = (data.projects || [])
                        .filter(p => p.experienceId === it.id && isVisible(p))
                        .map(p => ({
                            ...mapFields(p, ['name', 'description', 'location']),
                            link: p.link
                        }));
                    return mappedExp;
                })
                : [],
            skills: {
                programming: visibleSections.includes('skills') 
                    ? (data.skills || []).filter(s => s.category === 'programming').filter(isVisible).map(s => api.getLocalizedField(s, 'name', lang)).join(', ') : '',
                design: visibleSections.includes('skills') 
                    ? (data.skills || []).filter(s => s.category === 'design').filter(isVisible).map(s => api.getLocalizedField(s, 'name', lang)).join(', ') : '',
                tools: visibleSections.includes('skills') 
                    ? (data.skills || []).filter(s => s.category === 'tools').filter(isVisible).map(s => api.getLocalizedField(s, 'name', lang)).join(', ') : '',
                projects: visibleSections.includes('projects')
                    ? (data.projects || []).filter(p => !p.experienceId && isVisible(p)).map(it => ({
                        ...mapFields(it, ['name', 'description', 'location']),
                        link: it.link
                    }))
                    : [],
            },
            leadership: visibleSections.includes('leadership')
                ? (data.leadership || []).filter(isVisible).map(it => mapFields(it, ['organization', 'role', 'description', 'location']))
                : [],
            certificates: visibleSections.includes('certificates')
                ? (data.certificates || []).filter(isVisible).map(it => mapFields(it, ['name', 'issuer', 'description']))
                : [],
            languages: visibleSections.includes('languages')
                ? (data.languages || []).filter(isVisible).map(it => ({ ...it, name: api.getLocalizedField(it, 'name', lang) }))
                : [],
            awards: visibleSections.includes('awards')
                ? (data.awards || []).filter(isVisible).map(it => mapFields(it, ['name', 'issuer', 'description']))
                : [],
        } as any;
    }, [data, i18n.language, activeRoleId]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const scrollToSection = (sectionId: SectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleUpdateEntry = async (section: keyof api.FullCVData, id: string, field: string, value: string) => {
        send({ type: 'UPDATE_ENTRY', section, id, field, value });
        await api.updateEntry(section, id, { [field]: value });
    };

    const handleUpdateRoles = async (section: keyof api.FullCVData, id: string, roleIds: string) => {
        send({ type: 'UPDATE_ENTRY_ROLES', section, id, roleIds });
        await api.updateEntry(section, id, { roleIds });
    };

    if (isAuthenticated === null) {
        return <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]" />;
    }

    if (!isAuthenticated) {
        return (
            <Login
                onLogin={handleLogin}
                isLoading={authLoading}
                error={authError}
                onClearError={clearError}
                labels={{
                    title: t('auth.title'),
                    error: t('auth.error'),
                    email: t('auth.email'),
                    password: t('auth.password'),
                    loading: t('auth.loading'),
                    login: t('auth.login'),
                }}
            />
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--color-background)] text-white">
            <Sidebar className="border-r border-white/10 bg-black">
                <Sidebar.Header>
                    <div className="p-4">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            {t('app.title')}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{t('app.subtitle')}</p>
                    </div>
                </Sidebar.Header>
                <Sidebar.Content>
                    <Sidebar.Group>
                        {sections.map(section => (
                            <Sidebar.Item
                                key={section.id}
                                active={activeSection === section.id}
                                onClick={() => scrollToSection(section.id)}
                                icon={<span className="text-lg">{section.icon}</span>}
                            >
                                {t(`nav.${section.id}`)}
                            </Sidebar.Item>
                        ))}
                    </Sidebar.Group>
                </Sidebar.Content>
            </Sidebar>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="border-b border-white/10 bg-black/50 backdrop-blur-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <RoleSelector
                            roles={data?.roles || []}
                            selectedRoleIds={activeRoleId}
                            onChange={(id) => send({ type: 'SET_ROLE', roleId: id })}
                        />
                        <span className="text-xs text-gray-500">{isDirty ? t('actions.saving') : t('actions.saved')}</span>
                    </div>
                    <TopBar
                        language={i18n.language}
                        onLanguageChange={changeLanguage}
                        onExportJson={() => { }} // Placeholder
                        onTogglePreview={() => setShowPreview(!showPreview)}
                        showPreview={showPreview}
                        isDirty={isDirty}
                        lastSaved={lastSaved}
                        onLogout={handleLogout}
                        labels={{
                            saving: t('actions.saving'),
                            saved: t('actions.saved'),
                            exportJson: t('actions.exportJson'),
                            logout: t('auth.logout'),
                            preview: t('actions.preview'),
                            showPDF: t('actions.exportPdf'),
                        }}
                    />
                </div>

                <div className="flex-1 flex overflow-hidden">
                    <motion.div
                        className="flex-1 overflow-y-auto p-6"
                        animate={{ width: showPreview ? '50%' : '100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        {data && (
                            <div className="max-w-3xl mx-auto space-y-12">
                                {activeSection === 'roles' ? (
                                    <div className="space-y-8">
                                        <div className="space-y-1 mb-6">
                                            <h2 className="text-3xl font-bold tracking-tight">{t('nav.roles')}</h2>
                                            <div className="h-1.5 w-12 bg-green-500 rounded-full" />
                                        </div>
                                        <div className="card-editor">
                                            <RoleManager
                                                roles={data?.roles || []}
                                                activeRoleId={activeRoleId}
                                                onActiveRoleChange={(id) => send({ type: 'SET_ROLE', roleId: id })}
                                                onCreateRole={async (name, jobTitle) => {
                                                    const { id } = await api.createRole(name, jobTitle);
                                                    const updated = await api.fetchRoles();
                                                    send({ type: 'LOAD_DATA', data: { ...data!, roles: updated } });
                                                }}
                                                onDeleteRole={async (id) => {
                                                    await api.deleteRole(id);
                                                    const updated = await api.fetchRoles();
                                                    send({ type: 'LOAD_DATA', data: { ...data!, roles: updated } });
                                                }}
                                                onUpdateRole={async (id, updates) => {
                                                    await api.updateRole(id, updates);
                                                    const updated = await api.fetchRoles();
                                                    send({ type: 'LOAD_DATA', data: { ...data!, roles: updated } });
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : activeSection === 'timeline' ? (
                                    <TimelineView
                                        experience={data.experience}
                                        education={data.education}
                                    />
                                ) : activeSection === 'code' ? (
                                    <CVCodeEditor
                                        data={data}
                                        onUpdate={(newData) => send({ type: 'LOAD_DATA', data: newData })}
                                    />
                                ) : (
                                    <div className="space-y-12 pb-24">
                                        {/* Sortable Sections */}
                                        <SortableList
                                            items={data.sectionOrder.map(s => ({ ...s, id: s.sectionKey }))}
                                            onReorder={(items) => {
                                                const newOrder = items.map((it, idx) => ({
                                                    sectionKey: (it as any).sectionKey,
                                                    sortOrder: idx,
                                                    visible: (it as any).visible
                                                }));
                                                send({ type: 'REORDER_SECTIONS', sections: newOrder });
                                                api.reorderSections(newOrder);
                                            }}
                                            renderItem={(section: any) => {
                                                const id = section.sectionKey as SectionId;
                                                const isVisible = section.visible !== 0;

                                                const toggleVisibility = () => {
                                                    const newOrder = data.sectionOrder.map(s => 
                                                        s.sectionKey === section.sectionKey ? { ...s, visible: isVisible ? 0 : 1 } : s
                                                    );
                                                    send({ type: 'REORDER_SECTIONS', sections: newOrder });
                                                    api.reorderSections(newOrder);
                                                };

                                                if (!isVisible) {
                                                    return (
                                                        <div className="flex items-center justify-between mb-4 bg-white/5 p-6 rounded-2xl border border-dashed border-white/20">
                                                            <div className="space-y-1">
                                                                <h2 className="text-xl font-bold tracking-tight text-gray-400 capitalize">{t(`${id}.title`, { defaultValue: id })} (Hidden)</h2>
                                                            </div>
                                                            <button onClick={toggleVisibility} className="text-sm font-bold px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-white/10 transition-all border border-blue-500/30">
                                                                👁️ Show Section
                                                            </button>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="relative group/section">
                                                        <div className="absolute top-2 right-4 z-50 p-2 opacity-0 group-hover/section:opacity-100 transition-opacity flex justify-end">
                                                            <button onClick={toggleVisibility} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-black/80 text-gray-300 hover:text-white hover:bg-black backdrop-blur-sm border border-white/10 shadow-xl flex items-center gap-1.5 cursor-pointer">
                                                                <span>👁️ Hide Section</span>
                                                            </button>
                                                        </div>
                                                        {(() => {
                                                            switch (id) {
                                                    case 'header': {
                                                        const lang = i18n.language;
                                                        const headerData = {
                                                            ...data.header!,
                                                            title: api.getLocalizedField(data.header!, 'title', lang),
                                                            location: api.getLocalizedField(data.header!, 'location', lang),
                                                            summary: api.getLocalizedField(data.header!, 'summary', lang),
                                                        } as any;

                                                        return (
                                                            <HeaderSection
                                                                data={headerData}
                                                                onChange={(field, value) => {
                                                                    const machineField = api.setLocalizedField(field as string, lang);
                                                                    send({ type: 'UPDATE_HEADER', field: machineField as any, value });
                                                                    api.updateHeader({ [machineField]: value });
                                                                }}
                                                                labels={{
                                                                    title: t('header.title'),
                                                                    name: t('header.name'),
                                                                    email: t('header.email'),
                                                                    phone: t('header.phone'),
                                                                    location: t('header.location'),
                                                                    summary: t('header.summary'),
                                                                    github: t('header.github'),
                                                                }}
                                                            />
                                                        );
                                                    }
                                                    case 'education': return educationSect.renderUI(id,
                                                        <>
                                                            <div className="flex items-center justify-between mb-8">
                                                                <div className="space-y-1">
                                                                    <h2 className="text-3xl font-bold tracking-tight">{t('education.title')}</h2>
                                                                    <div className="h-1.5 w-12 bg-blue-500 rounded-full" />
                                                                </div>
                                                                <Button onClick={() => educationSect.addEntry({ institutionEn: 'New Institution' })} variant="solid" size="sm">
                                                                    <Plus size={18} className="mr-2" /> {t('education.add')}
                                                                </Button>
                                                            </div>
                                                            <SortableList
                                                                items={data.education}
                                                                onReorder={educationSect.reorderEntries}
                                                                renderItem={(item) => (
                                                                    <div className="card-editor group/card">
                                                                        <div className="flex justify-between items-start mb-6">
                                                                            <div className="flex-1 space-y-4">
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                    <div className="col-span-2">
                                                                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Institution (EN)</label>
                                                                                        <input
                                                                                            value={item.institutionEn || ''}
                                                                                            onChange={(e) => educationSect.updateEntry(item.id, 'institutionEn', e.target.value)}
                                                                                            className="text-xl font-bold bg-transparent border-none outline-none w-full"
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">GPA</label>
                                                                                        <input
                                                                                            value={item.gpa || ''}
                                                                                            onChange={(e) => educationSect.updateEntry(item.id, 'gpa', e.target.value)}
                                                                                            placeholder="3.55/4.0"
                                                                                            className="input-field-compact"
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">SAT Scores</label>
                                                                                        <input
                                                                                            value={item.satScores || ''}
                                                                                            onChange={(e) => educationSect.updateEntry(item.id, 'satScores', e.target.value)}
                                                                                            placeholder="M:780 V:760"
                                                                                            className="input-field-compact"
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                {/* Localized fields */}
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                                                                        <div key={l} className="space-y-4 pt-2 border-t border-white/5">
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Degree ({l})</label>
                                                                                                <input
                                                                                                    value={item[`degree${l}`] || ''}
                                                                                                    onChange={(e) => educationSect.updateEntry(item.id, `degree${l}`, e.target.value)}
                                                                                                    className="input-field-compact font-medium"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Coursework ({l})</label>
                                                                                                <textarea
                                                                                                    value={item[`coursework${l}`] || ''}
                                                                                                    onChange={(e) => educationSect.updateEntry(item.id, `coursework${l}`, e.target.value)}
                                                                                                    className="input-field-compact h-16 text-xs"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Honors ({l})</label>
                                                                                                <input
                                                                                                    value={item[`honors${l}`] || ''}
                                                                                                    onChange={(e) => educationSect.updateEntry(item.id, `honors${l}`, e.target.value)}
                                                                                                    className="input-field-compact text-xs"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => educationSect.removeEntry(item.id)} className="btn-icon ml-4">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <RoleSelector
                                                                            hideAll={true}
                                                                            roles={data.roles}
                                                                            selectedRoleIds={item.roleIds}
                                                                            onChange={(ids) => educationSect.updateRoles(item.id, ids)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    );
                                                    case 'experience': return experienceSect.renderUI(id,
                                                        <>
                                                            <div className="flex items-center justify-between mb-8">
                                                                <div className="space-y-1">
                                                                    <h2 className="text-3xl font-bold tracking-tight">{t('experience.title')}</h2>
                                                                    <div className="h-1.5 w-12 bg-purple-500 rounded-full" />
                                                                </div>
                                                                <Button onClick={() => experienceSect.addEntry({ company: 'New Company' })} variant="solid" size="sm">
                                                                    <Plus size={18} className="mr-2" /> {t('experience.add')}
                                                                </Button>
                                                            </div>
                                                            <SortableList
                                                                items={data.experience}
                                                                onReorder={experienceSect.reorderEntries}
                                                                renderItem={(item) => (
                                                                    <div className="card-editor">
                                                                        <div className="flex justify-between items-start mb-6">
                                                                            <div className="flex-1 space-y-4">
                                                                                <input
                                                                                    value={item.company || ''}
                                                                                    onChange={(e) => experienceSect.updateEntry(item.id, 'company', e.target.value)}
                                                                                    className="text-xl font-bold bg-transparent border-none outline-none w-full"
                                                                                    placeholder="Company"
                                                                                />
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                                                                        <div key={l} className="space-y-3 pt-3 border-t border-white/5">
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Role ({l})</label>
                                                                                                <input
                                                                                                    value={item[`role${l}`] || ''}
                                                                                                    onChange={(e) => experienceSect.updateEntry(item.id, `role${l}`, e.target.value)}
                                                                                                    className="input-field-compact font-medium"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Location ({l})</label>
                                                                                                <input
                                                                                                    value={item[`location${l}`] || ''}
                                                                                                    onChange={(e) => experienceSect.updateEntry(item.id, `location${l}`, e.target.value)}
                                                                                                    className="input-field-compact text-xs"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Description ({l})</label>
                                                                                                <textarea
                                                                                                    value={item[`description${l}`] || ''}
                                                                                                    onChange={(e) => experienceSect.updateEntry(item.id, `description${l}`, e.target.value)}
                                                                                                    className="input-field-compact h-24 text-xs"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => experienceSect.removeEntry(item.id)} className="btn-icon ml-4">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <RoleSelector
                                                                            hideAll={true}
                                                                            roles={data.roles}
                                                                            selectedRoleIds={item.roleIds}
                                                                            onChange={(ids) => experienceSect.updateRoles(item.id, ids)}
                                                                        />

                                                                        {/* Nested Projects */}
                                                                        <div className="mt-6 space-y-4 pt-4 border-t border-white/5">
                                                                            <div className="flex justify-between items-center">
                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Nested Projects</label>
                                                                                <select
                                                                                    className="bg-transparent text-xs text-blue-400 border-none outline-none cursor-pointer"
                                                                                    onChange={(e) => {
                                                                                        if (e.target.value) {
                                                                                            projectsSect.updateEntry(e.target.value, 'experienceId', item.id);
                                                                                        }
                                                                                    }}
                                                                                    value=""
                                                                                >
                                                                                    <option value="" disabled>+ Link Project</option>
                                                                                    {data.projects
                                                                                        .filter(p => !p.experienceId || p.experienceId !== item.id)
                                                                                        .map(p => (
                                                                                            <option key={p.id} value={p.id}>{p.nameEn}</option>
                                                                                        ))}
                                                                                </select>
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <SortableList
                                                                                    items={data.projects.filter(p => p.experienceId === item.id)}
                                                                                    onReorder={(newNestedOrder) => {
                                                                                        const otherProjects = data.projects.filter(p => p.experienceId !== item.id);
                                                                                        projectsSect.reorderEntries([...otherProjects, ...newNestedOrder]);
                                                                                    }}
                                                                                    renderItem={(p) => (
                                                                                        <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg group/project w-full">
                                                                                            <span className="text-sm font-medium">{p.nameEn}</span>
                                                                                            <div className="flex items-center gap-2">
                                                                                                <RoleSelector
                                                                                                    hideAll={true}
                                                                                                    roles={data.roles}
                                                                                                    selectedRoleIds={p.roleIds}
                                                                                                    onChange={(ids) => projectsSect.updateRoles(p.id, ids)}
                                                                                                    compact
                                                                                                />
                                                                                                <button
                                                                                                    onClick={() => projectsSect.updateEntry(p.id, 'experienceId', null)}
                                                                                                    className="p-1 opacity-0 group-hover/project:opacity-100 transition-opacity"
                                                                                                >
                                                                                                    <Trash2 size={12} className="text-red-400" />
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    );
                                                    case 'languages': return languagesSect.renderUI(id,
                                                        <LanguagesSection
                                                            items={data.languages}
                                                            roles={data.roles}
                                                            lang={i18n.language}
                                                            onAdd={() => languagesSect.addEntry({ nameEn: 'New Language' })}
                                                            onRemove={languagesSect.removeEntry}
                                                            onChange={languagesSect.updateEntry}
                                                            onRoleChange={languagesSect.updateRoles}
                                                            onReorder={languagesSect.reorderEntries}
                                                            labels={{
                                                                title: t('languages.title'),
                                                                add: t('languages.add'),
                                                                remove: t('languages.remove'),
                                                                name: t('languages.name'),
                                                                level: t('languages.level'),
                                                            }}
                                                        />
                                                    );
                                                    case 'skills': return skillsSect.renderUI(id,
                                                        <div className="space-y-6 mb-6">
                                                            <div className="flex items-center justify-between">
                                                                <h2 className="text-3xl font-bold tracking-tight">{t('skills.title')}</h2>
                                                            </div>
                                                            <div className="h-1.5 w-12 bg-yellow-500 rounded-full" />

                                                            {/* Custom Skills Tag Manager */}
                                                            <div className="card-editor space-y-8">
                                                                {(['programming', 'design', 'tools'] as const).map(category => (
                                                                    <div key={category} className="space-y-4 pt-4 first:pt-0 first:border-0 border-t border-white/5">
                                                                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">{category}</h3>
                                                                        <div className="flex flex-wrap gap-3">
                                                                            {data.skills.filter(s => s.category === category).map(skill => (
                                                                                <div key={skill.id} className="group relative flex flex-col gap-2 bg-white/5 border border-white/10 rounded-xl p-3 max-w-[200px]">
                                                                                    <div className="flex items-center justify-between gap-4">
                                                                                        <span className="font-medium text-sm text-yellow-100">{skill.nameEn}</span>
                                                                                        <button onClick={() => skillsSect.removeEntry(skill.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300">
                                                                                            <Trash2 size={14} />
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="border-t border-white/10 pt-2">
                                                                                        <RoleSelector
                                                                                            hideAll={true}
                                                                                            roles={data.roles}
                                                                                            selectedRoleIds={skill.roleIds}
                                                                                            onChange={(ids) => skillsSect.updateRoles(skill.id, ids)}
                                                                                            compact
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            <div className="flex items-center gap-2">
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder={`+ Add ${category}`}
                                                                                    className="px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-yellow-500/50 w-40"
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                                                            skillsSect.addEntry({ nameEn: e.currentTarget.value.trim(), category });
                                                                                            e.currentTarget.value = '';
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                    case 'projects': return projectsSect.renderUI(id,
                                                        <>
                                                            <div className="flex items-center justify-between mb-8">
                                                                <div className="space-y-1">
                                                                    <h2 className="text-3xl font-bold tracking-tight">{t('skills.projects')}</h2>
                                                                    <div className="h-1.5 w-12 bg-indigo-500 rounded-full" />
                                                                </div>
                                                                <Button onClick={() => projectsSect.addEntry({ nameEn: 'New Project' })} variant="solid" size="sm">
                                                                    <Plus size={18} className="mr-2" /> {t('projects.add')}
                                                                </Button>
                                                            </div>
                                                            <SortableList
                                                                items={data.projects}
                                                                onReorder={projectsSect.reorderEntries}
                                                                renderItem={(item) => (
                                                                    <div className="card-editor">
                                                                        <div className="flex justify-between items-start mb-6">
                                                                            <div className="flex-1 space-y-4">
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                    <div className="col-span-2">
                                                                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Project Name (EN)</label>
                                                                                        <input
                                                                                            value={item.nameEn || ''}
                                                                                            onChange={(e) => projectsSect.updateEntry(item.id, 'nameEn', e.target.value)}
                                                                                            className="text-xl font-bold bg-transparent border-none outline-none w-full"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-span-2">
                                                                                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Project Link</label>
                                                                                        <input
                                                                                            value={item.link || ''}
                                                                                            onChange={(e) => projectsSect.updateEntry(item.id, 'link', e.target.value)}
                                                                                            placeholder="https://github.com/..."
                                                                                            className="input-field-compact"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                                                                        <div key={l} className="space-y-3 pt-3 border-t border-white/5">
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Location ({l})</label>
                                                                                                <input
                                                                                                    value={item[`location${l}`] || ''}
                                                                                                    onChange={(e) => projectsSect.updateEntry(item.id, `location${l}`, e.target.value)}
                                                                                                    className="input-field-compact text-xs"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Description ({l})</label>
                                                                                                <textarea
                                                                                                    value={item[`description${l}`] || ''}
                                                                                                    onChange={(e) => projectsSect.updateEntry(item.id, `description${l}`, e.target.value)}
                                                                                                    className="input-field-compact h-24 text-xs"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => projectsSect.removeEntry(item.id)} className="btn-icon ml-4">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <RoleSelector
                                                                            hideAll={true}
                                                                            roles={data.roles}
                                                                            selectedRoleIds={item.roleIds}
                                                                            onChange={(ids) => projectsSect.updateRoles(item.id, ids)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    );
                                                    case 'leadership': return leadershipSect.renderUI(id,
                                                        <>
                                                            <div className="flex items-center justify-between mb-8">
                                                                <div className="space-y-1">
                                                                    <h2 className="text-3xl font-bold tracking-tight">{t('leadership.title')}</h2>
                                                                    <div className="h-1.5 w-12 bg-pink-500 rounded-full" />
                                                                </div>
                                                                <Button onClick={() => leadershipSect.addEntry({ organizationEn: 'New Org' })} variant="solid" size="sm">
                                                                    <Plus size={18} className="mr-2" /> {t('leadership.add')}
                                                                </Button>
                                                            </div>
                                                            <SortableList
                                                                items={data.leadership}
                                                                onReorder={leadershipSect.reorderEntries}
                                                                renderItem={(item) => (
                                                                    <div className="card-editor">
                                                                        <div className="flex justify-between items-start mb-6">
                                                                            <div className="flex-1 space-y-4">
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                                                                        <div key={l} className="space-y-3 pt-3 border-t border-white/5">
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Organization ({l})</label>
                                                                                                <input
                                                                                                    value={item[`organization${l}`] || ''}
                                                                                                    onChange={(e) => leadershipSect.updateEntry(item.id, `organization${l}`, e.target.value)}
                                                                                                    className="input-field-compact font-bold"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Location ({l})</label>
                                                                                                <input
                                                                                                    value={item[`location${l}`] || ''}
                                                                                                    onChange={(e) => leadershipSect.updateEntry(item.id, `location${l}`, e.target.value)}
                                                                                                    className="input-field-compact text-xs"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Description ({l})</label>
                                                                                                <textarea
                                                                                                    value={item[`description${l}`] || ''}
                                                                                                    onChange={(e) => leadershipSect.updateEntry(item.id, `description${l}`, e.target.value)}
                                                                                                    className="input-field-compact h-24 text-xs"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => leadershipSect.removeEntry(item.id)} className="btn-icon ml-4">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <RoleSelector
                                                                            hideAll={true}
                                                                            roles={data.roles}
                                                                            selectedRoleIds={item.roleIds}
                                                                            onChange={(ids) => leadershipSect.updateRoles(item.id, ids)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    );
                                                    case 'certificates': return certificatesSect.renderUI(id,
                                                        <>
                                                            <div className="flex items-center justify-between mb-8">
                                                                <div className="space-y-1">
                                                                    <h2 className="text-3xl font-bold tracking-tight">{t('certificates.title')}</h2>
                                                                    <div className="h-1.5 w-12 bg-teal-500 rounded-full" />
                                                                </div>
                                                                <Button onClick={() => certificatesSect.addEntry({ nameEn: 'New Cert' })} variant="solid" size="sm">
                                                                    <Plus size={18} className="mr-2" /> {t('certificates.add')}
                                                                </Button>
                                                            </div>
                                                            <SortableList
                                                                items={data.certificates}
                                                                onReorder={certificatesSect.reorderEntries}
                                                                renderItem={(item) => (
                                                                    <div className="card-editor">
                                                                        <div className="flex justify-between items-start mb-6">
                                                                            <div className="flex-1 space-y-4">
                                                                                <input
                                                                                    value={item.nameEn || ''}
                                                                                    onChange={(e) => certificatesSect.updateEntry(item.id, 'nameEn', e.target.value)}
                                                                                    className="text-xl font-bold bg-transparent border-none outline-none w-full"
                                                                                    placeholder="Certificate Name (EN)"
                                                                                />
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                                    {(['En', 'Es', 'Fr'] as const).map(l => (
                                                                                        <div key={l} className="space-y-3 pt-3 border-t border-white/5">
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Issuer ({l})</label>
                                                                                                <input
                                                                                                    value={item[`issuer${l}`] || ''}
                                                                                                    onChange={(e) => certificatesSect.updateEntry(item.id, `issuer${l}`, e.target.value)}
                                                                                                    className="input-field-compact font-medium"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-1">
                                                                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Description ({l})</label>
                                                                                                <textarea
                                                                                                    value={item[`description${l}`] || ''}
                                                                                                    onChange={(e) => certificatesSect.updateEntry(item.id, `description${l}`, e.target.value)}
                                                                                                    className="input-field-compact h-20 text-xs"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => certificatesSect.removeEntry(item.id)} className="btn-icon ml-4">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <RoleSelector
                                                                            hideAll={true}
                                                                            roles={data.roles}
                                                                            selectedRoleIds={item.roleIds}
                                                                            onChange={(ids) => certificatesSect.updateRoles(item.id, ids)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    );
                                                    case 'awards': return awardsSect.renderUI(id,
                                                        <>
                                                            <div className="flex items-center justify-between mb-8">
                                                                <div className="space-y-1">
                                                                    <h2 className="text-3xl font-bold tracking-tight">{t('awards.title')}</h2>
                                                                    <div className="h-1.5 w-12 bg-amber-500 rounded-full" />
                                                                </div>
                                                                <Button onClick={() => awardsSect.addEntry({ nameEn: 'New Award' })} variant="solid" size="sm">
                                                                    <Plus size={18} className="mr-2" /> {t('awards.add')}
                                                                </Button>
                                                            </div>
                                                            <SortableList
                                                                items={data.awards}
                                                                onReorder={awardsSect.reorderEntries}
                                                                renderItem={(item) => (
                                                                    <div className="card-editor">
                                                                        <div className="flex justify-between items-start mb-6">
                                                                            <input
                                                                                value={item.nameEn || ''}
                                                                                onChange={(e) => awardsSect.updateEntry(item.id, 'nameEn', e.target.value)}
                                                                                className="text-xl font-bold bg-transparent border-none outline-none flex-1"
                                                                            />
                                                                            <button onClick={() => awardsSect.removeEntry(item.id)} className="btn-icon">
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <RoleSelector
                                                                            hideAll={true}
                                                                            roles={data.roles}
                                                                            selectedRoleIds={item.roleIds}
                                                                            onChange={(ids) => awardsSect.updateRoles(item.id, ids)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    );
                                                    case 'timeline': return (
                                                        <TimelineView
                                                            experience={data.experience}
                                                            education={data.education}
                                                            activeRoleId={activeRoleId}
                                                        />
                                                    );
                                                    case 'code': return (
                                                        <CVCodeEditor
                                                            data={data}
                                                            onUpdate={(updatedData) => send({ type: 'LOAD_DATA', data: updatedData })}
                                                        />
                                                    );
                                                    default: return null;
                                                }
                                                })()}
                                                </div>
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    <AnimatePresence>
                        {showPreview && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: '50%', opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-l border-white/10 overflow-hidden bg-white"
                            >
                                {mappedPreviewData ? (
                                    <PDFPreviewPanel
                                        data={mappedPreviewData}
                                        labels={{
                                            preview: t('actions.preview'),
                                            education: t('education.title'),
                                            skills: t('skills.title'),
                                            programming: t('skills.programming'),
                                            design: t('skills.design'),
                                            experience: t('experience.title'),
                                            leadership: t('leadership.title'),
                                            certificates: t('certificates.title'),
                                        }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400">
                                        Loading preview...
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div >
        </div >
    );
}

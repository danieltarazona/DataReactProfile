import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus } from 'lucide-react';
import type { CVRole } from '../api';

interface RoleSelectorProps {
    roles: CVRole[];
    selectedRoleIds: string;
    onChange: (roleIds: string) => void;
    compact?: boolean;
    hideAll?: boolean;
}

/**
 * Multi-select role badge selector for each CV entry.
 * Shows small clickable badges for each role.
 */
export function RoleSelector({ roles, selectedRoleIds, onChange, compact, hideAll }: RoleSelectorProps) {
    const selected = new Set(selectedRoleIds.split(',').map(s => s.trim()).filter(Boolean));

    const toggle = (roleId: string) => {
        const next = new Set(selected);
        if (next.has(roleId)) {
            next.delete(roleId);
            // Must have at least one role
            if (next.size === 0) next.add('all');
        } else {
            next.add(roleId);
        }
        onChange(Array.from(next).join(','));
    };

    return (
        <div className="flex flex-wrap gap-1 mt-1">
            {roles.filter(r => hideAll ? r.id !== 'all' : true).map(role => (
                <button
                    key={role.id}
                    type="button"
                    onClick={() => toggle(role.id)}
                    className={`
                        ${compact ? 'px-1.5 py-0 text-[10px]' : 'px-2 py-0.5 text-xs'}
                        rounded-full border transition-colors
                        ${selected.has(role.id)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'
                        }
                    `}
                >
                    {role.name}
                </button>
            ))}
        </div>
    );
}

interface RoleManagerProps {
    roles: CVRole[];
    activeRoleId: string;
    onActiveRoleChange: (roleId: string) => void;
    onCreateRole: (name: string, jobTitle: string) => void;
    onDeleteRole: (id: string) => void;
    onUpdateRole: (id: string, updates: Partial<CVRole>) => void;
}

/**
 * Role management panel — create/delete roles, select active role.
 * Uses a Modal for role creation as requested.
 */
export function RoleManager({ roles, activeRoleId, onActiveRoleChange, onCreateRole, onDeleteRole, onUpdateRole }: RoleManagerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newJobTitle, setNewJobTitle] = useState('');

    const handleCreate = () => {
        if (!newName.trim()) return;
        onCreateRole(newName.trim(), newJobTitle.trim());
        setNewName('');
        setNewJobTitle('');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Focus Role:</span>
                {roles.map(role => (
                    <button
                        key={role.id}
                        onClick={() => onActiveRoleChange(role.id)}
                        className={`
                            group relative px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-300
                            ${activeRoleId === role.id
                                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/40 ring-2 ring-blue-500/20'
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }
                        `}
                    >
                        {role.name}
                        {role.jobTitle && (
                            <span className="ml-2 text-[10px] opacity-70">| {role.jobTitle}</span>
                        )}
                        {role.id !== 'all' && (
                            <span
                                onClick={(e) => { e.stopPropagation(); onDeleteRole(role.id); }}
                                className="ml-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 transition-opacity cursor-pointer inline-flex items-center"
                            >
                                <X size={14} />
                            </span>
                        )}
                    </button>
                ))}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-full border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                >
                    <Plus size={16} /> Add Role
                </button>
            </div>

            {roles.find(r => r.id === activeRoleId && r.id !== 'all') && (
                <div className="mt-4 p-4 border border-white/10 rounded-xl bg-white/5 flex gap-4 items-end max-w-md">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Edit Role Title</label>
                        <input
                            value={roles.find(r => r.id === activeRoleId)?.jobTitle || ''}
                            onChange={(e) => onUpdateRole(activeRoleId, { jobTitle: e.target.value })}
                            placeholder="e.g. Senior Mobile Developer"
                            className="w-full px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-[var(--color-background)] border border-white/10 rounded-2xl shadow-2xl p-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Create New Role</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role Name</label>
                                    <input
                                        autoFocus
                                        value={newName}
                                        onChange={e => setNewName(e.target.value)}
                                        placeholder="e.g. Senior Frontend, Game Dev"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Title (Optional)</label>
                                    <input
                                        value={newJobTitle}
                                        onChange={e => setNewJobTitle(e.target.value)}
                                        placeholder="e.g. Senior Software Engineer"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <p className="text-[10px] text-gray-500">This title will appear at the top of the PDF for this role.</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreate}
                                        disabled={!newName.trim()}
                                        className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Create Role
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

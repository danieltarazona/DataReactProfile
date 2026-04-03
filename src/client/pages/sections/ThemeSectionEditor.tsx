import React from 'react';
import { CVThemeConfig, PDFThemeType } from '@datakit/react-core';
import { Settings, Type, Layout, Palette } from 'lucide-react';

interface ThemeSectionEditorProps {
    theme: CVThemeConfig;
    onChange: (theme: CVThemeConfig) => void;
}

const FONT_FAMILIES = [
    { label: 'Serif (Times)', value: 'Times-Roman' },
    { label: 'Sans-Serif (Helvetica)', value: 'Helvetica' },
    { label: 'Monospace (Courier)', value: 'Courier' },
];

export function ThemeSectionEditor({ theme, onChange }: ThemeSectionEditorProps) {
    const updateTypography = (key: keyof CVThemeConfig['typography'], field: string, value: any) => {
        onChange({
            ...theme,
            typography: {
                ...theme.typography,
                [key]: {
                    ...theme.typography[key],
                    [field]: value
                }
            }
        });
    };

    const updatePage = (field: string, value: any) => {
        onChange({
            ...theme,
            page: {
                ...theme.page,
                [field]: value
            }
        });
    };

    const renderTypographyControl = (title: string, key: keyof CVThemeConfig['typography'], hasBorder: boolean = false) => {
        const config = theme.typography[key] as any;
        return (
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">{title}</h4>
                    <Type size={14} className="text-gray-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase font-bold">Font Size</label>
                        <input 
                            type="number" 
                            value={config.fontSize} 
                            onChange={(e) => updateTypography(key, 'fontSize', parseInt(e.target.value))}
                            className="input-field-compact w-full text-xs"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase font-bold">Font Family</label>
                        <select 
                            value={config.fontFamily} 
                            onChange={(e) => updateTypography(key, 'fontFamily', e.target.value)}
                            className="input-field-compact w-full text-xs bg-transparent"
                        >
                            {FONT_FAMILIES.map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {hasBorder && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Border Width</label>
                            <input 
                                type="number" 
                                value={config.borderBottomWidth || 0} 
                                onChange={(e) => updateTypography(key, 'borderBottomWidth', parseInt(e.target.value))}
                                className="input-field-compact w-full text-xs"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Text Transform</label>
                            <select 
                                value={config.textTransform || 'none'} 
                                onChange={(e) => updateTypography(key, 'textTransform', e.target.value)}
                                className="input-field-compact w-full text-xs bg-transparent"
                            >
                                <option value="none">None</option>
                                <option value="uppercase">Uppercase</option>
                                <option value="capitalize">Capitalize</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-12 pb-24 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Theme & Typography</h2>
                    <div className="h-1.5 w-12 bg-indigo-500 rounded-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Global Page Settings */}
                <div className="card-editor space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Layout size={18} className="text-indigo-400" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Layout Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Base Theme</label>
                            <select 
                                value={theme.type} 
                                onChange={(e) => onChange({ ...theme, type: e.target.value as PDFThemeType })}
                                className="input-field-compact w-full"
                            >
                                <option value="harvard">Harvard (Single Column)</option>
                                <option value="columns">Modern (Two Columns)</option>
                                <option value="modern">Modern (Standard)</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Page Padding</label>
                                <input 
                                    type="number" 
                                    value={theme.page.padding} 
                                    onChange={(e) => updatePage('padding', parseInt(e.target.value))}
                                    className="input-field-compact w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Page Color</label>
                                <input 
                                    type="color" 
                                    value={theme.page.color} 
                                    onChange={(e) => updatePage('color', e.target.value)}
                                    className="w-full h-8 bg-transparent border-none cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Section Spacing</label>
                                <input 
                                    type="number" 
                                    value={theme.page.sectionSpacing || 12} 
                                    onChange={(e) => updatePage('sectionSpacing', parseInt(e.target.value))}
                                    className="input-field-compact w-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Entry Spacing</label>
                                <input 
                                    type="number" 
                                    value={theme.page.itemSpacing || 8} 
                                    onChange={(e) => updatePage('itemSpacing', parseInt(e.target.value))}
                                    className="input-field-compact w-full"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-bold">Line Height ({theme.page.lineHeight || 1.3})</label>
                            <input 
                                type="range" 
                                min="0.8"
                                max="2.0"
                                step="0.05"
                                value={theme.page.lineHeight || 1.3} 
                                onChange={(e) => updatePage('lineHeight', parseFloat(e.target.value))}
                                className="w-full accent-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Specific Element Typography */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Palette size={18} className="text-indigo-400" />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Typography Elements</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {renderTypographyControl('Main Name', 'name')}
                        {renderTypographyControl('Section Titles', 'sectionTitle', true)}
                        {renderTypographyControl('Item Headers', 'itemTitle')}
                        {renderTypographyControl('Descriptions', 'description')}
                        {renderTypographyControl('Dates', 'itemDate')}
                    </div>
                </div>
            </div>
        </div>
    );
}

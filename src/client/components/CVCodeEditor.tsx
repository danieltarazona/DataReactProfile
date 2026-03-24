import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Copy, Check, FileJson, FileCode } from 'lucide-react';
import * as yaml from 'js-yaml';
import type { FullCVData } from '../api';

interface CVCodeEditorProps {
    data: FullCVData | null;
    onUpdate: (newData: FullCVData) => void;
}

export function CVCodeEditor({ data, onUpdate }: CVCodeEditorProps) {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [format, setFormat] = useState<'json' | 'yaml'>('json');
    const [copied, setCopied] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (data) {
            try {
                if (format === 'json') {
                    setCode(JSON.stringify(data, null, 2));
                } else {
                    setCode(yaml.dump(data, { indent: 2, skipInvalid: true }));
                }
            } catch (e) {
                console.error("Format error", e);
            }
        }
    }, [data, format]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        try {
            const parsed = format === 'json' ? JSON.parse(code) : yaml.load(code);
            if (parsed && typeof parsed === 'object') {
                onUpdate(parsed as FullCVData);
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        } catch (e) {
            setIsValid(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gray-900 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <button
                            onClick={() => setFormat('json')}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${format === 'json' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
                        >
                            <FileJson size={16} /> JSON
                        </button>
                        <div className="w-px h-4 bg-white/10 mx-1" />
                        <button
                            onClick={() => setFormat('yaml')}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${format === 'yaml' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
                        >
                            <FileCode size={16} /> YAML
                        </button>
                    </div>
                    {!isValid && (
                        <span className="text-xs text-red-400 font-bold bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                            Invalid {format.toUpperCase()}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="btn-icon"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
                    >
                        <RefreshCw size={16} className={!isValid ? 'opacity-50' : ''} />
                        Update Data
                    </button>
                </div>
            </div>

            <div className="flex-1 relative font-mono text-sm">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="absolute inset-0 w-full h-full p-6 bg-transparent text-gray-300 focus:outline-none resize-none selection:bg-blue-500/30"
                    spellCheck={false}
                />
            </div>
        </div>
    );
}

import { useState, useEffect, useRef, useCallback } from 'react';
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
    const [hasLocalEdits, setHasLocalEdits] = useState(false);
    const lastExternalDataRef = useRef<string>('');

    // Serialize data to string
    const serialize = useCallback((d: FullCVData | null, fmt: 'json' | 'yaml'): string => {
        if (!d) return '';
        try {
            return fmt === 'json'
                ? JSON.stringify(d, null, 2)
                : yaml.dump(d, { indent: 2, skipInvalid: true });
        } catch { return ''; }
    }, []);

    // Sync external data → code editor (only when user is NOT editing)
    useEffect(() => {
        if (data && !hasLocalEdits) {
            const serialized = serialize(data, format);
            if (serialized !== lastExternalDataRef.current) {
                lastExternalDataRef.current = serialized;
                setCode(serialized);
            }
        }
    }, [data, format, hasLocalEdits, serialize]);

    // When format changes, re-serialize regardless
    const switchFormat = (fmt: 'json' | 'yaml') => {
        setFormat(fmt);
        setHasLocalEdits(false);
        if (data) {
            const serialized = serialize(data, fmt);
            setCode(serialized);
            lastExternalDataRef.current = serialized;
        }
    };

    const handleChange = (newCode: string) => {
        setCode(newCode);
        setHasLocalEdits(true);

        // Live validation
        try {
            const parsed = format === 'json' ? JSON.parse(newCode) : yaml.load(newCode);
            setIsValid(parsed && typeof parsed === 'object');
        } catch {
            setIsValid(false);
        }
    };

    const handleApply = () => {
        try {
            const parsed = format === 'json' ? JSON.parse(code) : yaml.load(code);
            if (parsed && typeof parsed === 'object') {
                setIsValid(true);
                setHasLocalEdits(false);
                lastExternalDataRef.current = code;
                onUpdate(parsed as FullCVData);
            } else {
                setIsValid(false);
            }
        } catch {
            setIsValid(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setHasLocalEdits(false);
        if (data) {
            const serialized = serialize(data, format);
            setCode(serialized);
            lastExternalDataRef.current = serialized;
            setIsValid(true);
        }
    };

    // Line numbers
    const lineCount = code.split('\n').length;

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col bg-gray-950 rounded-xl border border-white/10 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                        <button
                            onClick={() => switchFormat('json')}
                            className={`flex items-center gap-2 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                                format === 'json' ? 'bg-blue-500/20 text-blue-300' : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            <FileJson size={14} /> JSON
                        </button>
                        <div className="w-px h-4 bg-white/10" />
                        <button
                            onClick={() => switchFormat('yaml')}
                            className={`flex items-center gap-2 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                                format === 'yaml' ? 'bg-green-500/20 text-green-300' : 'text-gray-500 hover:text-white'
                            }`}
                        >
                            <FileCode size={14} /> YAML
                        </button>
                    </div>

                    {hasLocalEdits && (
                        <span className="text-xs text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20 animate-pulse">
                            ● Unsaved edits
                        </span>
                    )}

                    {!isValid && (
                        <span className="text-xs text-red-400 font-bold bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                            ✕ Invalid {format.toUpperCase()}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleCopy} className="btn-icon" title="Copy to clipboard">
                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                    {hasLocalEdits && (
                        <button
                            onClick={handleReset}
                            className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                        >
                            Reset
                        </button>
                    )}
                    <button
                        onClick={handleApply}
                        disabled={!isValid || !hasLocalEdits}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg ${
                            isValid && hasLocalEdits
                                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20'
                                : 'bg-white/5 text-gray-500 cursor-not-allowed shadow-none'
                        }`}
                    >
                        <RefreshCw size={14} /> Apply Changes
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers */}
                <div className="w-12 flex-shrink-0 bg-black/30 border-r border-white/5 overflow-hidden pt-4 select-none">
                    <div className="font-mono text-[11px] text-gray-600 text-right pr-3 leading-[1.5rem]">
                        {Array.from({ length: lineCount }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                </div>
                {/* Code */}
                <div className="flex-1 relative">
                    <textarea
                        value={code}
                        onChange={(e) => handleChange(e.target.value)}
                        className="absolute inset-0 w-full h-full p-4 bg-transparent text-gray-300 font-mono text-[13px] leading-[1.5rem] focus:outline-none resize-none selection:bg-blue-500/30 overflow-auto"
                        spellCheck={false}
                        wrap="off"
                    />
                </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/10 bg-black/30 text-[10px] text-gray-500 font-mono">
                <span>{lineCount} lines · {format.toUpperCase()}</span>
                <span>{isValid ? '✓ Valid' : '✕ Invalid'}</span>
            </div>
        </div>
    );
}

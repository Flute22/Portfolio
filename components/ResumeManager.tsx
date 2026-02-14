import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, FileText, Trash2, CheckCircle, AlertCircle, HardDrive } from 'lucide-react';
import { RESUME_STORAGE_KEY, RESUME_DEFAULT_URL } from '../constants';

interface ResumeManagerProps {
    isOpen: boolean;
    onClose: () => void;
}

interface StoredResume {
    name: string;
    size: number;
    data: string; // base64 data URL
    uploadedAt: string;
}

export const getResumeUrl = (): string => {
    try {
        const stored = localStorage.getItem(RESUME_STORAGE_KEY);
        if (stored) {
            const parsed: StoredResume = JSON.parse(stored);
            return parsed.data;
        }
    } catch {
        // Fall through to default
    }
    return RESUME_DEFAULT_URL;
};

export const getResumeFileName = (): string => {
    try {
        const stored = localStorage.getItem(RESUME_STORAGE_KEY);
        if (stored) {
            const parsed: StoredResume = JSON.parse(stored);
            return parsed.name;
        }
    } catch {
        // Fall through to default
    }
    return 'resume.pdf';
};

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const ResumeManager: React.FC<ResumeManagerProps> = ({ isOpen, onClose }) => {
    const [storedResume, setStoredResume] = useState<StoredResume | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load stored resume on mount
    useEffect(() => {
        if (isOpen) {
            loadStoredResume();
            setSaveSuccess(false);
            setSelectedFile(null);
            setError(null);
        }
    }, [isOpen]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const loadStoredResume = () => {
        try {
            const stored = localStorage.getItem(RESUME_STORAGE_KEY);
            if (stored) {
                setStoredResume(JSON.parse(stored));
            } else {
                setStoredResume(null);
            }
        } catch {
            setStoredResume(null);
        }
    };

    const handleFileSelect = (file: File) => {
        setError(null);
        if (file.type !== 'application/pdf') {
            setError('Only PDF files are allowed.');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be under 10 MB.');
            return;
        }
        setSelectedFile(file);
        setSaveSuccess(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileSelect(file);
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        setIsSaving(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onload = () => {
                const data: StoredResume = {
                    name: selectedFile.name,
                    size: selectedFile.size,
                    data: reader.result as string,
                    uploadedAt: new Date().toISOString(),
                };
                try {
                    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
                    setStoredResume(data);
                    setSelectedFile(null);
                    setSaveSuccess(true);
                    setIsSaving(false);
                } catch (storageError) {
                    setError('Storage quota exceeded. Try a smaller file or clear browser data.');
                    setIsSaving(false);
                }
            };
            reader.onerror = () => {
                setError('Failed to read the file. Please try again.');
                setIsSaving(false);
            };
            reader.readAsDataURL(selectedFile);
        } catch {
            setError('An unexpected error occurred.');
            setIsSaving(false);
        }
    };

    const handleRemove = () => {
        localStorage.removeItem(RESUME_STORAGE_KEY);
        setStoredResume(null);
        setSelectedFile(null);
        setSaveSuccess(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surfaceHighlight/20">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Resume Manager
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 space-y-6">

                    {/* Current Status */}
                    <div className="p-4 bg-background/50 border border-white/5 rounded-xl">
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Currently Active</p>
                        {storedResume ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                                        <HardDrive className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white truncate max-w-[200px]">{storedResume.name}</p>
                                        <p className="text-xs text-slate-500">
                                            {formatFileSize(storedResume.size)} · Uploaded {new Date(storedResume.uploadedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRemove}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Remove and revert to default"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-300">Default Resume</p>
                                    <p className="text-xs text-slate-500">Serving from /resume.pdf</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upload Area */}
                    <div
                        className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
              ${isDragging
                                ? 'border-primary bg-primary/5'
                                : selectedFile
                                    ? 'border-secondary/50 bg-secondary/5'
                                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                            }
            `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleInputChange}
                            className="hidden"
                        />

                        {selectedFile ? (
                            <div className="space-y-2">
                                <div className="w-12 h-12 mx-auto bg-secondary/10 border border-secondary/20 rounded-xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-secondary" />
                                </div>
                                <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                                <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
                                <p className="text-xs text-secondary">Ready to save</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="w-12 h-12 mx-auto bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-300">Drop your resume here</p>
                                    <p className="text-xs text-slate-500 mt-1">or click to browse · PDF only · Max 10 MB</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 animate-fade-in">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                            <p className="text-sm text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Success */}
                    {saveSuccess && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 animate-fade-in">
                            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                            <p className="text-sm text-emerald-300">Resume updated successfully!</p>
                        </div>
                    )}

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={!selectedFile || isSaving}
                        className="w-full bg-primary hover:bg-primary/90 text-surface font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <span>Save Resume</span>
                                <Upload className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                            </>
                        )}
                    </button>

                    {/* Info note */}
                    <p className="text-[11px] text-slate-600 text-center leading-relaxed">
                        Resume is stored in your browser's local storage. Replace <code className="text-slate-500">public/resume.pdf</code> for production.
                    </p>
                </div>
            </div>
        </div>
    );
};

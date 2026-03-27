import { RESUME_STORAGE_KEY, RESUME_DEFAULT_URL } from '../constants';

interface StoredResume {
    name: string;
    size: number;
    data: string;
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

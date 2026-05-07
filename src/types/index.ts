export type Role = 'admin' | 'user';

export interface Profile {
    id: string;
    email: string;
    role: Role;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    assigned_date: string; // YYYY-MM-DD
    due_date: string; // YYYY-MM-DD
    created_at: string;
    is_completed?: boolean; // For checklist view state
}

export interface Exam {
    id: string;
    title: string;
    content: string;
    exam_date: string; // YYYY-MM-DD
    created_at: string;
}

export interface FileAttachment {
    id: string;
    name: string;
    url: string;
    size?: string;
    uploaded_at: string;
}

export interface ScheduleItem {
    id: string;
    day: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
    subject: string;
    time: string;
}

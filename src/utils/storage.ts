import { DocumentItem } from '../types/document';
import { NotificationItem } from '../types/notification';
import { INITIAL_DOCUMENTS } from '../data/initialDocuments';
import { INITIAL_NOTIFICATIONS } from '../data/initialNotifications';

const DOCS_STORAGE_KEY = 'docuhub_enterprise_documents_v1';
const NOTIFS_STORAGE_KEY = 'docuhub_enterprise_notifications_v1';

export function getStoredDocuments(): DocumentItem[] {
  try {
    const raw = localStorage.getItem(DOCS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
      return INITIAL_DOCUMENTS;
    }
    const parsed: DocumentItem[] = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Failed to parse documents from localStorage:', err);
    return INITIAL_DOCUMENTS;
  }
}

export function saveStoredDocuments(docs: DocumentItem[]): void {
  try {
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(docs));
  } catch (err) {
    console.error('Failed to save documents to localStorage:', err);
  }
}

export function getStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    const parsed: NotificationItem[] = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Failed to parse notifications from localStorage:', err);
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveStoredNotifications(notifs: NotificationItem[]): void {
  try {
    localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(notifs));
  } catch (err) {
    console.error('Failed to save notifications to localStorage:', err);
  }
}

export function resetToDefaultData(): { docs: DocumentItem[]; notifs: NotificationItem[] } {
  localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
  localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
  return {
    docs: INITIAL_DOCUMENTS,
    notifs: INITIAL_NOTIFICATIONS,
  };
}

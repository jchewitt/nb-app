import { UUID } from 'angular2-uuid';
import { NbEntry } from '../types/notebook-entry';

export class SessionService {
  public sessionId: string | null = null;

  initApp(sessionId: string | null): string | null {
    if (sessionId === null) {
      this.sessionId = UUID.UUID();
      this.createSession();
      return this.sessionId;
    } else {
      this.sessionId = sessionId;
    }
    return null;
  }
  createSession() {
    const nbEntries = [];
    for (let i = 0; i < 5; i++) {
      nbEntries.push({
        page: i+1,
        entry: ''
      });
    }
    localStorage.setItem(`nb-${this.sessionId}`, JSON.stringify(nbEntries));
  }
  retrieveSession(): Array<NbEntry> {
    const entries: NbEntry[] = JSON.parse(<string>localStorage.getItem(`nb-${this.sessionId}`));
    return entries;
  }
  saveEntry(nbEntry: NbEntry) {
    const entries = this.retrieveSession();
    const en: NbEntry | undefined = entries.find(en => {
      return en.page === nbEntry.page;
    });
    if (en) {
      en.entry = nbEntry.entry;
    }
    localStorage.setItem(`nb-${this.sessionId}`, JSON.stringify(entries));
  }
  retrieveEntry(page: number): NbEntry {
    const entries = this.retrieveSession();
    return entries.find((entry: NbEntry) => entry.page === page) || {
      page: 1,
      entry: ''
    };
  }
}

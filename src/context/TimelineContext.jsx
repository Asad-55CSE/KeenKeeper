import { createContext, useContext, useState, useEffect } from 'react';

const TimelineContext = createContext(null);

const STORAGE_KEY = 'keenkeeper_timeline';

const seedEntries = [
  { id: 'seed-1', type: 'call',  friendName: 'Sarah Chen',     date: '2026-03-11', title: 'Call with Sarah Chen' },
  { id: 'seed-2', type: 'video', friendName: 'Marcus Johnson',  date: '2026-03-06', title: 'Video with Marcus Johnson' },
  { id: 'seed-3', type: 'text',  friendName: 'Olivia Martinez', date: '2026-03-13', title: 'Text with Olivia Martinez' },
  { id: 'seed-4', type: 'call',  friendName: 'Lisa Nakamura',   date: '2026-03-11', title: 'Call with Lisa Nakamura' },
  { id: 'seed-5', type: 'video', friendName: 'Ryan O\'Brien',   date: '2026-02-24', title: 'Video with Ryan O\'Brien' },
  { id: 'seed-6', type: 'text',  friendName: 'Sarah Chen',      date: '2026-03-28', title: 'Text with Sarah Chen' },
  { id: 'seed-7', type: 'call',  friendName: 'Marcus Johnson',  date: '2026-03-19', title: 'Call with Marcus Johnson' },
];

export const TimelineProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : seedEntries;
    } catch {
      return seedEntries;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    const newEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...entry,
    };
    setEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error('useTimeline must be inside TimelineProvider');
  return ctx;
};

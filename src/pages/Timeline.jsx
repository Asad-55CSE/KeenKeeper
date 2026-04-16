import { useState, useMemo } from 'react';
import { useTimeline } from '../context/TimelineContext';
import callImg  from '../assets/call.png';
import textImg  from '../assets/text.png';
import videoImg from '../assets/video.png';

const typeIcon = { call: callImg, text: textImg, video: videoImg };
const typeLabel = { call: 'Call', text: 'Text', video: 'Video' };
const typeColor = {
  call:  'bg-green-50 border-green-100',
  text:  'bg-blue-50 border-blue-100',
  video: 'bg-purple-50 border-purple-100',
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const SortIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h6M15 16h2" />
  </svg>
);

const Timeline = () => {
  const { entries } = useTimeline();
  const [filter, setFilter]   = useState('all');
  const [sort, setSort]       = useState('newest');
  const [search, setSearch]   = useState('');

  const filtered = useMemo(() => {
    let list = [...entries];

    if (filter !== 'all') list = list.filter((e) => e.type === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.friendName.toLowerCase().includes(q) ||
          e.type.toLowerCase().includes(q) ||
          e.title.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date);
      return sort === 'newest' ? db - da : da - db;
    });

    return list;
  }, [entries, filter, sort, search]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Timeline</h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Filter dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-9 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 shadow-sm"
            >
              <option value="all">Filter timeline</option>
              <option value="call">Call</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Sort */}
          <button
            onClick={() => setSort((s) => (s === 'newest' ? 'oldest' : 'newest'))}
            className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <SortIcon />
            {sort === 'newest' ? 'Newest first' : 'Oldest first'}
          </button>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <input
              type="text"
              placeholder="Search by name or type…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]/30 shadow-sm"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4-4"/>
            </svg>
          </div>
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400 shadow-sm">
              No timeline entries match your filter.
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${typeColor[entry.type] || 'bg-gray-50 border-gray-100'}`}>
                  <img src={typeIcon[entry.type]} alt={entry.type} className="w-5 h-5 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{typeLabel[entry.type] || entry.type}</span>
                    {' '}
                    <span className="text-gray-500">
                      with {entry.friendName}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

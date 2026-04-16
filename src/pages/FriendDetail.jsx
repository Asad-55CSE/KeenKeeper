import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useTimeline } from '../context/TimelineContext';
import friends from '../data/friends.json';
import callImg  from '../assets/call.png';
import textImg  from '../assets/text.png';
import videoImg from '../assets/video.png';

const StatusBadge = ({ status }) => {
  if (status === 'overdue')    return <span className="status-overdue">Overdue</span>;
  if (status === 'almost due') return <span className="status-almost">Almost Due</span>;
  return <span className="status-ontrack">On-Track</span>;
};

const SnoozeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="13" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4l2 2M7 3l-2 2M17 3l2 2"/>
  </svg>
);
const ArchiveIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/>
  </svg>
);
const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
  </svg>
);

const StatCard = ({ value, label }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
    <p className="text-3xl font-bold text-[#2D4A3E]">{value}</p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const [editingGoal, setEditingGoal] = useState(false);

  const friend = friends.find((f) => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-gray-800">Friend not found</p>
        <button className="btn-forest text-sm" onClick={() => navigate('/')}>← Back Home</button>
      </div>
    );
  }

  const handleCheckin = (type) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    const title = `${typeLabel} with ${friend.name}`;
    addEntry({ type, friendName: friend.name, title });
    toast.success(`${title} logged! ✓`);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 hover:text-gray-800 font-medium mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back to Friends
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            {/* Profile card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-sm text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <p className="font-bold text-gray-900 text-lg">{friend.name}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <StatusBadge status={friend.status} />
                </div>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {friend.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm italic">"{friend.bio}"</p>
              <p className="text-gray-400 text-xs">Preferred: email</p>
            </div>

            {/* Action buttons */}
            <button className="bg-white border border-gray-100 rounded-2xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <SnoozeIcon /> Snooze 2 Weeks
            </button>
            <button className="bg-white border border-gray-100 rounded-2xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <ArchiveIcon /> Archive
            </button>
            <button className="bg-white border border-gray-100 rounded-2xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors shadow-sm">
              <DeleteIcon /> Delete
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard value={friend.days_since_contact} label="Days Since Contact" />
              <StatCard value={friend.goal}               label="Goal (Days)" />
              <StatCard value={formatDate(friend.next_due_date)} label="Next Due" />
            </div>

            {/* Relationship Goal */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">Relationship Goal</p>
                <button
                  onClick={() => setEditingGoal(!editingGoal)}
                  className="text-xs border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors"
                >
                  Edit
                </button>
              </div>
              {editingGoal ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Connect every</span>
                  <input
                    type="number"
                    defaultValue={friend.goal}
                    className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center"
                  />
                  <span className="text-sm text-gray-600">days</span>
                  <button
                    onClick={() => setEditingGoal(false)}
                    className="btn-forest text-xs px-3 py-1.5"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Connect every <strong className="text-gray-900">{friend.goal} days</strong>
                </p>
              )}
            </div>

            {/* Quick Check-In */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-gray-900 mb-4">Quick Check-In</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'call',  label: 'Call',  img: callImg },
                  { type: 'text',  label: 'Text',  img: textImg },
                  { type: 'video', label: 'Video', img: videoImg },
                ].map(({ type, label, img }) => (
                  <button
                    key={type}
                    onClick={() => handleCheckin(type)}
                    className="flex flex-col items-center gap-2 py-4 bg-gray-50 hover:bg-[#2D4A3E]/5 border border-gray-100 hover:border-[#2D4A3E]/20 rounded-xl transition-all duration-200 group"
                  >
                    <img src={img} alt={label} className="w-7 h-7 object-contain" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#2D4A3E]">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetail;

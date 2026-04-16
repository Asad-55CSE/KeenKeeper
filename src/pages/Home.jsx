import { useState, useEffect } from 'react';
import FriendCard from '../components/FriendCard';
import LoadingSpinner from '../components/LoadingSpinner';
import rawFriends from '../data/friends.json';
import { useTimeline } from '../context/TimelineContext';

const SummaryCard = ({ value, label }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-1 shadow-sm">
    <span className="text-3xl font-bold text-gray-900">{value}</span>
    <span className="text-sm text-gray-500 font-medium">{label}</span>
  </div>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const Home = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading]  = useState(true);
  const { entries } = useTimeline();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(rawFriends);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends    = friends.length;
  const onTrack         = friends.filter((f) => f.status === 'on-track').length;
  const needAttention   = friends.filter((f) => f.status !== 'on-track').length;
  const thisMonth       = entries.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Friends to keep close in your life
          </h1>
          <p className="text-gray-500 text-base max-w-xl leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the
            relationships that matter most.
          </p>
          <button className="btn-forest text-sm shadow-sm">
            <PlusIcon /> Add a Friend
          </button>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-4">
            <SummaryCard value={loading ? '—' : totalFriends} label="Total Friends" />
            <SummaryCard value={loading ? '—' : onTrack}       label="On Track" />
            <SummaryCard value={loading ? '—' : needAttention}  label="Need Attention" />
            <SummaryCard value={thisMonth}                       label="Interactions This Month" />
          </div>
        </div>
      </section>

      {/* Friends grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Your Friends</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((f) => (
              <FriendCard key={f.id} friend={f} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

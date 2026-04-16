import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  if (status === 'overdue')    return <span className="status-overdue">Overdue</span>;
  if (status === 'almost due') return <span className="status-almost">Almost Due</span>;
  return <span className="status-ontrack">On-Track</span>;
};

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-3
                 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
      />
      <div className="text-center">
        <p className="font-semibold text-gray-900 text-sm">{friend.name}</p>
        <p className="text-gray-400 text-xs mt-0.5">{friend.days_since_contact}d ago</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {friend.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>
      <StatusBadge status={friend.status} />
    </div>
  );
};

export default FriendCard;

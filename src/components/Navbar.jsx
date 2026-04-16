import { NavLink } from 'react-router-dom';

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
  </svg>
);

const TimelineIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
  </svg>
);

const StatsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navLinks = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/timeline', label: 'Timeline', Icon: TimelineIcon },
  { to: '/stats', label: 'Stats', Icon: StatsIcon },
];

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            KeenKeeper
          </h1>
        </NavLink>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                  ? 'bg-[#2D4A3E] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

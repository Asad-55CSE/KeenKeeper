import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center gap-6">
    <div className="w-24 h-24 bg-[#2D4A3E]/10 rounded-full flex items-center justify-center text-4xl select-none">
      🔍
    </div>
    <div>
      <h1 className="text-6xl font-extrabold text-[#2D4A3E]">404</h1>
      <p className="text-xl font-semibold text-gray-800 mt-2">Page not found</p>
      <p className="text-gray-500 text-sm mt-1 max-w-xs">
        Looks like this page doesn't exist. Maybe you took a wrong turn?
      </p>
    </div>
    <Link
      to="/"
      className="btn-forest px-6 py-2.5"
    >
      ← Back to Home
    </Link>
  </div>
);

export default NotFound;

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2D4A3E] rounded-full animate-spin" />
    <p className="text-gray-400 text-sm font-medium">Loading your friends…</p>
  </div>
);

export default LoadingSpinner;

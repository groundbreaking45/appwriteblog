const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-3xl font-extrabold text-blue-600 cursor-pointer select-none">
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6 4a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="tracking-tight hover:tracking-wide transition-all duration-300">
        Blogify
      </span>
    </div>
  );
};

export default Logo;

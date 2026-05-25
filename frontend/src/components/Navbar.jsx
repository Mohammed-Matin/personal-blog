const Navbar = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Dashboard
          </p>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl dark:text-slate-50">
            Articles Manager
          </h1>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {isDark ? "Light theme" : "Dark theme"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

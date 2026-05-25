const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Dashboard
          </p>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Articles Manager
          </h1>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm">
          React + Tailwind + Axios
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const Header = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-[280px] z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center h-16 px-6">
      <div className="flex items-center gap-3">
        <button
          className="p-2 text-on-surface-variant hover:text-primary transition-colors md:hidden"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center bg-surface-container-high p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md text-label-md text-primary font-bold border-b-2 border-primary">Nexus-1</button>
          <button className="px-4 py-1.5 rounded-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">Nexus-Pro</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-secondary-container/10 border border-secondary/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">System Online</span>
        </div>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

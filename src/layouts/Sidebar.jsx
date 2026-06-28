const Sidebar = ({ open, onClose }) => {
  const handleNav = () => {
    if (window.innerWidth < 768) onClose?.();
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[280px] bg-surface border-r border-outline-variant flex flex-col p-4 z-50 transition-transform duration-300 -translate-x-full md:translate-x-0 ${open ? "translate-x-0" : ""}`}
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div>
            <h1 className="text-headline-md font-semibold text-on-surface">Nexus Chat</h1>
            <p className="text-label-md text-on-surface-variant opacity-70">Inteligencia Artificial</p>
          </div>
        </div>
        <button
          className="p-1 text-on-surface-variant hover:text-primary transition-colors md:hidden"
          onClick={() => onClose?.()}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <button
        className="flex items-center justify-center gap-2 w-full py-3 mb-6 bg-primary-container text-on-primary-container rounded-lg text-label-md font-medium hover:brightness-110 transition-all active:scale-95"
        onClick={() => {
          window.dispatchEvent(new CustomEvent("nexus:newchat"));
          handleNav();
        }}
      >
        <span className="material-symbols-outlined">add_comment</span>
        <span>Nuevo Chat</span>
      </button>

      <nav className="flex-1 space-y-1 overflow-y-auto chat-scrollbar">
        <div className="px-2 py-1 mb-2">
          <p className="text-[10px] uppercase tracking-wider text-outline font-bold">Principal</p>
        </div>
        <a className="flex items-center gap-3 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg border-l-4 border-primary transition-all duration-200" href="#" onClick={handleNav}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          <span className="text-label-md">Chat Actual</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors duration-200" href="#" onClick={handleNav}>
          <span className="material-symbols-outlined">explore</span>
          <span className="text-label-md">Descubrir</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors duration-200" href="#" onClick={handleNav}>
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="text-label-md">Biblioteca</span>
        </a>

        <div className="px-2 py-1 mt-6 mb-2">
          <p className="text-[10px] uppercase tracking-wider text-outline font-bold">Historial</p>
        </div>
        <div className="space-y-1">
          {[
            "Planificación de viaje a Japón",
            "Depuración de código Python",
            'Resumen del libro "1984"',
          ].map((title, i) => (
            <a key={i} className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg text-sm truncate" href="#" onClick={handleNav}>
              <span className="material-symbols-outlined text-sm">history</span>
              <span className="truncate">{title}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-outline-variant space-y-1">
        <a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors" href="#" onClick={handleNav}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-label-md">Ajustes</span>
        </a>
        <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-high rounded-xl mt-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-outline">
            <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiSLWXyIP1fKILDhtzBGDJim3RC4AQJTXk17UnCbWlfu0tBgXmv-MIw6ccyoLkLOmnHD8wvLzjqBnShyFGOIdgdm8xHwQtH-gY8sC7uLp0SaAsbSR0THOPsBqwdqI413wFMzVvaxryQaD2bHRKGG3mxuwYkGkM0k36fcnLICs_eSZCXWiKW0EfEEwUTkDKDyAdMN88lQIbDc-UTXJYwMIfCYsPVXcndTqJM-aYCaWepuCqAQKZPHIJpBkWdCtOs-giAUzcX9_iauA" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Perfil de Usuario</p>
            <p className="text-[10px] text-primary">Plan Pro</p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

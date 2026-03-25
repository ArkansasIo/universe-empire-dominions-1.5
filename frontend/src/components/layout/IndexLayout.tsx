import React from "react";

// Placeholder for realms/sidebar
function RealmsSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-full flex flex-col p-4">
      <h2 className="font-bold text-lg mb-4">Realms</h2>
      <ul className="space-y-2">
        <li className="hover:bg-slate-800 p-2 rounded cursor-pointer">Realm 1</li>
        <li className="hover:bg-slate-800 p-2 rounded cursor-pointer">Realm 2</li>
        <li className="hover:bg-slate-800 p-2 rounded cursor-pointer">Realm 3</li>
      </ul>
    </aside>
  );
}

// Placeholder for server health/status
function ServerHealth() {
  return (
    <aside className="w-64 bg-slate-100 border-l border-slate-200 h-full flex flex-col p-4">
      <h2 className="font-bold text-lg mb-4 text-slate-800">Server Health</h2>
      <div className="mb-2">Status: <span className="text-green-600 font-bold">Online</span></div>
      <div className="mb-2">Uptime: 12h 34m</div>
      <div className="mb-2">Players: 42</div>
      <div className="mb-2">CPU: 23%</div>
      <div className="mb-2">Memory: 1.2GB</div>
    </aside>
  );
}

// Main layout
export default function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Index Title at the Top */}
      <header className="w-full bg-white shadow-sm py-6 px-8 flex items-center justify-center border-b border-slate-200">
        <h1 className="font-orbitron text-3xl font-bold tracking-widest text-slate-900">
          STELLAR <span className="text-blue-500">DOMINION</span>
        </h1>
      </header>
      {/* Main 3-column layout */}
      <main className="flex flex-1 min-h-0">
        <RealmsSidebar />
        <section className="flex-1 flex items-center justify-center bg-white">
          {children}
        </section>
        <ServerHealth />
      </main>
    </div>
  );
}

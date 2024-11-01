// components/Layout.tsx
'use client' 
import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* SideMenu */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-start py-6 space-y-6">
        <div className="text-2xl font-bold px-6">
          <Link href="/">Meu Projeto</Link>
        </div>
        <nav className="space-y-2 w-full">
          <Link href="/" className="block px-6 py-2 hover:bg-gray-700">Home</Link>
          <Link href="/sobre" className="block px-6 py-2 hover:bg-gray-700">Sobre</Link>
          <Link href="/contato" className="block px-6 py-2 hover:bg-gray-700">Contato</Link>
          <Link href="/servicos" className="block px-6 py-2 hover:bg-gray-700">Serviços</Link>
          <Link href="/ajuda" className="block px-6 py-2 hover:bg-gray-700">Ajuda</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-500 text-white p-4 shadow-md">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-xl font-bold">Meu Projeto</h1>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/sobre" className="hover:underline">Sobre</Link>
              <Link href="/contato" className="hover:underline">Contato</Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 bg-gray-100 p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

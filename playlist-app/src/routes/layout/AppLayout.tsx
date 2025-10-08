import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-zinc-900">
        <Outlet />
      </main>

      <footer className="flex items-center justify-center bg-zinc-900 p-4 text-gray-400">
        PlaylistApp ©{new Date().getFullYear()} | Created by Cristopher
      </footer>
    </div>
  );
}

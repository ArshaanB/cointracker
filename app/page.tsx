'use client';

import TopBar from '@/components/TopBar';
import { MainTable } from '@/components/main-table';
import AddCoinComponent from '@/components/ui/addCoinComponent';
import { useAuthContext } from '@/app/context/AuthContext';

import LoginSignup from '@/components/login-signup';

export default function Home() {
  const { session } = useAuthContext();

  return (
    <main>
      <TopBar />
      {session ? (
        <>
          <AddCoinComponent />
          <MainTable />
        </>
      ) : (
        <LoginSignup />
      )}
    </main>
  );
}

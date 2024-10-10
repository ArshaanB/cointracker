'use client';

import TopBar from '@/components/TopBar';
import { MainTable } from '@/components/main-table';
import AddCoinComponent from '@/components/ui/addCoinComponent';
import { useAuthContext } from '@/app/context/AuthContext';

import LoginSignup from '@/components/login-signup';

export default function Home() {
  const { session } = useAuthContext();

  return (
    <main className="min-h-screen bg-gray-100">
      <TopBar />
      {session ? (
        <>
          <AddCoinComponent />
          <MainTable />
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/test-route');
                const data = await response.json();
                console.log(data);
              } catch (error) {
                console.error('Error fetching test route:', error);
              }
            }}
          >
            Test Route
          </button>
        </>
      ) : (
        <LoginSignup />
      )}
    </main>
  );
}

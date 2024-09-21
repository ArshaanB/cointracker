import Link from 'next/link';
import { useAuthContext } from '@/app/context/AuthContext';

export default function TopBar() {
  const { session, logout, user } = useAuthContext();

  const getWelcomeMessage = () => {
    if (user?.firstName && user?.lastName) {
      return `Welcome ${user.firstName}`;
    }
    return 'Welcome Anonymous';
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-black px-4 py-4 text-white">
      <Link href="/">LOGO</Link>
      <div className="flex flex-col items-center">
        {getWelcomeMessage()}
        {session && (
          <Link href="/" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

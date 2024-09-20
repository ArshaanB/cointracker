import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-black px-4 py-4 text-white">
      <div>LOGO</div>
      <div className="flex flex-col">
        Welcome Anonymous
        <div className="flex justify-around">
          <Link href="/">Signup</Link>
          <Link href="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

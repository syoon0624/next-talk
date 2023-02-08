import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  if (router.pathname === '/auth/login' || router.pathname === '/auth/signup') return null;
  return (
    <nav>
      <Link href="/user-list">
        <p className={router.pathname === '/user-list' ? 'active' : ''}>사용자 목록</p>
      </Link>
      <Link href="/chat-room">
        <p className={router.pathname === '/chat-room' ? 'active' : ''}>채팅방</p>
      </Link>
      <Link href="/options">
        <p className={router.pathname === '/options' ? 'active' : ''}>더보기</p>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
        }
        p {
          color: black;
          padding: 15px;
        }
        p:first-child {
          padding-left: 10px;
        }
        .active {
          color: skyblue;
          border-bottom: 2px solid skyblue;
        }
      `}</style>
    </nav>
  );
}

import { useRecoilState } from 'recoil';
import { authState, userState } from '../../recoil/authAtom';
import { formatJWTtoJSON } from '../../utils/formatJWT';
import { useEffect } from 'react';
import Link from 'next/link';
import NavBar from './NavBar';
import { useRouter } from 'next/router';

export default function Header() {
  const [token, setToken] = useRecoilState<string>(authState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (token.length > 0) {
      const data = formatJWTtoJSON(localStorage.getItem('accessToken') || '');
      setUser({
        isAuthenticated: true,
        uid: data.user_id,
        email: data.email,
        displayName: data.name,
        photoURL: data.picture,
      });
    } else {
      if (localStorage.getItem('accessToken')) {
        const data = formatJWTtoJSON(localStorage.getItem('accessToken') || '');
        setToken(localStorage.getItem('accessToken') || '');
        setUser({
          isAuthenticated: true,
          uid: data.user_id,
          email: data.email,
          displayName: data.name,
          photoURL: data.picture,
        });
      } else {
        router.push('/auth/login');
      }
    }
  }, [token]);
  return (
    <header>
      <div className="header-wrap">
        <NavBar />
      </div>
      <style jsx>{`
        .header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </header>
  );
}

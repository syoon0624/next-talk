import { authState, userState } from '@/recoil/authAtom';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

export default function Option() {
  const [token, setToken] = useRecoilState<string>(authState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const logoutHandler = () => {
    setToken('');
    setUser({
      isAuthenticated: false,
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
    });
    localStorage.removeItem('accessToken');
    alert('로그아웃 성공!');
    router.push('/auth/login');
  };
  return (
    <>
      <ul className="settings-wrapper">
        <li onClick={logoutHandler}>로그아웃</li>
        <li>테마</li>
        <li>기타</li>
      </ul>
      <style jsx>{`
        .settings-wrapper {
        }
        .settings-wrapper li {
          padding: 10px 5px;
          display: flex;
          align-items: center;
          height: 50px;
          border-bottom: 1px solid #ced4da;
          cursor: pointer;
        }
        li:hover {
          background-color: #ced4da;
        }
      `}</style>
    </>
  );
}

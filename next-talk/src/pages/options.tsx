import Seo from '@/components/common/Seo';
import Option from '@/components/option/Option';
import { userState } from '@/recoil/authAtom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Options() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (user.isAuthenticated === false) {
      alert('로그인을 먼저 해주세요!');
      router.push('/auth/login');
    }
  });
  return (
    <>
      <Seo title="Options" />
      <div className="wrapper">
        <div className="profile-wrapper">
          <div className="profile-info-wrapper">
            <img src={user.photoURL} alt="profile-img" />
            <div className="text-area-wrapper">
              <p className="name">{user.displayName}</p>
              <p className="email">{user.email}</p>
            </div>
          </div>
          <div>
            <button className="edit-profile">프로필 관리</button>
          </div>
        </div>
        <Option />
      </div>
      <style jsx>
        {`
          img {
            width: 50px;
            height: 50px;
            border-radius: 20px;
          }
          .profile-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 5px;
            border-bottom: 1px solid #ced4da;
          }
          .text-area-wrapper {
            margin-left: 10px;
          }
          .name {
            font-size: 20px;
          }
          .email {
            color: #868e96;
          }
          .profile-info-wrapper {
            display: flex;
            align-items: center;
          }
          .edit-profile {
            border: 1px solid #ced4da;
            background-color: transparent;
            padding: 5px 10px;
            border-radius: 10px;
          }
          .edit-profile:hover {
            background-color: #ced4da;
          }
        `}
      </style>
    </>
  );
}

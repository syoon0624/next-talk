import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Seo from '../components/common/Seo';
import { getUsers } from '../firebase';
import { userState } from '../recoil/authAtom';
import User from '../components/user/User';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const getUserList = async () => {
        let arr = [];
        const data = await getUsers();
        if (data) {
          for (let i of Object.keys(data)) {
            const obj = { uid: i, ...data[i] };
            arr.push(obj);
          }
        }
        setUsers(arr);
      };
      getUserList();
    } else {
      alert('로그인을 먼저 해주세요!');
      router.push('/auth/login');
    }
  }, []);
  return (
    <>
      <Seo title="User List" />
      <div className="wrapper">
        <ul>
          <User user={user} className="user-profile" />
          <p>이용자 목록: {users.length - 1}</p>
          {users.length > 0
            ? users
                .filter((ele) => ele.uid !== user.uid)
                .map((user) => {
                  return <User key={user.uid} user={user} className="" />;
                })
            : ''}
        </ul>
      </div>
      <style jsx>
        {`
          .wrapper {
            margin-top: 20px;
          }
        `}
      </style>
    </>
  );
}

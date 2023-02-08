import React from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { signIn } from '../../firebase';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/authAtom';
import { useRouter } from 'next/router';

interface userType {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<userType>();
  const [token, setToken] = useRecoilState(authState);
  const onSubmit = async (data: userType) => {
    const user = await signIn(data.email, data.password);
    if (user.accessToken) {
      localStorage.setItem('accessToken', user.accessToken);
      const accessToken: any = localStorage.getItem('accessToken');
      setToken(accessToken);
      alert('로그인 성공!');
      router.push('/home');
    } else {
      alert('로그인 실패!');
    }
    setValue('email', '');
    setValue('password', '');
  };

  return (
    <div>
      <p>LoginPage!</p>
      <img src="/images/logo.png" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <button type="submit">로그인</button>
      </form>
      <div>
        <span>처음이신가요?</span> <Link href="/auth/signup">회원 가입하기</Link>
      </div>
    </div>
  );
}

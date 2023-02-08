import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, signUp, updateUser, writeUserData } from '../../firebase';
import { useRouter } from 'next/router';

interface userType {
  email: string;
  password: string;
  displayName: string;
  photoURL: any;
}

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<userType>();
  const [photoURL, setPhotoURL] = useState<string>('https://i.stack.imgur.com/l60Hf.png');

  const onSubmit = async (data: userType) => {
    const user = await signUp(data.email, data.password);
    if (user.email) {
      await signIn(data.email, data.password);
      const userInfo = await updateUser(data.displayName, photoURL);
      await writeUserData(userInfo.uid, userInfo.displayName, userInfo.email, userInfo.photoURL);
      alert('회원가입 성공!');
      router.push('/auth/login');
    } else {
      alert('회원가입 실패!');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} />
        <input type="password" placeholder="Password" {...register('password')} />
        <input type="text" placeholder="닉네임" {...register('displayName')} />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

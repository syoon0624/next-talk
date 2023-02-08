import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, signUp, updateUser, writeUserData } from '../../firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
    <>
      <div className="wrapper">
        <Link href="/auth/login" className="move-back">
          <button className="move-back">{'<'}</button>
        </Link>
        <h1 className="title">Next Talk</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="Email" {...register('email')} />
          <input type="password" placeholder="Password" {...register('password')} />
          <input type="text" placeholder="닉네임" {...register('displayName')} />
          <button type="submit">회원 가입</button>
        </form>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title {
          padding: 10vh 0;
          font-size: 100px;
          color: skyblue;
        }
        input {
          width: 100%;
          font-size: 15px;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          margin: 5px 0;
        }
        button {
          width: 112%;
          font-size: 15px;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          margin: 5px 0;
          margin-bottom: 15px;
          background-color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #dee2e6;
        }
        input:focus {
          border: 1px solid black;
        }
        form {
          width: 60%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .move-back {
          position: absolute;
          width: 10%;
          padding: 0;
          top: 5%;
          left: 5%;
          font-size: 3vw;
          color: skyblue;
          background-color: transparent;
        }
        .move-back:hover {
          background-color: transparent;
          color: white;
        }
      `}</style>
    </>
  );
}

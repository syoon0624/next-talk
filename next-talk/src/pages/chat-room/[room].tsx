import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, onValue } from 'firebase/database';
import { database, writeMessages } from '../../firebase';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/authAtom';
import Message from '../../components/chat/Message';

export interface ChatType {
  roomId: string | string[];
  message: string;
  profileImg: string;
  timestamp: number;
  uid: string;
  username: string;
}
type MessageType = {
  message: string;
};

export default function ChatRoom() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [user, setUser] = useRecoilState(userState);
  const { register, handleSubmit, setValue } = useForm<MessageType>();
  const router = useRouter();

  const messageRef = ref(database, `/messages/${router.query.room}`);
  const onSubmit = async (data: MessageType) => {
    if (router.query.room && data.message !== '') {
      await writeMessages(router.query.room, data.message, user.photoURL, Date.now(), user.uid, user.displayName);
      setValue('message', '');
    }
  };
  useEffect(() => {
    onValue(messageRef, (snapshot) => {
      const messageInfo = snapshot.val();
      const newArray = [];
      if (messageInfo) {
        for (let i of Object.keys(messageInfo)) {
          newArray.push(messageInfo[i]);
        }
        // console.log(newArray);
        setChats(newArray.reverse());
      }
    });
  }, [router.query.room]);

  return (
    <>
      <div className="room-wrap">
        <ul>
          {chats.length > 0
            ? chats.map((chat, index) => {
                return <Message key={chat.timestamp} chat={chat} />;
              })
            : ''}
        </ul>
        <div className="form-wrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('message')} />
            <button type="submit">전송</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .room-wrap {
          display: flex;
          flex-direction: column;
        }
        ul {
          position: absolute;
          bottom: 60px;
          width: 100%;
          display: flex;
          flex-direction: column-reverse;
          overflow-y: auto;
          height: 70%;
          max-width: 600px;
        }
        .form-wrap {
          border-top: 2px solid skyblue;
          position: absolute;
          bottom: 0;
          width: 100%;
          max-width: 600px;
        }
        form {
          width: 100%;
          display: flex;
        }
        input {
          width: 80%;
          border: none;
          padding: 20px;
        }
        button {
          width: 20%;
          background-color: #ffd43b;
          border: none;
        }
        button:hover {
          background-color: #fcc419;
        }
      `}</style>
    </>
  );
}

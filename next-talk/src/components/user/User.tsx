import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { getChatRoom, getUserChatRooms, writeChatRoom, writeUserChatRooms } from '../../firebase';
import { userState } from '../../recoil/authAtom';

type PropsType = {
  user: {
    uid: string;
    photoURL: string;
    displayName: string;
    email: string;
  };
  className: string;
};

type UserIdType = {
  [key: string]: boolean;
};

export default function User({ user, className }: PropsType) {
  const [loginUser, setLoginUser] = useRecoilState(userState);
  const userIds: UserIdType = {};
  userIds[loginUser.uid] = true;
  userIds[user.uid] = true;
  const timestamp = Date.now();
  const router = useRouter();
  const chatNavigate = async () => {
    const room = await getUserChatRooms();
    let roomId = '';
    if (room) {
      for (let i of Object.keys(room)) {
        if (i === loginUser.uid) {
          for (let j of Object.keys(room[i])) {
            const userList = room[i][j].roomUserList.split('@spl@');
            if (userList.includes(user.uid)) {
              roomId = room[i][j].roomId;
              break;
            }
          }
        }
      }
    }
    if (roomId === '') {
      roomId = `${loginUser.uid}@users@${user.uid}`;
      // 채팅방 등록(방정보, 유저 기준 방 정보)
      await writeChatRoom(roomId, userIds);
      // 내 채팅방 등록
      await writeUserChatRooms(
        loginUser.uid,
        '',
        user.photoURL,
        roomId,
        'SINGLE',
        `${loginUser.displayName}@spl@${user.displayName}`,
        `${loginUser.uid}@spl@${user.uid}`,
        timestamp
      );
      // 상대 채팅방 등록
      await writeUserChatRooms(
        user.uid,
        '',
        loginUser.photoURL,
        roomId,
        'SINGLE',
        `${user.displayName}@spl@${loginUser.displayName}`,
        `${user.uid}@spl@${loginUser.uid}`,
        timestamp
      );
    }
    router.push(`/chat-room/${roomId}`);
  };
  return (
    <>
      <li className={className}>
        <span>
          <img src={user.photoURL} alt="profile-img" />
          <p>{user.displayName}</p>
        </span>
        <p>{user.email}</p>
        {className === '' ? <button onClick={chatNavigate}>대화하기</button> : ''}
      </li>
      <style jsx>{`
        .user-profile {
          border-bottom: 1px solid black;
          margin-bottom: 20px;
        }
        span {
          display: flex;
          align-items: center;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 10px;
        }
        img {
          width: 50px;
          padding: 0px 10px;
        }
      `}</style>
    </>
  );
}

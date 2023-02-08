import { useRecoilState } from 'recoil';
import { ChatType } from '../../pages/chat-room/[room]';
import { userState } from '../../recoil/authAtom';
import { formatDate } from '../../utils/formatDate';

export default function Message({ chat }: MessageItemType) {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  return (
    <>
      <li className={currentUser.uid === chat.uid ? 'user' : 'chatter'}>
        <div className="chat-wrap">
          {currentUser.uid !== chat.uid ? (
            <>
              <div className="chatter-info">
                <p>{chat.username}</p>
                <img src={chat.profileImg} alt="profile-img" />
              </div>
            </>
          ) : null}
          <div className="message-wrap">
            <span className="time">{formatDate(chat.timestamp)}</span>
            <p>{chat.message}</p>
          </div>
        </div>
      </li>
      <style jsx>{`
        li {
          display: flex;
          align-items: center;
          margin: 0 10px;
        }
        .user {
          flex-direction: row-reverse;
        }
        .chat-wrap {
          max-width: 70%;
          display: flex;
          align-items: center;
          margin: 5px 0px;
        }
        .chatter-info {
          margin-right: 5px;
        }
        .chatter-info p {
          text-align: center;
        }
        .message-wrap {
          display: flex;
          flex-direction: column;
          align-items: ${currentUser.uid === chat.uid ? 'flex-end' : 'flex-start'};
        }
        .message-wrap p {
          border-radius: 10px;
          border: 2px solid skyblue;
          padding: 10px;
        }
        .time {
          font-size: 10px;
          flex-direction: row-reverse;
          margin: 0px 5px;
          margin-bottom: 5px;
        }
        img {
          width: 50px;
        }
      `}</style>
    </>
  );
}
type MessageItemType = {
  chat: ChatType;
};

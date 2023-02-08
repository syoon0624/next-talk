import { atom } from 'recoil';

/** 토큰 여부에 따른 로그인 인증 */
export const authState = atom<string>({
  key: 'authState',
  default: '',
});

export const userState = atom({
  key: 'userState',
  default: {
    isAuthenticated: false,
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
  },
});

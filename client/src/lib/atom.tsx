import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"
import {IF_member, IF_pagination} from './IF'

const {persistAtom: ATOM_SESSION} = recoilPersist({key: "session", storage: localStorage})
export const __session = atom<string | undefined>({
  key: "session",
  default: undefined,
  effects_UNSTABLE: [ATOM_SESSION]
})
const {persistAtom: ATOM_ME} = recoilPersist({key: "me", storage: sessionStorage})
export const __me = atom<IF_member | undefined>({
  key: 'me',
  default: undefined,
  effects_UNSTABLE: [ATOM_ME]
})

export const __pagination = atom<IF_pagination>({
  key: 'pagination',
  default: {
    count: 0,
    countPerPage: 5,
    pageCount: 5,
    currentIndex: 0,
    base: 1,
    variation: 1
  }
})
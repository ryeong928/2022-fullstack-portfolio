import {atom} from 'recoil'
import { recoilPersist } from 'recoil-persist'
import {IF_member} from './IF'

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
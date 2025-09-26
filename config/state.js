import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const currentUserAtom = atomWithStorage("promptr-current-user", null);
export const pageTitleAtom = atom("");

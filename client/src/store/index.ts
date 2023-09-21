import { ROLE } from "@/common/config/enum.";
import { atom } from "jotai";

const isLoggedIn = atom(false)
const role = atom(ROLE.GUEST)

export { isLoggedIn, role }
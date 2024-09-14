"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import { LogOutButton } from "./styled";


export default function Logout () {
  const { token } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('login')
  }
  
  const isAuth = isAuthenticated() || token;

  return <LogOutButton isAuth={isAuth} onClick={handleLogout}><b>Log Out</b></LogOutButton>
}
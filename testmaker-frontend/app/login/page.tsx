import Image from "next/image";
import SigninButton from "../login/SignInButton";
import LoginLogoutButton from "../Components/Buttons/LoginLogoutButton";

export default function Home() {
  return (
    <div className=" items-center justify-center font-sans fixed bg-black h-dvh w-dvw top-0 left-0 z-150">
      <h1 className="text-5xl mb-8">Testmaker Login</h1>
      <LoginLogoutButton/>
      

    </div>
  );
}
"use client"
import  { redirect } from "next/dist/client/components/redirect";
import { useEffect } from "react";


export default function Home() {

  useEffect(() => {
    redirect("/login")

  })
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Test</h1>
      

    </div>
  );
}

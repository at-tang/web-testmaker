"use client"

import { ErrorReroute } from "@/app/api/ErrorPageRereouting/ErrorRerouting";
import QuizResultList from "@/app/Components/QuizResultList/QuizResultList";
import QuizResultListMaster from "@/app/Components/QuizResultList/QuizResultListMaster";
import { QuizResultListEntry } from "@/app/Types/types";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function History() {



    return (
        <>
            <header className="flex-none px-4 pt-4">
                <h1 className="text-5xl mb-2 pt-2 text-center">History</h1>
                 <div className="h-0.5 w-full bg-white"/>

            </header>

            <div className="p-4">
                <QuizResultListMaster searchEnabled={true} type="api/private/result/get/list/general"/>

            </div>

            
        </>
    )
}
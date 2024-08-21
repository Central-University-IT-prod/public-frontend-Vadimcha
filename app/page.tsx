"use client"
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {AuthorizePage} from "@/modules/AuthorizePage";

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    const storage = localStorage.getItem("habits")
    if(storage != null && JSON.parse(storage)["state"].userName != '') {
      router.push("/habits")
    }
  }, [router])

  return <AuthorizePage />
}

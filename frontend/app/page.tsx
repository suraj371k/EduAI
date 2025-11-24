"use client"
import { useProfile } from "@/hooks/useAuth";

export default function Home() {
  const { data: user }  = useProfile()
  return (
   <div>
    name:
{user?.name}
   </div>
  );
}

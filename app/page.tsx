'use client'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";



const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-slate-600">
        <div className="space-y-6 text-center">
          <h1 className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}>
            🔐 Auth Sys
          </h1>
          <p className="text-white text-lg">
            Authenticate, authorize, and manage users.
          </p>
          <LoginButton mode="modal" asChild>

            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </main>
    </>
  )
}

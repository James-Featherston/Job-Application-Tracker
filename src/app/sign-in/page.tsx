"use client";

import { SignIn } from "@/components/sign-in";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main>
        <div className="text-center mt-8">Loading...</div>
      </main>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <main>
      <h1 className="text-3xl font-bold text-center mt-8">
        Application Tracker
      </h1>
      <SignIn />
    </main>
  );
}


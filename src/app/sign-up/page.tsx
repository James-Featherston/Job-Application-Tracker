"use client";

import { SignUp } from "@/components/sign-up";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user, session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if user has a session (email verified and logged in)
    if (!loading && user && session) {
      router.push("/");
    }
  }, [user, session, loading, router]);

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
      <SignUp />
    </main>
  );
}


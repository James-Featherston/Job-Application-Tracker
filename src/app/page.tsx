"use client";

import { SignIn } from "@/components/sign-in";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
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
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">
          Application Tracker
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Track and manage your job applications in one place
        </p>
        <SignIn />
      </div>
    </main>
  );
}

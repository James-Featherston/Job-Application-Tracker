"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/client";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { user, session, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // If user has a session, they're verified and logged in - redirect to home
    if (!loading && session && user) {
      router.push("/");
    } else if (!loading) {
      setChecking(false);
    }
  }, [session, user, loading, router]);

  // Listen for auth state changes (when user verifies email)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === "SIGNED_IN" && session) {
        // User verified their email and is now signed in
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading || checking) {
    return (
      <main>
        <div className="text-center mt-8">Checking verification status...</div>
      </main>
    );
  }

  if (session && user) {
    return null; // Will redirect
  }

  return (
    <main>
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>

        <div className="space-y-4">
          <p className="text-gray-700">We've sent a verification email to:</p>
          <p className="font-semibold text-lg">{email || "your email"}</p>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Please check your email inbox</strong> and click the
              verification link to activate your account.
            </p>
            <p className="text-sm text-gray-600">
              Once you click the link, you'll be automatically signed in.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-gray-700">
              <strong>Didn't receive the email?</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 list-disc list-inside space-y-1">
              <li>Check your spam/junk folder</li>
              <li>Make sure you entered the correct email address</li>
              <li>Wait a few minutes and check again</li>
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <Link
              href="/sign-in"
              className="flex-1 text-center px-4 py-2 border rounded hover:bg-gray-50"
            >
              Back to Sign In
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              I've Verified
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

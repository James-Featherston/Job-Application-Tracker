import { SignIn } from "@/components/sign-in";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center mt-8">
        Application Tracker
      </h1>
      <SignIn />
    </main>
  );
}

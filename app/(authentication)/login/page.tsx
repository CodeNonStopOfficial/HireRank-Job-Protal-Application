import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import { LoginForm } from "../_components/LoginForm";



type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div>
        {params.error === "auth-unavailable" && (
          <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
            Unable to connect. Please check your internet connection and try
            again.
          </div>
        )}
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image src={Logo} alt="Logo" className="size-10" />
          <h1 className="text-2xl font-bold">
            Carrer<span className="text-primary">Hub</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}



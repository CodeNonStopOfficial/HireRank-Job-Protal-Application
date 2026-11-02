import { getExperienceDataById } from "@/app/services/users/get-exprience-databyid";
import { CreateExprienceForm } from "../../_components/CreateExprienceForm";
import { Suspense } from "react";

interface IAppProps {
  params: Promise<{ slug: string }>;
}

export default async function CreateExprienceEditPage({ params }: IAppProps) {
  const { slug } = await params;
  const data = await getExperienceDataById(slug);
  return (
    <>
      <div className="min-h-screen max-w-full py-2">
        <Suspense fallback={<h1>Loading...</h1>}>
          <CreateExprienceForm mode="update" exprience={data} />
        </Suspense>
      </div>
    </>
  );
}

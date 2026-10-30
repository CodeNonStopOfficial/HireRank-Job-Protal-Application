import { GetCompanyProfile } from "@/app/services/employer/get-company";
import { EditCompanyProfileForm } from "../../_components/EditCompanyProfile";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface iAppProps {
  params: Promise<{ companyId: string }>;
}
export default async function EditCompanyProfilePage({ params }: iAppProps) {
  const { companyId } = await params;
  const company = await GetCompanyProfile(companyId);
  if (company === null) {
    return notFound();
  }
  return (
    <div className="min-h-screen max-w-full px-4 py-6">
      <Suspense fallback={<h1>Loading...</h1>}>
        <EditCompanyProfileForm data={company} />
      </Suspense>
    </div>
  );
}

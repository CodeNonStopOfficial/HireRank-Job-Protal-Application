import { Suspense } from "react";
import { EducationCreationForm } from "../../_components/EducationCreatationForm";
import {getEducationDataById} from "@/app/services/users/get-education-databyid"
interface iAppProsEducation {
     params : Promise<{slug:string}>
}

export default async function EducationEditPage({params}:iAppProsEducation) {
  const {slug} = await params;
  const data = await getEducationDataById(slug);
  return (
    <div className="min-h-screen max-w-full py-6">
      <Suspense fallback={<h1>Loading...</h1>}>
        <EducationCreationForm mode="update" education={data} />
      </Suspense>
    </div>
  );
}

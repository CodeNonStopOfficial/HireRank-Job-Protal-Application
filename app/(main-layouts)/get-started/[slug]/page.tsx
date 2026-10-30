import { JobDescriptionData } from "@/app/services/candidata/get-jobdetail";
import { JobDescriptionComponent } from "./_components/JobDescriptionComponent";
import { Suspense } from "react";

interface iAppProps {
     params : Promise<{slug : string}>
}
export default async function GetSingleCourseIdPage({params}:iAppProps){
    const {slug} = await params;
    const data = await JobDescriptionData(slug);
    return (
        <section className="min-h-screen max-w-full px-4 py-6 md:px-8 lg:px-14">
           <div>
              <Suspense fallback={<h1>Loading...</h1>}>
               <JobDescriptionComponent data={data}/>
              </Suspense>
           </div>
        </section>
    )
}
import TestimonialsSection from "@/components/common/TestimonialsSection";
import {
  getAllCategory,
  getAllInternJobs,
  getAllJobsTake,
} from "../services/candidata/get-allcategoryes";
import { getAllCompanyAndWithJobs } from "../services/candidata/get-companyall";
import { getDataPublicJob } from "../services/candidata/get-public-jobpost";
import { CategorySection } from "./_components/CatogorySection";
import { CompanySection } from "./_components/CompanySection";
import { HeroSection } from "./_components/HeroSection";
import { JobProjectCardSection } from "./_components/ProjectJobCardPublic";
import { NoJobsFound } from "@/components/common/NotJobFoundCard";
export default async function HomePage() {
  const data = await getDataPublicJob();
  const company = await getAllCompanyAndWithJobs();
  const categories = await getAllCategory();
  const internships = await getAllInternJobs();
  const jobdata = await getAllJobsTake();

  return (
    <div className="max-w-full">
      <div className="w-full">
        <HeroSection />
        {data.length > 0 ? (
          <>
            <JobProjectCardSection jobs={jobdata} intern={internships} />
          </>
        ) : (
          <>
            <div className="px-4 py-4 md:px-8 lg:px-12">
              <NoJobsFound />
            </div>
          </>
        )}
              <div>
          {company.length > 0 ? (
            <>
              <CompanySection company={company} />
            </>
          ) : (
            <>
              <div className="px-4 py-4 md:px-8 lg:px-12">
                <NoJobsFound title ="Not Company" />
              </div>
            </>
          )}
        </div>
        <div>
          {categories.length > 0 ? (
            <>
              <CategorySection catogory={categories} />
            </>
          ) : (
            <>
              <div className="px-4 py-4 md:px-8 lg:px-12">
                <NoJobsFound />
              </div>
            </>
          )}
        </div>
        <TestimonialsSection />
      </div>
    </div>
  );
}

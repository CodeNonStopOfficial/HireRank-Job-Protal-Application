import { getDataPublicJob } from "@/app/services/candidata/get-public-jobpost";
import { JobPublicJobFilterCard } from "../_components/JobCardPublicCardFilter";

export default async function HomePage() {
  const data = await getDataPublicJob();
  return (
    <>
      <JobPublicJobFilterCard data={data} />
    </>
  );
}

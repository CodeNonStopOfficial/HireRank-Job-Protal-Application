import { getAllCompanyAndWithJobs } from "@/app/services/candidata/get-companyall";
import { CompaniesPage } from "../_components/CompanyPageSection";

export default async function CompanyPageHome(){
    const data = await getAllCompanyAndWithJobs();
    return (
        <CompaniesPage companies={data}/>
    )
}
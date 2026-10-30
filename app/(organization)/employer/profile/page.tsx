import { EmployeCompanyByIdProfile } from "@/app/services/employer/get-company";
import { CompanyProfileComponent } from "../_components/CompanyProfile";
import { notFound } from "next/navigation";

export default async function CompanyProfilePage(){
    const data = await EmployeCompanyByIdProfile();
    if(!data){
        return notFound();
    }
    return (
        <div>
            <CompanyProfileComponent company={data}/>
        </div>
    )
}
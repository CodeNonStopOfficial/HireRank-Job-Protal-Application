import { requireCompany } from "@/app/utils/requiredCompany";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function EmployeCompanyByIdProfile() {
    const session = await requireCompany();
    if(!session.id){
        return notFound();
    }
    const data = await prisma.company.findUnique({
        where : {
            userId : session.id,
        },
        include : {
            _count : {
                select : {
                    jobs : true
                }
            }
        },    
    });
    return data
}

export type EmployeCompanyByIdProfileType = NonNullable<Awaited<ReturnType<typeof EmployeCompanyByIdProfile>>>


export async function GetCompanyProfile(companyId:string) {
    const data = await prisma.company.findUnique({
        where : {
            id :companyId
        },
    });
    return data;
}

export type GetCompanyProfileType = NonNullable<Awaited<ReturnType<typeof GetCompanyProfile>>>
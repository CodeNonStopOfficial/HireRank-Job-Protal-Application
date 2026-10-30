"use client";
import { getDataPublicJobTypeArray } from "@/app/services/candidata/get-public-jobpost";
import {
  employmentOptions,
  experienceOptions,
} from "@/app/utils/typejsondata";
import { NoJobsFound } from "@/components/common/NotJobFoundCard";
import { PublicPerCardJobComponent } from "@/components/common/PublicPerCardJob";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { RefreshCcwDot } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface iAppProps {
  data: getDataPublicJobTypeArray;
}
export function JobPublicJobFilterCard({ data }: iAppProps) {

  const searchParams = useSearchParams();
  const company = searchParams.get("company")?.trim() ?? "";
   const department = searchParams.get("category")?.trim() ?? "";
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string>("");
  const [jobType, setJobType] = useState<string | null>("");
  const [experience, setExpreLevel] = useState<string | null>("");

  useEffect(()=>{
    if(company) {
       setSearch(company);
    }else if(department) {
      setSearch(department)
    }else {
      setSearch("");
    }
  },[company,department])




  const filteredJobs = data.filter((data) => {
    const matchesSearch =
      data.title.toLowerCase().includes(search.toLowerCase()) ||
      data.company.name.toLowerCase().includes(search.toLowerCase())
      || data.department?.toLowerCase().includes(search.toLowerCase());

    const matchesLocation = data.location.toLowerCase().includes(location.toLowerCase())

    const matchesJobType =
      jobType === "" ? true : data.employmentType === jobType?.toUpperCase();

    const experienceLevel =
      experience === ""
        ? true
        : data.experienceLevel === experience?.toUpperCase();

    return (
      matchesSearch && matchesLocation && matchesJobType && experienceLevel
    );
  });

  function handleResetFunction(){
     setSearch("");
     setLocation("");
     setExpreLevel("");
     setJobType("");
     toast.add({
      type : "success",
      title : "Filter Reset Successfully"
     })
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <Card className="h-fit">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Find Jobs</CardTitle>
              <span className="text-sm font-bold text-green-900">
                Total Jobs Found: {filteredJobs?.length ?? 0}
              </span>
            </div>

            <CardDescription>
              Please Find Out all Filter Jobs and Application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-row gap-2 items-center justify-center">
              <Input
                id="title"
                name="title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job title or company or department"
                className="px-4 py-4.5"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={jobType}
                onValueChange={(value) => setJobType(value)}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Employment Type</SelectLabel>
                    {employmentOptions?.map((type, index) => (
                      <SelectItem key={index + 1} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={experience}
                onValueChange={(value) => setExpreLevel(value)}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select Eexperice Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Exprence Level</SelectLabel>
                    {experienceOptions?.map((type, index) => (
                      <SelectItem key={index + 1} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                placeholder="Search location (e.g. India, Bihar, Patna)"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-4.5"
              />
            </div>
            <div>
               <Button variant="destructive" onClick={handleResetFunction} className="px-8 py-4 w-full">
                  <RefreshCcwDot/>
                  Reset Filter
               </Button>
            </div>
          </CardContent>
        </Card>
        <div className="col-span-2 flex flex-col gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((data) => (
              <PublicPerCardJobComponent key={data.id} data={data} />
            ))
          ) : (
            <>
              <NoJobsFound
                onClearFilters={handleResetFunction}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

import { getUserDataPerUser } from "@/app/services/users/get-user-perdata";
import { LinkedIn, XformerlyTwitter } from "@/app/utils/iconsvgl";
import { Github } from "@/components/shared/ButtonIcons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeCheck,
  BadgeX,
  BriefcaseBusiness,
  Globe,
  GraduationCap,
  MapPin,
  Plus,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Resume from "../_components/ResumeShow";
import ShowEducationComponent from "@/components/candidate/ShowEducationComponent";
import ShowExprienceComponent from "@/components/candidate/ShowExperienceComponent";
import { buttonVariants } from "@/components/ui/button";

export default async function CandidateProfilePage() {
  const data = await getUserDataPerUser();
  return (
    <>
      <section className="min-h-screen max-w-full py-6">
        <div className="flex flex-col gap-2">
          {/* profile card  */}
          <Card>
            <CardHeader className="bg-gray-900 py-4">
              <div className="flex justify-between gap-2 items-center">
                <CardTitle className="md:text-2xl text-white md:font-bold">
                  Welcome to Profile Section
                </CardTitle>
                <Badge>{data.role && "Candidate"}</Badge>
              </div>
              <CardDescription className="text-sm md:font-medium">
                This is Your Profile Page to See and Edit and Update Data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="flex items-start justify-start gap-6">
                  <div>
                    {data.image ? (
                      <>
                        <Image
                          src={data.image ?? ""}
                          width={95}
                          height={95}
                          className="border rounded-2xl border-primary object-cover"
                          alt="logo"
                          priority
                        />
                      </>
                    ) : (
                      <>
                        <div className="object-cover">
                          <User className="size-22 bg-gray-900 border rounded-2xl p-3 text-blue-800" />
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 justify-start">
                      <h1 className="text-2xl font-bold">{data.name}</h1>
                      <span>
                        {data.onboadingCompleted ? (
                          <>
                            <BadgeCheck
                              color="#001eff"
                              className="size-4 text-blue-900"
                            />
                          </>
                        ) : (
                          <>
                            <BadgeX fill="red" className="size-4" />
                          </>
                        )}
                      </span>
                    </div>
                    <h1 className="text-xl font-normal text-muted-foreground">
                      {data.jobSeeker?.goal ?? "Software Engineer"}
                    </h1>
                    <div className="space-y-1">
                      <h1>
                        {data.jobSeeker?.headline ??
                          "I am Software Engineer,because problem solver"}
                      </h1>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {data.jobSeeker?.location ?? "Patna Bihar"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href={
                          data.jobSeeker?.linkeding ??
                          "https://www.linkedin.com"
                        }
                        className="border p-2 rounded-2xl dark:bg-gray-900"
                      >
                        <LinkedIn className="size-6" />
                      </Link>
                      <Link
                        href={
                          data.jobSeeker?.githubUrl ?? "https://www.github.com"
                        }
                        className="border p-2 rounded-2xl dark:bg-gray-900"
                      >
                        <Github className="size-6 dark:fill-gray-100" />
                      </Link>
                      <Link
                        href={
                          data.jobSeeker?.website ?? "https://www.website.com"
                        }
                        className="border p-2 rounded-2xl dark:bg-gray-900"
                      >
                        <Globe className="size-6 text-primary" />
                      </Link>
                      <Link
                        href={
                          data.jobSeeker?.xAccount ??
                          "https://www.x-account.com"
                        }
                        className="border p-2 rounded-2xl dark:bg-gray-900"
                      >
                        <XformerlyTwitter className="size-6" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* about card  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card className="h-fit">
              <CardContent className="space-y-1">
                <h1 className="text-xl font-bold">About Me</h1>
                <div>
                  {data.jobSeeker?.about ? (
                    <span>{data.jobSeeker?.about}</span>
                  ) : (
                    <span>Not About Conent</span>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* resume view  */}
            <Card className="h-fit">
              <CardContent>
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold">Resume</h1>
                  <Link
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-2 py-2
                 bg-black text-white rounded font-semibold
                hover:bg-gray-800 transition-all duration-300
                  shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M12 15V3" />
                    </svg>
                  </Link>
                </div>
                <div className="max-w-full mt-2">
                  <Resume data={data.jobSeeker?.resume as string} />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* // education and expreince  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 py-6 border rounded-xl bg-background">
            {/* Experience */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-primary" />
                  Experience
                </h2>
                <Link
                  href="/candidate/profile/experience"
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  <Plus className="size-4" />
                </Link>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore professional experience, work history, and career
                progression, including full-time, part-time, and internship
                roles.
              </p>
              <div>
                {(data.jobSeeker?.experience?.length ?? 0) > 0 ? (
                  <>
                    <div>
                      {data.jobSeeker?.experience.map((exprience) => (
                        <ShowExprienceComponent
                          key={exprience.id}
                          data={exprience}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Card>
                      <CardContent>
                        <h1 className="text-xl font-bold">
                          No Exprience Found
                        </h1>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Education
                </h2>
                <Link
                  href="/candidate/profile/education"
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  <Plus className="size-4" />
                </Link>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore academic background, educational qualifications,
                degrees, certifications, and achievements.
              </p>
              <div>
                {(data.jobSeeker?.education?.length ?? 0) > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                      {data.jobSeeker?.education.map((data) => (
                        <ShowEducationComponent
                          key={data.id}
                          education={data}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Card>
                      <CardContent>
                        <h1 className="text-xl font-bold">
                          No Education Found
                        </h1>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

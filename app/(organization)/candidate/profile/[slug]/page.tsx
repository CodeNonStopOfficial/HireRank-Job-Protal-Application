import { getJobSeerProfileDataById } from "@/app/services/users/get-jobseekerdata-byid";
import { EducationCreationForm } from "../_components/EditProfileForm";
interface iAppPros {
  params: Promise<{ slug: string }>;
}
export default async function ProfileUpdatePage({ params }: iAppPros) {
  const {slug} = await params;
  const profileData = await getJobSeerProfileDataById(slug);
  return (
    <div className="min-h-screen max-w-full py-5">
      <EducationCreationForm profile={profileData} />
    </div>
  );
}

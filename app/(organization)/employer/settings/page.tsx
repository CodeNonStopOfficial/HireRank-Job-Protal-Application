"use client"
import { DeleteButton } from "@/components/shared/DeleteButton";
import { toast } from "@/components/ui/toast";
import { deleteCompanyAndUserAccount } from "@/app/(organization)/employer/profile/actions";
export default function SettingPageEmploye() {
  return (
    <div>
      <h1>Setting Page</h1>
      <DeleteButton
        title="Delete Job"
        onDelete={async () => {
          const result = await deleteCompanyAndUserAccount();

          toast.add({
            type: result.status === "success" ? "success" : "error",
            title: result.message,
          });
        }}
      />
    </div>
  );
}

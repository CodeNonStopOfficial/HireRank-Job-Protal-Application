"use client";

import { Card, CardContent } from "../ui/card";

interface iAppProsExprience {
  data: {
    id: string;
    companyName: string;
    companyLogo: string | null;
    position: string;
    startDate: string;
    endDate: string | null;
    aboutCompany: string | null;
    workDescription: string | null;
    projectLink: string | null;
    certificationUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    jobSeekerId: string;
  };
}

export default function ShowExprienceComponent({data}: iAppProsExprience) {
  return (
    <Card>
      <CardContent>
        <div>
          <h1>Card</h1>
        </div>
      </CardContent>
    </Card>
  );
}

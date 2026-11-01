"use client";

import { Card, CardContent } from "../ui/card";

interface iAppProsEducation {
  education: {
    id: string;
    collegeName: string;
    collegeLogo: string | null;
    courseName: string;
    startDate: string;
    endDate: string | null;
    aboutCollege: string | null;
    updatedAt: Date;
    createdAt: Date;
    jobSeekerId: string | null;
  };
}

export default function ShowEducationComponent({
  education,
}: iAppProsEducation) {
  return (
    <Card>
      <CardContent>
        <div>
          <h1>Image</h1>
        </div>
      </CardContent>
    </Card>
  );
}

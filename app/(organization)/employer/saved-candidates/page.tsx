import { GetBookmarkedAllJobs } from "@/app/services/employer/get-bookmarkalljob";
import { BookmarkButton } from "@/components/common/BookMarkButton";
import { BookmarkJobCharts } from "@/components/company/BookmarkJobCharts";
import { RemoveBookmarkButton } from "@/components/employes/RemoveBookmark";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bookmark,
  BriefcaseBusiness,
  ArrowUpRight,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function SaveBookmarkRecuiterPage() {
  const data = await GetBookmarkedAllJobs();
  const chartData = data.map((bookmark) => ({
    createdAt: bookmark.createdAt.toISOString(),
    job: {
      employmentType: bookmark.employmentType,
      workplaceType: bookmark.workplaceType,
    },
  }));
  return (
    <section className="min-h-screen bg-muted/20 py-8">
      <div className="mbt-8">
        <Suspense fallback={<h1>Loading....</h1>}>
          <BookmarkJobCharts data={chartData} />
        </Suspense>
      </div>
      <div className="mx-auto max-w-6xl space-y-6 mt-5">
        {/* Bookmarked Jobs */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.map((bookmark) => (
              <Card
                key={bookmark.id}
                className="group rounded-2xl border-border/70 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <CardContent>
                  <div className="flex items-start gap-4 p-2">
                    <div>
                      {bookmark.company.logo ? (
                        <>
                          <Image
                            src={bookmark.company.logo ?? ""}
                            width={55}
                            height={55}
                            className="object-cover border p-2 rounded-2xl"
                            alt="No"
                          />
                        </>
                      ) : (
                        <>
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <BriefcaseBusiness className="size-6" />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-base font-semibold transition-colors group-hover:text-primary">
                        {bookmark.title}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {bookmark.location}
                      </p>
                    </div>

                    {/* <Bookmark className="size-5 shrink-0 fill-primary text-primary" /> */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 border p-2 rounded">
                        <User2 className="size-4 text-primary" />
                        <span>{bookmark._count.jobBookmarks}</span>
                      </div>
                      <BookmarkButton
                        jobId={bookmark.id}
                        initialBookmarked={bookmark.isBookmarked ?? false}
                      />
                      <div>
                        <RemoveBookmarkButton jobId={bookmark.id} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-end flex justify-end">
                    <Link
                      href={`/employer/manage-jobs/${bookmark.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      View Job
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-2xl border-dashed shadow-none">
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Bookmark className="size-8 text-muted-foreground" />
              </div>

              <h2 className="text-lg font-semibold">No Bookmarked Jobs Yet</h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                You haven&apos;t saved any jobs yet. Browse available
                opportunities and bookmark jobs you want to revisit.
              </p>

              <Link
                href="/get-started"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Explore Jobs
                <ArrowUpRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

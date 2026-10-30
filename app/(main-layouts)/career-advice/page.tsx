
import Link from "next/link";
import {
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  TrendingUp,
  Search,
  ArrowRight,
  Lightbulb,
  Target,
  GraduationCap,
  Clock3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const careerTips = [
  {
    icon: FileText,
    category: "Resume Tips",
    title: "How to Create a Resume That Gets Noticed",
    description:
      "Learn how to highlight your skills, experience, and achievements to make a strong first impression.",
    color:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    readTime: "5 min read",
  },
  {
    icon: MessageSquare,
    category: "Interview Preparation",
    title: "10 Common Interview Questions and How to Answer Them",
    description:
      "Prepare for your next interview with practical tips and examples of effective answers.",
    color:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    readTime: "8 min read",
  },
  {
    icon: Search,
    category: "Job Search",
    title: "How to Find the Right Job for Your Skills",
    description:
      "Discover smarter ways to search for jobs, use job portals, and connect with employers.",
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    readTime: "6 min read",
  },
  {
    icon: TrendingUp,
    category: "Career Growth",
    title: "Practical Ways to Grow Your Career",
    description:
      "Build valuable skills, set career goals, and take the next step toward professional growth.",
    color:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    readTime: "7 min read",
  },
  {
    icon: BriefcaseBusiness,
    category: "Workplace Skills",
    title: "Essential Skills Employers Look For",
    description:
      "Understand the communication, teamwork, and problem-solving skills that employers value.",
    color:
      "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
    readTime: "5 min read",
  },
  {
    icon: GraduationCap,
    category: "Freshers Guide",
    title: "How to Start Your Career as a Fresher",
    description:
      "Explore entry-level opportunities, internships, and practical steps to land your first job.",
    color:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    readTime: "6 min read",
  },
];

const quickTips = [
  {
    icon: Target,
    number: "01",
    title: "Set Clear Goals",
    description:
      "Decide what kind of role and career path you want to pursue.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Keep Learning",
    description:
      "Improve your skills with courses, projects, and hands-on practice.",
  },
  {
    icon: BriefcaseBusiness,
    number: "03",
    title: "Build Your Network",
    description:
      "Connect with professionals and explore new opportunities.",
  },
];

const features = [
  {
    icon: FileText,
    title: "Resume Building",
    description: "Present your experience with confidence.",
  },
  {
    icon: MessageSquare,
    title: "Interview Skills",
    description: "Get ready to impress potential employers.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Take meaningful steps toward your goals.",
  },
];

export default function CareerAdvicePage() {
  return (
    <main className="min-h-screen overflow-hidden transition-colors duration-300 dark:text-slate-100">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-600/10" />
          <div className="absolute -left-24 top-48 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[48px_48px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Hero content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                Your Career Starts Here
              </div>

              <h1 className="mt-7 max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Build a Career
                <span className="mt-2 block bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                  You&apos;re Proud Of.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
                Get practical career advice, sharpen your skills, prepare for
                interviews, and discover the next opportunity waiting for you.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#career-tips"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  Explore Career Tips
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/get-started"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
                >
                  Find Jobs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Practical advice
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Career guidance
                </span>
              </div>
            </div>

            {/* Hero feature panel */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-4xl bg-linear-to-br from-blue-500/10 via-indigo-500/5 to-violet-500/10 blur-2xl" />

              <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl sm:p-7 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Your career toolkit
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                      Ready for your next step?
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.title}
                        className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition duration-200 hover:border-blue-200 hover:bg-blue-50/70 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-blue-400/30 dark:hover:bg-blue-400/5"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            index === 0
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                              : index === 1
                                ? "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                                : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {feature.title}
                          </h3>
                          <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                            {feature.description}
                          </p>
                        </div>

                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-500/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                    <Target className="h-5 w-5" />
                  </div>

                  <p className="text-sm leading-6 text-blue-800 dark:text-blue-200">
                    <span className="font-semibold">Your next move matters.</span>{" "}
                    Start building the future you want today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Advice Cards */}
      <section
        id="career-tips"
        className="scroll-mt-20 px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                Career Resources
              </div>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                Advice for Every Career Stage
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                Everything you need to move forward with confidence, from your
                first resume to your next big promotion.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              6 Career Guides
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careerTips.map((tip, index) => {
              const Icon = tip.icon;

              return (
                <article
                  key={tip.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:bg-slate-900"
                >
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-blue-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tip.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      GUIDE {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {tip.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900 dark:text-white">
                    {tip.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {tip.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <Clock3 className="h-4 w-4" />
                      {tip.readTime}
                    </span>

                    <Link
                      href="/career-advice"
                      aria-label={`Read more about ${tip.title}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-400/10"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Advice Section */}
      <section className="border-y px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
              <Lightbulb className="h-3.5 w-3.5" />
              Your Career Toolkit
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Small Steps, Big Progress
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Build better habits today and create more opportunities for
              tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {quickTips.map((tip) => {
              const Icon = tip.icon;

              return (
                <div
                  key={tip.title}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/30 dark:hover:bg-slate-900 dark:hover:shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-500/10 dark:text-blue-400">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-3xl font-extrabold tracking-tight text-slate-200 dark:text-slate-800">
                      {tip.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                    {tip.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {tip.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-12 shadow-xl shadow-blue-900/10 sm:px-10 md:py-16 lg:px-16">
          {/* Decorative elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-20 h-64 w-64 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5 blur-2xl"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm">
              <BriefcaseBusiness className="h-7 w-7" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
              Your Future Starts Today
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready for Your Next Opportunity?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Put your career plan into action. Discover opportunities that
              match your interests, skills, and ambitions.
            </p>

            <Link
              href="/get-started"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-bold text-blue-700 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
            >
              Browse Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

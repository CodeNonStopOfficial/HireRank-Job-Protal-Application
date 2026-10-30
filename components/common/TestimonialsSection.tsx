
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "Tech Solutions",
    image: "/testimonials/priya.jpg",
    rating: 5,
    review:
      "JobNest made my job search so much easier. I found relevant opportunities and landed my dream frontend developer role!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Software Engineer",
    company: "InnovateTech",
    image: "/testimonials/rahul.jpg",
    rating: 5,
    review:
      "The platform is simple to use, and the job listings are easy to explore. I received an interview opportunity within a week!",
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "UI/UX Designer",
    company: "Creative Studio",
    image: "/testimonials/ananya.jpg",
    rating: 5,
    review:
      "As a fresher, finding the right opportunity was challenging. JobNest helped me discover opportunities that matched my skills.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Success Stories
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            What Our Users{" "}
            <span className="text-primary">Say About Us</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Discover how JobNest helps job seekers find opportunities and
            take the next step in their careers.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group h-full rounded-2xl border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <CardContent className="flex h-full flex-col p-6 sm:p-7">
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Quote className="size-5" />
                  </div>

                  <div
                    className="flex items-center gap-1"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: testimonial.rating }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Review */}
                <p className="mt-6 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-6 border-t border-border/70" />

                {/* User Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full border bg-muted">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-foreground">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-primary">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground sm:text-base">
            Your next career success story could start here.
          </p>
        </div>
      </div>
    </section>
  );
}
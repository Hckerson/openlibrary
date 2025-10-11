import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Bookmark, Clock, Star, Users } from "lucide-react";

export default function CanDo() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading mb-6 text-5xl font-bold text-balance md:text-6xl">
            Your digital library,
            <span className="text-primary"> reimagined</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-balance text-muted-foreground">
            Discover, organize, and enjoy your favorite books with intelligent
            recommendations and seamless reading experiences.
          </p>
        </div>

        {/* Floating UI Elements */}
        <div className="relative mx-auto max-w-6xl">
          {/* Book Progress Widget */}
          <Card className="absolute top-0 left-4 w-64 rotate-[-5deg] transform p-4 shadow-lg transition-transform duration-300 hover:rotate-0 md:left-12">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-16 w-12 items-center justify-center rounded-sm bg-gradient-to-b from-primary to-primary/80">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">
                  The Design of Everyday Things
                </h4>
                <p className="text-xs text-muted-foreground">Don Norman</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground">Chapter 4 of 7</p>
            </div>
          </Card>

          {/* Reading Stats Widget */}
          <Card className="absolute top-8 right-4  w-56 rotate-[3deg] transform p-4 shadow-lg transition-transform duration-300 hover:rotate-0 md:right-12">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <h4 className="text-sm font-semibold">Reading Stats</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This week</span>
                <span className="font-semibold">4h 32m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Books finished</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Reading streak</span>
                <span className="font-semibold text-accent">7 days</span>
              </div>
            </div>
          </Card>

          {/* Bookmarks Widget */}
          <Card className="absolute bg-white bottom-12 left-8 w-60 rotate-[2deg] transform p-4 shadow-lg transition-transform duration-300 hover:rotate-0 md:left-20">
            <div className="mb-3 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-secondary" />
              <h4 className="text-sm font-semibold">Recent Bookmarks</h4>
            </div>
            <div className="space-y-2">
              <div className="rounded bg-muted p-2 text-xs">
                <p className="font-medium">{`"Good design is invisible"`}</p>
                <p className="text-muted-foreground">Page 127 • 2 hours ago</p>
              </div>
              <div className="rounded bg-muted p-2 text-xs">
                <p className="font-medium">[{`"Affordances and signifiers"`}]</p>
                <p className="text-muted-foreground">Page 89 • Yesterday</p>
              </div>
            </div>
          </Card>

          {/* Recommendations Widget */}
          <Card className="absolute right-8 bg-white dark:text-black bottom-8 w-64 rotate-[-2deg] transform p-4 shadow-lg transition-transform duration-300 hover:rotate-0 md:right-20">
            <div className="mb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h4 className="text-sm font-semibold">Recommended for You</h4>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-12 w-8 rounded-sm bg-gradient-to-b from-accent to-accent/80"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium">Atomic Habits</p>
                  <p className="text-xs text-muted-foreground">James Clear</p>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs">4.8</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-12 w-8 rounded-sm bg-gradient-to-b from-primary to-primary/80"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium">Thinking, Fast and Slow</p>
                  <p className="text-xs text-muted-foreground">
                    Daniel Kahneman
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs">4.6</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Central Book Display */}
          <div className="relative z-10 mt-16">
            <div className="mb-8 flex items-end justify-center gap-4">
              <div className="h-48 w-32 rotate-[-8deg] transform rounded-lg bg-gradient-to-b from-muted to-muted/60 opacity-60 shadow-lg"></div>
              <div className="flex h-52 w-36 rotate-[-2deg] transform items-center justify-center rounded-lg bg-gradient-to-b from-primary to-primary/80 shadow-xl">
                <BookOpen className="h-12 w-12 text-primary-foreground" />
              </div>
              <div className="h-48 w-32 rotate-[6deg] transform rounded-lg bg-gradient-to-b from-accent to-accent/80 opacity-60 shadow-lg"></div>
            </div>
          </div>
        </div>

        <section className="bg-muted/30 py-20 lg:w-[1024px] mx-auto">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h3 className="font-heading mb-4 text-3xl font-bold">
                Everything you need to read better
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From intelligent organization to social reading features,
                ReadVault enhances every aspect of your reading journey.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-heading mb-2 font-semibold">
                  Smart Library
                </h4>
                <p className="text-sm text-muted-foreground">
                  Automatically organize your books with AI-powered
                  categorization and intelligent search.
                </p>
              </Card>

              <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-heading mb-2 font-semibold">
                  Social Reading
                </h4>
                <p className="text-sm text-muted-foreground">
                  Share highlights, join book clubs, and discover what your
                  friends are reading.
                </p>
              </Card>

              <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-heading mb-2 font-semibold">
                  Personalized
                </h4>
                <p className="text-sm text-muted-foreground">
                  Get tailored recommendations based on your reading history and
                  preferences.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

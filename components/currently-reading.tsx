"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { badgeColor } from "@/lib/placeholder_data";

import {
  Eye,
  Download,
  Share2,
  BookOpen,
  // FileText,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useToast } from "@/hooks/use-toast";
// import { formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
import { Progress } from "./ui/progress";
import { mockPDFs } from "@/lib/placeholder_data";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function CurrentlyReading() {
  return (
    <Card className="h-full border-0 mb-2 shadow-2xl inset-shadow-2xs">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-indigo-600" />
          Currently Reading
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="h-scroll hstyled-scrollbar flex h-full gap-4 overflow-x-auto pb-2">
          {mockPDFs.map((pdf, i) => (
            <div
              key={i}
              className="flex h-full w-48 flex-shrink-0 flex-col space-y-2 rounded-lg p-3"
            >
              <div className="relative">
                {/* Thumbnail */}
                <div className="group/master relative overflow-hidden bg-muted">
                  <Image
                    height={1920}
                    width={1020}
                    src={pdf.thumbnail || "/placeholder.svg"}
                    alt={`${pdf.title} thumbnail`}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover/master:scale-105"
                  />

                  {/* Overlay with quick actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity duration-200 group-hover/master:opacity-100 dark:opacity-100">
                    <Button
                      size="sm"
                      className="bg-white/50 hover:bg-white/70 opacity-0 group-hover/master:opacity-100"
                      asChild
                    >
                      <Link href={`/pdf/${pdf.id}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    {/* <Button
                      size="sm"
                      className="bg-white/50 hover:bg-white/70"
                      // onClick={handleDownload}
                    >
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button> */}
                  </div>

                  {/* Subject badge */}
                  <Badge
                    style={{ backgroundColor: badgeColor[pdf.subject] }}
                    className={clsx("absolute top-2 left-2 text-xs text-white")}
                  >
                    {pdf.subject}
                  </Badge>

                  {/* More actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 bg-background/80 opacity-0 transition-opacity group-hover/master:opacity-100 hover:bg-background"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/pdf/${pdf.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Open PDF
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <h4 className="mb-1 truncate text-sm font-medium">{pdf.title}</h4>
              <span className="flex space-x-2">
                {pdf.authors.slice(0, 2).map((author) => {
                  return (
                    <p key={author} className="mb-2 text-xs text-gray-500">
                      {author}
                    </p>
                  );
                })}
              </span>
              <div className="flex items-center justify-between text-xs">
                <span>{pdf.progress}% complete</span>
                <div className="h-1 w-16 rounded-full bg-gray-200">
                  {/* <div
                    className="h-1 rounded-full bg-blue-600"
                    style={{ width: `${pdf.progress}%` }}
                  ></div> */}
                  <Progress value={pdf.progress} className="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { badgeColor } from "@/lib/placeholder_data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  Download,
  Heart,
  Share2,
  BookOpen,
  FileText,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export interface Owner {
  id: string;
  name: string;
  avatar?: string;
}

export interface Document {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  language: string;
  isbn: string;
  doi: string | null;
  tags: string[];
  sourceType: string;
  sourceUrl: string | null;
  isPublic: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
  isExternalContent: boolean;
  canViewNow: boolean;
  canDownloadNow: boolean;
  hasFullText: boolean;
  processingStatus: string;
  r2ObjectKey: string;
  pageCount: number;
  size: number;
  status: string;
  shareSlug: string;
  relevanceScore: number;
  source: string;
}

export interface ExternalBook {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  language: string;
  isbn: string;
  description: string;
  subjects: string[];
  sourceType: string;
  sourceUrl: string;
  downloadUrl: string | null;
  relevanceScore: number;
  source: string;
}

export interface ExternalPaper {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  language: string;
  doi: string;
  description: string;
  subjects: string[];
  sourceType: string;
  sourceUrl: string;
  downloadUrl: string | null;
  relevanceScore: number;
  source: string;
}

export interface PDFCardProps {
  pdf: Document | ExternalBook | ExternalPaper;
}

export function PDFCard2({ pdf }: PDFCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    "views" in pdf ? pdf.views : 0
  );

  const { toast } = useToast();

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: `${pdf.title} has been ${isLiked ? "removed from" : "added to"} your favorites.`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: pdf.title,
        text: "summary" in pdf ? pdf.summary : pdf.description,
        url: `/pdf/${pdf.id}`,
      });
    } catch (error) {
      console.log(error);
      navigator.clipboard.writeText(`${window.location.origin}/pdf/${pdf.id}`);
      toast({
        title: "Link copied",
        description: "PDF link has been copied to your clipboard.",
      });
    }
  };

  // Map fields for consistent rendering
  const isDocument = "summary" in pdf;
  const isExternalBook = "description" in pdf && "isbn" in pdf;
  const isExternalPaper = "description" in pdf && "doi" in pdf;

  const description = isDocument ? pdf.summary : pdf.description;
  const tags = isDocument ? pdf.tags : pdf.subjects;
  const uploader =  pdf.authors.join(", ") || "Unknown";
  const uploadDate = isDocument ? pdf.createdAt : pdf.publishedDate;
  const fileSize = isDocument ? `${(pdf.size / 1024 / 1024).toFixed(1)} MB` : "N/A";
  const downloads = isDocument ? pdf.views : 0;
  const subject = tags && tags.length > 0 ? tags[0] : "Unknown";
  const canDownload = isDocument
    ? pdf.canDownloadNow
    : "downloadUrl" in pdf && pdf.downloadUrl !== null;

  return (
    <Card className="group grid overflow-hidden shadow-sm rounded-xl transition-all duration-200 hover:shadow-lg">
      <div className="relative">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            height={1920}
            width={1020}
            src={"/images/default-img.jpg"}
            alt={`${pdf.title} thumbnail`}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />

          {/* Overlay with quick actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button size="sm" className="bg-white/50 hover:bg-white/70" asChild>
              <Link href={pdf.sourceUrl ? pdf.sourceUrl :`/pdf/${pdf.id}`}>
                <Eye className="mr-1 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-white/50 hover:bg-white/70"
              disabled={!canDownload}
            >
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
          </div>

          {/* Subject badge */}
          <Badge
            style={{ backgroundColor: badgeColor[subject] || badgeColor["Physics"] }}
            className={clsx("absolute top-2 left-2 text-xs text-white")}
          >
            {subject}
          </Badge>

          {/* More actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="absolute flex items-center justify-center top-2 right-2 h-8 w-8 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background"
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
              <DropdownMenuItem disabled={!canDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid">
        <CardContent className="p-4 pb-0">
          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-base font-semibold text-balance">
              <Link
                href={`/pdf/${pdf.id}/preview`}
                className="hover:text-primary transition-colors"
              >
                {pdf.title}
              </Link>
            </h3>
            <p className="line-clamp-2 text-sm text-pretty text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Tags/Subjects */}
          <div className="mt-3 flex flex-wrap gap-1">
            {tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags && tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Type-Specific Info */}
          <div className="mt-2 text-xs text-muted-foreground">
            {(isDocument || isExternalBook) && "isbn" in pdf && pdf.isbn && <p>ISBN: {pdf.isbn}</p>}
            {isExternalPaper && "doi" in pdf && pdf.doi && <p>DOI: {pdf.doi}</p>}
            {isDocument && <p>Public: {pdf.isPublic ? "Yes" : "No"}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex w-full flex-col items-center justify-between px-4">
          <div className="mt-3 flex w-full items-center gap-2 border-t pt-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={"/images/woman.jpg"} />
              <AvatarFallback className="text-xs">
                {uploader
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-muted-foreground">{uploader}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(uploadDate), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="flex w-full items-center justify-between pb-3">
            <div className="flex w-full items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{fileSize}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLike}
                className={`h-8 px-2 ${isLiked ? "text-red-500" : ""}`}
              >
                <Heart
                  className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
                <span className="text-xs">{likeCount}</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleShare}
                className="h-8 px-2"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
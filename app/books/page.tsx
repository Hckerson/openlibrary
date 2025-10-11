"use client";

import clsx from "clsx";
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/common/Logo";
import { PDFCard2 } from "@/components/ui/pdf-cards";
import { Button } from "@/components/ui/button";
import { mockPDFs } from "@/lib/placeholder_data";
import SearchBar from "@/components/ui/searchBar";
import { useSearchParams } from "next/navigation";
import { PDFCard } from "@/components/ui/pdf-card";
import {  Filter } from "lucide-react";
import { badgeColor } from "@/lib/placeholder_data";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

// Mock PDF data

export interface Owner {
  id: string;
  name: string;
  email: string;
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DataResponse {
  query: string;
  type: string;
  documents: Document[];
  externalBooks: ExternalBook[];
  externalPapers: ExternalPaper[];
  pagination: Pagination;
}

interface SearchResult {
  documents: Document[];
  papers: ExternalPaper[];
  books: ExternalBook[];
}

export interface RootResponse {
  success: boolean;
  data: DataResponse;
}

export default function Books() {
  const searchParams = useSearchParams();
  const [pdfs, setPdfs] = useState<PDF[]>(mockPDFs);
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("search") || "",
  );
  const [sortBy, setSortBy] = useState("relevance");
  const [searches, setSearches] = useState<SearchResult>();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter and sort PDFs
  const filteredAndSortedPDFs = useMemo(() => {
    let filtered = pdfs;
    setPdfs(mockPDFs);
    setIsLoading(false);
    // Apply search filter
    if (searchQuery) {
      // filtered = filtered.filter(
      //   (pdf) =>
      //     pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //     pdf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //     pdf.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //     pdf.tags.some((tag) =>
      //       tag.toLowerCase().includes(searchQuery.toLowerCase()),
      //     ),
      // );
      filtered = filtered.filter((pdf) =>
        [
          pdf.title.toLowerCase(),
          pdf.description.toLowerCase(),
          pdf.subject.toLowerCase(),
          ...pdf.tags,
        ].some((r) => r.includes(searchQuery.toLowerCase())),
      );
    }

    // Apply subject filter
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter((pdf) =>
        selectedSubjects.includes(pdf.subject),
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((pdf) =>
        pdf.tags.some((tag) => selectedTags.includes(tag)),
      );
    }

    if (filtered.length < 1) {
      setIsLoading(true);
      setFetchTrigger(true);
 
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "likes":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [pdfs, searchQuery, selectedSubjects, selectedTags, sortBy]);

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  // };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") as string);
  }, [searchParams]);

  useEffect(() => {
    if (fetchTrigger) {
      const handleSearch = async () => {
        try {
          const response = await axios.post(
            "/api/books",
            { searchQuery },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const data: RootResponse = await response.data;
          if (data.success) {
            const documents = data.data.documents;
            const externalBooks = data.data.externalBooks;
            const externalPapers = data.data.externalPapers;
            setSearches({
              documents,
              books: externalBooks,
              papers: externalPapers,
            });
            console.log(searches);
          }
        } catch (error) {
          console.error("Search error:", error);
          throw error;
        } finally {
          setFetchTrigger(false);
          setIsLoading(false);
        }
      };
      handleSearch();
    }
  });

  return (
    <div className="min-h-screen">
      <div className="relative flex">
        {/* Desktop Sidebar */}
        {/* <div className="hidden lg:block">
          <Panel
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedSubjects={selectedSubjects}
            setSelectedSubjects={setSelectedSubjects}
          />
        </div>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent
            side="left"
            className="w-[220px] translate-x-0 p-0 transition-transform duration-500 ease-in-out lg:-translate-x-full"
          >
            <Panel
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              selectedSubjects={selectedSubjects}
              setSelectedSubjects={setSelectedSubjects}
            />
          </SheetContent>
        </Sheet> */}
        {/* Main Content */}
        <main className="relative flex-1 items-center justify-center px-5">
          {/* Hero Section */}
          <div className="sticky top-0 z-30 mb-8 flex flex-col space-y-4 border-b bg-white py-6 dark:bg-black">
            <div className="max-w-4xl">
              <Logo />
            </div>
            <div className="flex w-full flex-row items-start justify-between gap-2 px-2 sm:items-center md:gap-4 lg:px-6">
              <div className="relative hidden lg:flex">
                <SearchBar />
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent lg:hidden"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      <p className="hidden max-[360]:block">Filters</p>
                    </Button>
                  </SheetTrigger>
                </Sheet>

                {/* Active Filters */}
                <div className="hidden flex-wrap gap-2 md:flex">
                  {selectedSubjects.map((subject) => {
                    const bg = badgeColor[subject];
                    return (
                      <Badge
                        style={{ backgroundColor: bg }}
                        key={subject}
                        className={clsx("text-xs")}
                      >
                        {subject}
                      </Badge>
                    );
                  })}
                  {selectedTags.map((tag) => {
                    return (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center">
                <span className="flex text-sm">
                  {filteredAndSortedPDFs.length} <p className="ml-1">results</p>
                </span>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Downloaded</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="mx-auto flex w-full flex-col 2xl:max-w-[1280px]">
            {/* PDF Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="mb-4 h-64 rounded-lg bg-muted"></div>
                    <div className="mb-2 h-4 rounded bg-muted"></div>
                    <div className="h-3 w-3/4 rounded bg-muted"></div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedPDFs.length > 0 && !searches ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAndSortedPDFs.map((pdf) => (
                  <PDFCard key={pdf.id} pdf={pdf} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="py-12 text-center">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {searches?.documents.map((search) => (
                    <PDFCard2 key={search.id} pdf={search} />
                  ))}
                  {searches?.papers.map((search) => (
                    <PDFCard2 key={search.id} pdf={search} />
                  ))}
                  {searches?.books.map((search) => (
                    <PDFCard2 key={search.id} pdf={search} />
                  ))}
                </div>
              </div>
            )}

            {filteredAndSortedPDFs.length > 0 &&
              filteredAndSortedPDFs.length >= 6 && (
                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg">
                    Load More PDFs
                  </Button>
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}

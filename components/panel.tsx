"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Filter,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  className?: string;
  selectedSubjects: string[];
  setSelectedSubjects: (tags: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export function Panel({
  className,
  selectedTags,
  setSelectedTags,
  selectedSubjects,
  setSelectedSubjects
}: SidebarProps) {
  const [subjectsOpen, setSubjectsOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);

  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Economics",
    "Literature",
    "History",
    "Psychology",
  ];

  const tags = [
    "Textbook",
    "Lecture Notes",
    "Past Questions",
    "Research Paper",
    "Assignment",
    "Tutorial",
    "Reference",
    "Study Guide",
  ];

  const quickLinks = [
    { href: "/events", label: "Upcoming Events", icon: Calendar },
    { href: "/groups", label: "Study Groups", icon: Users },
    { href: "/dashboard", label: "My Library", icon: BookOpen },
  ];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    }
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedTags([]);
  };

  const handleScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };
  return (
    <aside
      className={`sticky top-0 h-[calc(100vh-0px)] w-[220px] space-y-6 border-r border-sidebar-border  ${className}`}
      onWheel={handleScroll}
    >
      <div className="relative overflow-hidden">
        <nav
          className="styled-scrollbar box-border flex h-[calc(100vh-0px)] flex-col overflow-y-auto overscroll-contain scroll-smooth"
          onWheel={handleScroll}
        >
          <div className="space-y-1 px-3">
            {/* Filter Header */}
            <div className="absolute flex w-[8w0%] items-center justify-between  py-2">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              {(selectedSubjects.length > 0 || selectedTags.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </div>

            {/* Subjects Filter */}
            <Collapsible
              open={subjectsOpen}
              onOpenChange={setSubjectsOpen}
              className="mt-12"
            >
              <CollapsibleTrigger asChild>
                <Button className="h-auto w-full justify-between rounded-lg bg-white px-2 py-1 font-medium text-stone-800 hover:bg-stone-200">
                  Subjects
                  {subjectsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2 pl-2">
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={selectedSubjects.includes(subject)}
                      className="border border-black"
                      onCheckedChange={(checked: boolean) =>
                        handleSubjectChange(subject, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`subject-${subject}`}
                      className="cursor-pointer text-sm"
                    >
                      {subject}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Tags Filter */}
            <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
              <CollapsibleTrigger asChild>
                <Button className="h-auto w-full justify-between rounded-lg bg-white px-2 py-1 font-medium text-stone-800 hover:bg-stone-200">
                  Tags
                  {tagsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2 pl-2">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      className="border border-black"
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked: boolean) =>
                        handleTagChange(tag, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="cursor-pointer text-sm"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Quick Links */}
            <div className="space-y-2 pt-3">
              <h3 className="font-medium">Quick Links</h3>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 rounded-md px-2 py-1 text-sm  transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

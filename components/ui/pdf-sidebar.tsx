"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, List, Info } from "lucide-react"



export function PDFSidebar({ pdf, currentPage, totalPages, onPageChange }: PDFSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock page thumbnails
  const generateThumbnails = () => {
    return Array.from({ length: Math.min(totalPages, 20) }, (_, i) => ({
      page: i + 1,
      thumbnail: `/placeholder.svg?height=120&width=85&text=Page ${i + 1}`,
    }))
  }

  const thumbnails = generateThumbnails()

  // Mock table of contents
  const tableOfContents = [
    { title: "Chapter 1: Foundations", page: 1, level: 0 },
    { title: "1.1 Algorithms", page: 3, level: 1 },
    { title: "1.2 Analyzing algorithms", page: 23, level: 1 },
    { title: "1.3 Designing algorithms", page: 65, level: 1 },
    { title: "Chapter 2: Getting Started", page: 89, level: 0 },
    { title: "2.1 Insertion sort", page: 91, level: 1 },
    { title: "2.2 Analyzing algorithms", page: 98, level: 1 },
    { title: "2.3 Designing algorithms", page: 105, level: 1 },
    { title: "Chapter 3: Growth of Functions", page: 143, level: 0 },
    { title: "3.1 Asymptotic notation", page: 145, level: 1 },
    { title: "3.2 Standard notations", page: 162, level: 1 },
  ]

  const filteredThumbnails = thumbnails.filter(
    (thumb) => searchQuery === "" || thumb.page.toString().includes(searchQuery),
  )

  return (
    <div className="h-full flex flex-col bg-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-semibold text-sidebar-foreground mb-2">Navigation</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50 h-4 w-4" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-accent text-sidebar-accent-foreground"
          />
        </div>
      </div>

      <Tabs defaultValue="thumbnails" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-2">
          <TabsTrigger value="thumbnails" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="outline" className="text-xs">
            <List className="h-3 w-3 mr-1" />
            Outline
          </TabsTrigger>
          <TabsTrigger value="info" className="text-xs">
            <Info className="h-3 w-3 mr-1" />
            Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="thumbnails" className="flex-1 mt-2">
          <ScrollArea className="h-full px-4">
            <div className="space-y-2">
              {filteredThumbnails.map((thumb) => (
                <Button
                  key={thumb.page}
                  variant={currentPage === thumb.page ? "default" : "ghost"}
                  className="w-full h-auto p-2 flex flex-col items-center gap-2"
                  onClick={() => onPageChange(thumb.page)}
                >
                  <div className="w-16 h-20 bg-muted rounded border flex items-center justify-center text-xs">
                    {thumb.page}
                  </div>
                  <span className="text-xs">Page {thumb.page}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="outline" className="flex-1 mt-2">
          <ScrollArea className="h-full px-4">
            <div className="space-y-1">
              {tableOfContents.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start text-left h-auto py-2 px-2 ${
                    item.level === 1 ? "ml-4 text-sm" : "font-medium"
                  }`}
                  onClick={() => onPageChange(item.page)}
                >
                  <div className="flex-1 truncate">{item.title}</div>
                  <span className="text-xs text-muted-foreground ml-2">{item.page}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="info" className="flex-1 mt-2">
          <ScrollArea className="h-full px-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm mb-2">Document Info</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pages:</span>
                    <span className="ml-2">{totalPages.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2">{pdf.fileSize}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subject:</span>
                    <span className="ml-2">{pdf.subject}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span className="ml-2">{new Date(pdf.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Author:</span>
                    <span className="ml-2">{pdf.uploader}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {pdf.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{pdf.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Downloads:</span>
                    <span className="ml-2">{pdf.downloads.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Likes:</span>
                    <span className="ml-2">{pdf.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

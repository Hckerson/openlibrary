"use client"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { mockPDF } from "@/lib/placeholder_data"
import { Navbar } from "@/components/common/navbar"
import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { PDFViewer } from "@/components/ui/pdf-viewer"
import { PDFSidebar } from "@/components/ui/pdf-sidebar"
import { PDFControls } from "@/components/ui/pdf-controls"
import { AnnotationsSidebar } from "@/components/ui/annotations-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronLeft, Menu, FileText, MessageSquare, Download } from "lucide-react"

// Mock PDF data

export default function PDFReaderPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [pdf, setPdf] = useState<PDFDocument | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null)

  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock API call to fetch PDF data
    const fetchPDF = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPdf(mockPDF)
        setTotalPages(mockPDF.pages)
      } catch (error) {
        console.log(error)
        toast({
          title: "Error loading PDF",
          description: "Failed to load the PDF document. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchPDF()
    }
  }, [params.id, toast])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleDownload = () => {
    // Mock download functionality
    toast({
      title: "Download started",
      description: `Downloading ${pdf?.title}...`,
    })
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: pdf?.title,
        text: pdf?.description,
        url: window.location.href,
      })
    } catch (error) {
      // Fallback to clipboard
      console.log(error)
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "PDF link has been copied to your clipboard.",
      })
    }

  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading PDF...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!pdf) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold">PDF not found</h2>
            <p className="text-muted-foreground">The requested PDF could not be found.</p>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" ref={viewerRef}>
      <Navbar />

      <div className="flex pt-[85px]">
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block w-64 border-r bg-sidebar">
          <PDFSidebar pdf={pdf} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        {/* Mobile Left Sidebar */}
        <Sheet open={leftSidebarOpen} onOpenChange={setLeftSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <PDFSidebar pdf={pdf} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </SheetContent>
        </Sheet>

        {/* Main PDF Viewer */}
        <div className="flex-1 flex flex-col">
          {/* PDF Controls */}
          <div className="border-b bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Sheet open={leftSidebarOpen} onOpenChange={setLeftSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                </Sheet>

                <div className="hidden sm:block">
                  <h1 className="font-semibold text-lg truncate max-w-md">{pdf.title}</h1>
                  <p className="text-sm text-muted-foreground">by {pdf.uploader}</p>
                </div>
              </div>

              <PDFControls
                currentPage={currentPage}
                totalPages={totalPages}
                scale={scale}
                onPageChange={handlePageChange}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFullscreen={handleFullscreen}
                onDownload={handleDownload}
                onShare={handleShare}
                isFullscreen={isFullscreen}
              />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>

                <Sheet open={rightSidebarOpen} onOpenChange={setRightSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Annotations
                    </Button>
                  </SheetTrigger>
                </Sheet>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden">
            <PDFViewer
              fileUrl={pdf.fileUrl}
              currentPage={currentPage}
              scale={scale}
              onPageChange={setCurrentPage}
              onTotalPagesChange={setTotalPages}
              annotations={annotations}
              onAnnotationAdd={setAnnotations}
              selectedAnnotation={selectedAnnotation}
              onAnnotationSelect={setSelectedAnnotation}
            />
          </div>
        </div>

        {/* Desktop Right Sidebar */}
        <div className="hidden xl:block w-80 border-l bg-sidebar">
          <AnnotationsSidebar
            pdf={pdf}
            annotations={annotations}
            selectedAnnotation={selectedAnnotation}
            onAnnotationSelect={setSelectedAnnotation}
            onAnnotationUpdate={setAnnotations}
          />
        </div>

        {/* Mobile Right Sidebar */}
        <Sheet open={rightSidebarOpen} onOpenChange={setRightSidebarOpen}>
          <SheetContent side="right" className="w-80 p-0">
            <AnnotationsSidebar
              pdf={pdf}
              annotations={annotations}
              selectedAnnotation={selectedAnnotation}
              onAnnotationSelect={setSelectedAnnotation}
              onAnnotationUpdate={setAnnotations}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

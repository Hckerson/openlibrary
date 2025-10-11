"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Highlighter, MessageSquare, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"



export function PDFViewer({
  // fileUrl,
  currentPage,
  scale,
  // onPageChange,
  onTotalPagesChange,
  annotations,
  onAnnotationAdd,
  selectedAnnotation,
  onAnnotationSelect,
}: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [annotationMode, setAnnotationMode] = useState<"none" | "highlight" | "note">("none")
  const [selectedText, setSelectedText] = useState("")
  const { toast } = useToast()

  // Mock PDF rendering - In a real app, you'd use PDF.js here
  useEffect(() => {
    const renderPage = async () => {
      setIsLoading(true)

      // Simulate PDF.js rendering
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        if (ctx) {
          // Set canvas size based on scale
          const baseWidth = 800
          const baseHeight = 1000
          canvas.width = baseWidth * scale
          canvas.height = baseHeight * scale

          // Mock PDF page rendering
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Add some mock content
          ctx.fillStyle = "#000000"
          ctx.font = `${16 * scale}px Arial`
          ctx.fillText(`Page ${currentPage}`, 50 * scale, 50 * scale)
          ctx.fillText("This is a mock PDF viewer.", 50 * scale, 100 * scale)
          ctx.fillText(
            "In a real implementation, PDF.js would render the actual PDF content here.",
            50 * scale,
            130 * scale,
          )

          // Add some sample text blocks
          const sampleText = [
            "Introduction to Algorithms",
            "",
            "Chapter 1: Foundations",
            "",
            "This chapter introduces the basic concepts and terminology of algorithms.",
            "We will cover the following topics:",
            "• Algorithm analysis",
            "• Asymptotic notation",
            "• Standard notations and common functions",
            "",
            "An algorithm is a well-defined computational procedure that takes",
            "some value, or set of values, as input and produces some value,",
            "or set of values, as output.",
          ]

          sampleText.forEach((line, index) => {
            ctx.fillText(line, 50 * scale, (180 + index * 25) * scale)
          })
        }
      }

      setIsLoading(false)
      onTotalPagesChange(1312) // Mock total pages
    }

    renderPage()
  }, [currentPage, scale, onTotalPagesChange])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (annotationMode === "note") {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left) / scale
        const y = (e.clientY - rect.top) / scale

        const newAnnotation: Annotation = {
          id: Math.random().toString(36).substr(2, 9),
          type: "note",
          page: currentPage,
          x,
          y,
          color: "#fbbf24",
          text: "New note",
          content: "Click to edit this note...",
          createdAt: new Date().toISOString(),
          author: "Current User",
        }

        onAnnotationAdd([...annotations, newAnnotation])
        setAnnotationMode("none")

        toast({
          title: "Note added",
          description: "Click on the note to edit its content.",
        })
      }
    }
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString())
    }
  }

  const addHighlight = () => {
    if (selectedText) {
      const newAnnotation: Annotation = {
        id: Math.random().toString(36).substr(2, 9),
        type: "highlight",
        page: currentPage,
        x: 50, // Mock position
        y: 200,
        width: 200,
        height: 20,
        color: "#fef3c7",
        text: selectedText,
        createdAt: new Date().toISOString(),
        author: "Current User",
      }

      onAnnotationAdd([...annotations, newAnnotation])
      setSelectedText("")
      window.getSelection()?.removeAllRanges()

      toast({
        title: "Text highlighted",
        description: "Highlight has been added to your annotations.",
      })
    }
  }

  const summarizePage = async () => {
    toast({
      title: "AI Summary",
      description:
        "This page covers the fundamental concepts of algorithms, including their definition, analysis methods, and asymptotic notation. Key topics include algorithm efficiency, Big O notation, and common mathematical functions used in algorithm analysis.",
    })
  }

  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* Annotation Toolbar */}
      {(selectedText || annotationMode !== "none") && (
        <div className="p-4 border-b bg-background">
          <div className="flex items-center gap-2">
            {selectedText && (
              <>
                <Button size="sm" onClick={addHighlight}>
                  <Highlighter className="h-4 w-4 mr-2" />
                  Highlight Text
                </Button>
                <span className="text-sm text-muted-foreground">{selectedText.substring(0, 50)}</span>
              </>
            )}

            {annotationMode === "note" && (
              <span className="text-sm text-muted-foreground">Click anywhere on the page to add a note</span>
            )}
          </div>
        </div>
      )}

      {/* PDF Canvas Container */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4" onMouseUp={handleTextSelection}>
        <div className="flex justify-center">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="border shadow-lg cursor-text"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />

            {/* Render Annotations */}
            {annotations
              .filter((annotation) => annotation.page === currentPage)
              .map((annotation) => (
                <div
                  key={annotation.id}
                  className={`absolute cursor-pointer ${
                    annotation.type === "highlight"
                      ? "bg-yellow-200/50 border border-yellow-300"
                      : "w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center"
                  } ${selectedAnnotation === annotation.id ? "ring-2 ring-primary" : ""}`}
                  style={{
                    left: annotation.x * scale,
                    top: annotation.y * scale,
                    width: annotation.width ? annotation.width * scale : undefined,
                    height: annotation.height ? annotation.height * scale : undefined,
                  }}
                  onClick={() => onAnnotationSelect(annotation.id)}
                >
                  {annotation.type === "note" && <MessageSquare className="h-3 w-3 text-yellow-800" />}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant={annotationMode === "highlight" ? "default" : "secondary"}
          onClick={() => setAnnotationMode(annotationMode === "highlight" ? "none" : "highlight")}
          className="rounded-full shadow-lg"
        >
          <Highlighter className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={annotationMode === "note" ? "default" : "secondary"}
          onClick={() => setAnnotationMode(annotationMode === "note" ? "none" : "note")}
          className="rounded-full shadow-lg"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>

        <Button size="icon" variant="secondary" onClick={summarizePage} className="rounded-full shadow-lg">
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

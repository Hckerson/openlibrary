"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react"



export function PDFControls({
  currentPage,
  totalPages,
  scale,
  onPageChange,
  onZoomIn,
  onZoomOut,
  onFullscreen,
  // onDownload,
  // onShare,
  isFullscreen,
}: PDFControlsProps) {
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number.parseInt(e.target.value)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 text-sm">
          <Input
            type="number"
            value={currentPage}
            onChange={handlePageInputChange}
            className="w-16 h-8 text-center"
            min={1}
            max={totalPages}
          />
          <span className="text-muted-foreground">of {totalPages.toLocaleString()}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onZoomOut} disabled={scale <= 0.5}>
          <ZoomOut className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>

        <Button variant="ghost" size="icon" onClick={onZoomIn} disabled={scale >= 3.0}>
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Fullscreen Toggle */}
      <Button variant="ghost" size="icon" onClick={onFullscreen}>
        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
      </Button>
    </div>
  )
}

"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone, type FileRejection } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch_b";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, X, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import axios from "axios";

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

interface FormData {
  title: string;
  description: string;
  subject: string;
  tags: string[];
  isPublic: boolean;
}

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
  "Business Administration",
  "Law",
  "Medicine",
  "Agriculture",
  "Education",
];

const commonTags = [
  "Textbook",
  "Lecture Notes",
  "Past Questions",
  "Research Paper",
  "Assignment",
  "Tutorial",
  "Reference",
  "Study Guide",
  "Syllabus",
  "Handout",
];

export default function UploadPage() {
  const router = useRouter();

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    subject: "",
    tags: [],
    isPublic: true,
  });
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          toast.info(" File too large", {
            description: "Please select a PDF file smaller than 10MB.",
          });
        } else if (
          rejection.errors.some((e) => e.code === "file-invalid-type")
        ) {
          toast.error("Invalid file type", {
            description: "Please select a PDF file only.",
          });
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const preview = URL.createObjectURL(file);

        setUploadedFile({
          file,
          preview,
          id: Math.random().toString(36).substr(2, 9),
        });

        // Auto-fill title from filename
        if (!formData.title) {
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
          setFormData((prev) => ({ ...prev, title: nameWithoutExt }));
        }
      }
    },
    [formData.title],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const removeFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
      setUploadedFile(null);
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!uploadedFile) {
      newErrors.file = "Please select a PDF file to upload";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Validation Error", {
        description: "Please fix the errors below and try again.",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      // const progressInterval = setInterval(() => {
      //   setUploadProgress((prev) => {
      //     if (prev >= 90) {
      //       clearInterval(progressInterval);
      //       return prev;
      //     }
      //     return prev + Math.random() * 15;
      //   });
      // }, 200);

      // Mock API call
      const uploadData = new FormData();
      uploadData.append("file", uploadedFile!.file);
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("subject", formData.subject);
      uploadData.append("tags", JSON.stringify(formData.tags));
      uploadData.append("isPublic", formData.isPublic.toString());

      // Simulate API call

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
    
        const data = await res.json();
        console.log("Upload success:", data);
      } catch (error) {
        console.error(`Error uploading file: ${error}`);  
      }

      setUploadProgress(100);
      toast.success("Upload successful!", {
        description: `${formData.title} has been uploaded to the library.`,
      });

      // Reset form
      setUploadedFile(null);
      setFormData({
        title: "",
        description: "",
        subject: "",
        tags: [],
        isPublic: true,
      });
      setErrors({});

      // Redirect to dashboard
      // setTimeout(() => {
      //   router.push("/dashboard");
      // }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Upload failed", {
        description:
          "There was an error uploading your file. Please try again.",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="styled-scrollbar relative h-full overflow-y-auto bg-background">
      <main className="mx-auto h-full px-4 py-8">
        <div className="mx-auto h-full max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Upload PDF
            </h1>
            <p className="text-pretty text-muted-foreground">
              Share academic resources with students by uploading PDF documents
              to the library.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="h-full space-y-8">
            {/* File Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Select PDF File
                </CardTitle>
                <CardDescription>
                  Upload a PDF file (max 10MB). Supported format: PDF only.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    {...getRootProps()}
                    className={cn(
                      "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50 border-muted-foreground/25",
                    )}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">
                          {isDragActive
                            ? "Drop your PDF here"
                            : "Drag & drop your PDF here"}
                        </p>
                        <p className="text-muted-foreground">
                          or{" "}
                          <span className="text-primary font-medium">
                            browse files
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        PDF files only, up to 10MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                          <FileText className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {uploadedFile.file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.file.size / (1024 * 1024)).toFixed(
                              2,
                            )}{" "}
                            MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        onClick={removeFile}
                        disabled={isUploading}
                        className="flex items-center justify-center hover:bg-stone-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {errors.file && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.file}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Metadata Section */}
            <Card className="relative">
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
                <CardDescription>
                  Provide details about your PDF to help students find and
                  understand the content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter document title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the content, topics covered, and how students can use this resource..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className={cn(
                      "min-h-[100px]",
                      errors.description ? "border-destructive" : "",
                    )}
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.description.length}/500 characters (minimum 10)
                  </p>
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, subject: value }))
                    }
                  >
                    <SelectTrigger
                      className={errors.subject ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select subject area" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="space-y-3">
                    <Input
                      id="tags"
                      className="rounded-2xl border px-3 py-2 outline-none placeholder:text-sm"
                      placeholder="Add tags (press Enter or comma to add)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagInputKeyDown}
                    />

                    {/* Common Tags */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Common tags:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {commonTags.map((tag) => (
                          <Button
                            key={tag}
                            type="button"
                            size="sm"
                            onClick={() => addTag(tag)}
                            disabled={formData.tags.includes(tag)}
                            className="h-7 border text-xs active:translate-x-1 active:translate-y-1"
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Tags */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} className="gap-1">
                            {tag}
                            <Button
                              type="button"
                              size="icon"
                              className="h-4 w-4 p-0"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Privacy Setting */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <Label htmlFor="privacy">Public Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow all students to view and download this PDF
                    </p>
                  </div>
                  <Switch
                    id="privacy"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isPublic: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {isUploading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(uploadProgress)}%
                      </span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing your PDF...
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={!uploadedFile || isUploading}
                className="flex-1 bg-black text-white hover:cursor-pointer sm:flex-none"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload PDF
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push("/dashboard")}
                disabled={isUploading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

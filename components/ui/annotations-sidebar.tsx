"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Highlighter,
  Trash2,
  Edit3,
  Send,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export function AnnotationsSidebar({
  // pdf,
  annotations,
  selectedAnnotation,
  onAnnotationSelect,
  onAnnotationUpdate,
}: AnnotationsSidebarProps) {
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(
    null,
  );
  const [editContent, setEditContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const { toast } = useToast();

  interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
    replies?: Comment[];
  }

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content:
        "This section on algorithm analysis is really helpful. The examples make it easy to understand Big O notation.",
      author: "Sarah Johnson",
      createdAt: "2024-01-15T10:30:00Z",
      replies: [
        {
          id: "2",
          content:
            "I agree! The visual representations really help clarify the concepts.",
          author: "Mike Chen",
          createdAt: "2024-01-15T11:15:00Z",
        },
      ],
    },
    {
      id: "3",
      content:
        "Could someone explain the difference between O(n) and O(log n) complexity?",
      author: "David Wilson",
      createdAt: "2024-01-15T14:20:00Z",
    },
  ]);

  const handleEditAnnotation = (annotation: Annotation) => {
    setEditingAnnotation(annotation.id);
    setEditContent(annotation.content || annotation.text);
  };

  const handleSaveAnnotation = () => {
    if (editingAnnotation) {
      const updatedAnnotations = annotations.map((ann) =>
        ann.id === editingAnnotation
          ? {
              ...ann,
              content: editContent,
              text: ann.type === "note" ? editContent : ann.text,
            }
          : ann,
      );
      onAnnotationUpdate(updatedAnnotations);
      setEditingAnnotation(null);
      setEditContent("");

      toast({
        title: "Annotation updated",
        description: "Your annotation has been saved.",
      });
    }
  };

  const handleDeleteAnnotation = (id: string) => {
    const updatedAnnotations = annotations.filter((ann) => ann.id !== id);
    onAnnotationUpdate(updatedAnnotations);
    if (selectedAnnotation === id) {
      onAnnotationSelect(null);
    }

    toast({
      title: "Annotation deleted",
      description: "The annotation has been removed.",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        content: newComment,
        author: "Current User",
        createdAt: new Date().toISOString(),
      };

      setComments([...comments, comment]);
      setNewComment("");

      toast({
        title: "Comment added",
        description: "Your comment has been posted.",
      });
    }
  };

  const handleAskAI = async () => {
    if (aiQuestion.trim()) {
      toast({
        title: "AI Response",
        description: `Based on the content, ${aiQuestion.toLowerCase().includes("algorithm") ? "algorithms are step-by-step procedures for solving problems. They can be analyzed using Big O notation to understand their efficiency." : "this appears to be related to computer science fundamentals. The document covers various algorithmic concepts and their practical applications."}`,
      });
      setAiQuestion("");
    }
  };

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="border-b border-sidebar-border p-4">
        <h2 className="font-semibold text-sidebar-foreground">
          Annotations & Discussion
        </h2>
      </div>

      <Tabs defaultValue="annotations" className="flex flex-1 flex-col">
        <TabsList className="mx-4 mt-2 grid w-full grid-cols-3">
          <TabsTrigger value="annotations" className="text-xs">
            <Highlighter className="mr-1 h-3 w-3" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="discussion" className="text-xs">
            <MessageSquare className="mr-1 h-3 w-3" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="annotations" className="mt-2 flex-1">
          <ScrollArea className="h-full px-4">
            <div className="space-y-3">
              {annotations.length === 0 ? (
                <div className="py-8 text-center">
                  <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No annotations yet. Start highlighting text or adding notes
                    to the PDF.
                  </p>
                </div>
              ) : (
                annotations.map((annotation) => (
                  <Card
                    key={annotation.id}
                    className={`cursor-pointer transition-colors ${
                      selectedAnnotation === annotation.id
                        ? "ring-primary ring-2"
                        : ""
                    }`}
                    onClick={() => onAnnotationSelect(annotation.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {annotation.type === "highlight" ? (
                            <Highlighter className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            Page {annotation.page}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAnnotation(annotation);
                            }}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAnnotation(annotation.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {editingAnnotation === annotation.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[60px]"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveAnnotation}>
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingAnnotation(null);
                                setEditContent("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {annotation.type === "highlight" && (
                            <p className="rounded bg-yellow-100 p-2 text-sm italic dark:bg-yellow-900/20">
                              {annotation.text}
                            </p>
                          )}
                          {annotation.content && (
                            <p className="text-sm">{annotation.content}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(
                              new Date(annotation.createdAt),
                              { addSuffix: true },
                            )}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="discussion" className="mt-2 flex-1">
          <div className="flex h-full flex-col">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-xs">
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {comment.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                { addSuffix: true },
                              )}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>

                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="ml-4 flex items-start gap-2 border-l-2 border-muted pl-3"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback className="text-xs">
                                      {reply.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-medium">
                                        {reply.author}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(
                                          new Date(reply.createdAt),
                                          { addSuffix: true },
                                        )}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-xs">
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <Button size="icon" onClick={handleAddComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="mt-2 flex-1">
          <div className="flex h-full flex-col px-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Input
                      placeholder="Ask a question about this document..."
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
                    />
                    <Button size="sm" onClick={handleAskAI} className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ask AI
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Quick Actions:</p>
                    <div className="space-y-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent text-xs"
                        onClick={() => setAiQuestion("Summarize this page")}
                      >
                        Summarize current page
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent text-xs"
                        onClick={() =>
                          setAiQuestion("What are the key concepts?")
                        }
                      >
                        Identify key concepts
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent text-xs"
                        onClick={() =>
                          setAiQuestion("Generate practice questions")
                        }
                      >
                        Generate practice questions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

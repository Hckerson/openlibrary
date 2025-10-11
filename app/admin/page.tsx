"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Search,
  Edit,
  Trash2,
  Download,
  UserCheck,
  UserX,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pdfs, setPdfs] = useState<PDFRecord[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  // Check admin access
  useEffect(() => {
    const user = {
      role: "lecturer",
    };
    if (user && user.role !== "lecturer" && user.role !== "admin") {
      toast.error("Access denied. Admin privileges required.");
      router.push("/dashboard");
      return;
    }
  }, [router]);

  useEffect(() => {
    // Mock data for admin dashboard
    const mockStats: AdminStats = {
      totalUsers: 1247,
      totalPDFs: 3456,
      totalEvents: 89,
      totalGroups: 156,
      monthlyUploads: [
        { month: "Jan", uploads: 245 },
        { month: "Feb", uploads: 312 },
        { month: "Mar", uploads: 289 },
        { month: "Apr", uploads: 367 },
        { month: "May", uploads: 423 },
        { month: "Jun", uploads: 398 },
      ],
      userRoles: [
        { role: "Students", count: 1089, color: "#3b82f6" },
        { role: "Lecturers", count: 145, color: "#10b981" },
        { role: "Admins", count: 13, color: "#f59e0b" },
      ],
    };

    const mockPDFs: PDFRecord[] = [
      {
        id: "1",
        title: "Advanced Calculus Textbook",
        subject: "Mathematics",
        uploadedBy: "Dr. Adebayo",
        uploadedAt: "2024-02-15",
        downloads: 234,
        status: "active",
      },
      {
        id: "2",
        title: "Computer Science Fundamentals",
        subject: "Computer Science",
        uploadedBy: "Prof. Okafor",
        uploadedAt: "2024-02-10",
        downloads: 189,
        status: "active",
      },
      {
        id: "3",
        title: "Physics Laboratory Manual",
        subject: "Physics",
        uploadedBy: "Dr. Emeka",
        uploadedAt: "2024-02-08",
        downloads: 156,
        status: "flagged",
      },
      {
        id: "4",
        title: "Organic Chemistry Notes",
        subject: "Chemistry",
        uploadedBy: "Prof. Ngozi",
        uploadedAt: "2024-02-05",
        downloads: 298,
        status: "active",
      },
    ];

    const mockUsers: UserRecord[] = [
      {
        id: "1",
        name: "Chioma Okwu",
        email: "chioma.okwu@university.edu.ng",
        role: "student",
        department: "Computer Science",
        joinedAt: "2024-01-15",
        status: "active",
        totalUploads: 5,
      },
      {
        id: "2",
        name: "Dr. Adebayo",
        email: "adebayo@university.edu.ng",
        role: "lecturer",
        department: "Mathematics",
        joinedAt: "2023-09-01",
        status: "active",
        totalUploads: 23,
      },
      {
        id: "3",
        name: "Ibrahim Hassan",
        email: "ibrahim.hassan@university.edu.ng",
        role: "student",
        department: "Engineering",
        joinedAt: "2024-01-20",
        status: "active",
        totalUploads: 2,
      },
      {
        id: "4",
        name: "Funmi Adebisi",
        email: "funmi.adebisi@university.edu.ng",
        role: "student",
        department: "Physics",
        joinedAt: "2024-02-01",
        status: "suspended",
        totalUploads: 0,
      },
    ];

    setTimeout(() => {
      setStats(mockStats);
      setPdfs(mockPDFs);
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPDFs = pdfs.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(userSearchTerm.toLowerCase()),
  );

  const handleDeletePDF = (pdfId: string) => {
    setPdfs((prev) => prev.filter((pdf) => pdf.id !== pdfId));
    toast.success("PDF deleted successfully");
  };

  const handleUpdateUserRole = (
    userId: string,
    newRole: "student" | "lecturer" | "admin",
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
    toast.success("User role updated successfully");
  };

  const handleUpdateUserStatus = (
    userId: string,
    newStatus: "active" | "suspended" | "banned",
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
    toast.success("User status updated successfully");
  };

  const handleDownloadReport = (reportType: string) => {
    // Mock CSV download
    const csvContent =
      "data:text/csv;charset=utf-8,Name,Email,Role,Department,Status\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${reportType} report downloaded`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
            <Shield className="h-8 w-8" />
            Admin Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage users, content, and platform analytics
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PDFs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalPDFs.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Groups</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGroups}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Uploads</CardTitle>
            <CardDescription>
              PDF uploads over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyUploads}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uploads" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.userRoles}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, count }) => `${role}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.userRoles.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="pdfs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pdfs">Manage PDFs</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* PDFs Management */}
        <TabsContent value="pdfs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PDF Management</CardTitle>
              <CardDescription>
                View, edit, and manage all PDF uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    placeholder="Search PDFs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPDFs.map((pdf) => (
                      <TableRow key={pdf.id}>
                        <TableCell className="font-medium">
                          {pdf.title}
                        </TableCell>
                        <TableCell>{pdf.subject}</TableCell>
                        <TableCell>{pdf.uploadedBy}</TableCell>
                        <TableCell>
                          {new Date(pdf.uploadedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{pdf.downloads}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              pdf.status === "active"
                                ? "default"
                                : pdf.status === "flagged"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {pdf.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete PDF</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete {pdf.title}{" "}
                                    ? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeletePDF(pdf.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Uploads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Select
                            value={user.role}
                            onValueChange={(
                              value: "student" | "lecturer" | "admin",
                            ) => handleUpdateUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="lecturer">Lecturer</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{user.totalUploads}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "suspended"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {user.status === "active" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleUpdateUserStatus(user.id, "suspended")
                                }
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleUpdateUserStatus(user.id, "active")
                                }
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUpdateUserStatus(user.id, "banned")
                              }
                            >
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                Download detailed reports and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Report</CardTitle>
                    <CardDescription>
                      Complete user database with activity metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleDownloadReport("users")}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PDF Usage Report</CardTitle>
                    <CardDescription>
                      PDF downloads and engagement statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleDownloadReport("pdf_usage")}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Events Report</CardTitle>
                    <CardDescription>
                      Event attendance and participation data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleDownloadReport("events")}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

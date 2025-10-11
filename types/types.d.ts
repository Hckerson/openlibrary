

interface InitialState {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    rememberMe?: string[];
  };
}

interface PDF {
  id: string;
  title: string;
  authors: string[];
  description: string;
  subject: string;
  tags: string[];
  uploadDate: string;
  uploader: string;
  progress: number;
  thumbnail: string;
  fileSize: string;
  downloads: number;
  likes: number;
  isPublic: boolean;
}

interface PDFCardProps {
  pdf: PDF;
}

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  subject: string;
  tags: string[];
  uploadDate: string;
  uploader: string;
  fileUrl: string;
  fileSize: string;
  downloads: number;
  likes: number;
  pages: number;
}

interface Annotation {
  id: string;
  type: "highlight" | "note";
  page: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text: string;
  content?: string;
  createdAt: string;
  author: string;
}

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  subject: string;
  tags: string[];
  uploadDate: string;
  uploader: string;
  fileUrl: string;
  fileSize: string;
  downloads: number;
  likes: number;
  pages: number;
}

interface AnnotationsSidebarProps {
  pdf: PDFDocument;
  annotations: Annotation[];
  selectedAnnotation: string | null;
  onAnnotationSelect: (id: string | null) => void;
  onAnnotationUpdate: (annotations: Annotation[]) => void;
}

interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  scale: number;
  onPageChange: (page: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFullscreen: () => void;
  onDownload: () => void;
  onShare: () => void;
  isFullscreen: boolean;
}

interface Annotation {
  id: string;
  type: "highlight" | "note";
  page: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text: string;
  content?: string;
  createdAt: string;
  author: string;
}

interface PDFViewerProps {
  fileUrl: string;
  currentPage: number;
  scale: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange: (total: number) => void;
  annotations: Annotation[];
  onAnnotationAdd: (annotations: Annotation[]) => void;
  selectedAnnotation: string | null;
  onAnnotationSelect: (id: string | null) => void;
}

interface PDFDocument {
  id: string;
  title: string;
  description: string;
  subject: string;
  tags: string[];
  uploadDate: string;
  uploader: string;
  fileUrl: string;
  fileSize: string;
  downloads: number;
  likes: number;
  pages: number;
}

interface PDFSidebarProps {
  pdf: PDFDocument;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface ChartData {
  month: string;
  averageReadingTime: number;
  downloads: number;
  searchQueries: number;
}

interface Payload {
  averageReadingTime: number
  downloads: number
  month: string;
  searchQueries: number
}


interface AdminStats {
  totalUsers: number
  totalPDFs: number
  totalEvents: number
  totalGroups: number
  monthlyUploads: { month: string; uploads: number }[]
  userRoles: { role: string; count: number; color: string }[]
}

interface PDFRecord {
  id: string
  title: string
  subject: string
  uploadedBy: string
  uploadedAt: string
  downloads: number
  status: "active" | "flagged" | "removed"
}

interface UserRecord {
  id: string
  name: string
  email: string
  role: "student" | "lecturer" | "admin"
  department: string
  joinedAt: string
  status: "active" | "suspended" | "banned"
  totalUploads: number
}

interface FeedData {
  link: string;
  time: string;
  src: string;
  name: string;
  role: string;
  action: string;
}




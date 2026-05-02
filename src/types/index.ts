// ─────────────────────────────────────────────────────────────
//  Global types — extend as needed per project
// ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface DashboardDto {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
  newSellers: number;
  recentOrders: RecentOrderDto[];
  recentSellers: RecentSellerDto[];
}

export interface RecentOrderDto {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: string;
}

export interface RecentSellerDto {
  name: string;
  storeName: string;
}

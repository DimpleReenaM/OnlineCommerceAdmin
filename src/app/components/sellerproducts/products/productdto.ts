export interface MyProduct {
    id: number;
    name: string;
    originalPrice: number;
    stockQuantity: string;
    discountPercentage?: number;
    discountAmount?: number;
    newPrice?: number;
    category: { id: number; name: string }; // important
    brand: { id: number; name: string };     // important
    description?: string;
    createdBy: number;
    isDeleted: boolean; // ✅ Add this
    thumbnail: {imageUrl:string}; // ✅ Add this line
  }
  

  export interface MyBrand {
    id: number;
    name: string;
    imageId?: number;
  }
  export interface MyCategory {
    id: number;
    name: string;
    imageId?: number;
  }
  
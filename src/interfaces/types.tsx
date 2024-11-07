

export interface ICartItem {
    id: number;
    productName: string;
    price: number;
    count: number;
  }

export interface ICartContext {
    items: ICartItem[]
    totalAmount?: number;
    addItem?: (item: ICartItem) => void;
    removeItem?: (id: number) => void;
    updateQuantity?: (id: number, quanity: number) => void;
    clearCart?: () => void; 
}


  // creating a union
  export type CartContextType = ICartContext | undefined;
 


  export type ICart = ICartItem[];
  
  export interface ICartProviderProp {
    children: React.ReactNode;
  }
  
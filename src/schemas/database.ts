export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      areas: {
        Row: {
          created_at: string
          id: string
          name: string
          restaurant_id: string
          status: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          restaurant_id: string
          status?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          restaurant_id?: string
          status?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "areas_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          restaurant_id: string
          status: boolean
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          restaurant_id: string
          status?: boolean
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          restaurant_id?: string
          status?: boolean
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      combos: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
          price: number
          restaurant_id: string
          status: boolean
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          name: string
          price?: number
          restaurant_id: string
          status?: boolean
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          price?: number
          restaurant_id?: string
          status?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "combos_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combos_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          area_id: string
          category_id: string
          created_at: string
          id: string
          name: string
          price: number
          restaurant_id: string
          status: boolean
        }
        Insert: {
          area_id: string
          category_id: string
          created_at?: string
          id?: string
          name: string
          price?: number
          restaurant_id: string
          status?: boolean
        }
        Update: {
          area_id?: string
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          price?: number
          restaurant_id?: string
          status?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "products_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          language: string
          name: string
        }
        Insert: {
          created_at?: string
          id: string
          language: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          amount: number
          base_id: string
          base_type: string
          created_at: string
          id: string
          ingredient_id: string
          ingredient_type: string
        }
        Insert: {
          amount?: number
          base_id: string
          base_type: string
          created_at?: string
          id?: string
          ingredient_id: string
          ingredient_type: string
        }
        Update: {
          amount?: number
          base_id?: string
          base_type?: string
          created_at?: string
          id?: string
          ingredient_id?: string
          ingredient_type?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          created_at: string
          currency_code: string
          id: string
          name: string
          purchase_tax: number
          sales_tax: number
          status: boolean
        }
        Insert: {
          created_at?: string
          currency_code: string
          id?: string
          name: string
          purchase_tax: number
          sales_tax: number
          status?: boolean
        }
        Update: {
          created_at?: string
          currency_code?: string
          id?: string
          name?: string
          purchase_tax?: number
          sales_tax?: number
          status?: boolean
        }
        Relationships: []
      }
      subproducts: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
          restaurant_id: string
          status: boolean
          um: string
          yield: number
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          name: string
          restaurant_id: string
          status?: boolean
          um: string
          yield?: number
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          restaurant_id?: string
          status?: boolean
          um?: string
          yield?: number
        }
        Relationships: [
          {
            foreignKeyName: "subproducts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subproducts_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      supplies: {
        Row: {
          category_id: string
          created_at: string
          equivalence_amount: number | null
          equivalence_um: string | null
          has_equivalence: boolean
          id: string
          name: string
          price: number
          restaurant_id: string
          status: boolean
          taxable: boolean
          um: string
          waste: number
        }
        Insert: {
          category_id: string
          created_at?: string
          equivalence_amount?: number | null
          equivalence_um?: string | null
          has_equivalence?: boolean
          id?: string
          name: string
          price?: number
          restaurant_id: string
          status?: boolean
          taxable?: boolean
          um: string
          waste?: number
        }
        Update: {
          category_id?: string
          created_at?: string
          equivalence_amount?: number | null
          equivalence_um?: string | null
          has_equivalence?: boolean
          id?: string
          name?: string
          price?: number
          restaurant_id?: string
          status?: boolean
          taxable?: boolean
          um?: string
          waste?: number
        }
        Relationships: [
          {
            foreignKeyName: "supplies_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplies_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          restaurant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          restaurant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          restaurant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

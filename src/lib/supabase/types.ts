export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          hero_eyebrow: string;
          hero_title_html: string;
          hero_subtitle: string;
          hero_cta_label: string;
          hero_cta_href: string;
          hero_slider_image_1: string;
          hero_slider_image_2: string;
          hero_slider_image_3: string;
          logo_white_url: string;
          logo_dark_url: string;
          about_title: string;
          about_body_html: string;
          about_image_url: string;
          about_signature: string;
          tour_eyebrow: string;
          tour_title_html: string;
          trainers_eyebrow: string;
          trainers_title_html: string;
          trainers_subtitle: string;
          trainers_footnote: string;
          programs_eyebrow: string;
          programs_title_html: string;
          membership_preview_eyebrow: string;
          membership_preview_number: string;
          membership_preview_max_label: string;
          membership_preview_title_html: string;
          membership_preview_body: string;
          membership_preview_bg_image_url: string;
          membership_preview_cta_label: string;
          membership_preview_cta_href: string;
          pricing_title_html: string;
          pricing_tagline: string;
          pricing_cta_label: string;
          pricing_addon_footnote: string;
          contact_eyebrow: string;
          contact_title_html: string;
          contact_body: string;
          contact_email: string;
          contact_phone: string;
          address: string;
          company_name: string;
          company_cui: string;
          company_registry: string;
          company_address: string;
          closing_eyebrow: string;
          closing_title_html: string;
          closing_button_label: string;
          closing_button_href: string;
          footer_tagline: string;
          legal_license_html: string;
          legal_license_approved: boolean;
          legal_privacy_html: string;
          legal_privacy_approved: boolean;
          legal_cookies_html: string;
          legal_cookies_approved: boolean;
          instagram_url: string;
          facebook_url: string;
          linkedin_url: string;
          app_ios_url: string | null;
          app_android_url: string | null;
          show_testimonials: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_eyebrow?: string;
          hero_title_html?: string;
          hero_subtitle?: string;
          hero_cta_label?: string;
          hero_cta_href?: string;
          hero_slider_image_1?: string;
          hero_slider_image_2?: string;
          hero_slider_image_3?: string;
          logo_white_url?: string;
          logo_dark_url?: string;
          about_title?: string;
          about_body_html?: string;
          about_image_url?: string;
          about_signature?: string;
          tour_eyebrow?: string;
          tour_title_html?: string;
          trainers_eyebrow?: string;
          trainers_title_html?: string;
          trainers_subtitle?: string;
          trainers_footnote?: string;
          programs_eyebrow?: string;
          programs_title_html?: string;
          membership_preview_eyebrow?: string;
          membership_preview_number?: string;
          membership_preview_max_label?: string;
          membership_preview_title_html?: string;
          membership_preview_body?: string;
          membership_preview_bg_image_url?: string;
          membership_preview_cta_label?: string;
          membership_preview_cta_href?: string;
          pricing_title_html?: string;
          pricing_tagline?: string;
          pricing_cta_label?: string;
          pricing_addon_footnote?: string;
          contact_eyebrow?: string;
          contact_title_html?: string;
          contact_body?: string;
          contact_email?: string;
          contact_phone?: string;
          address?: string;
          company_name?: string;
          company_cui?: string;
          company_registry?: string;
          company_address?: string;
          closing_eyebrow?: string;
          closing_title_html?: string;
          closing_button_label?: string;
          closing_button_href?: string;
          footer_tagline?: string;
          legal_license_html?: string;
          legal_license_approved?: boolean;
          legal_privacy_html?: string;
          legal_privacy_approved?: boolean;
          legal_cookies_html?: string;
          legal_cookies_approved?: boolean;
          instagram_url?: string;
          facebook_url?: string;
          linkedin_url?: string;
          app_ios_url?: string | null;
          app_android_url?: string | null;
          show_testimonials?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hero_eyebrow?: string;
          hero_title_html?: string;
          hero_subtitle?: string;
          hero_cta_label?: string;
          hero_cta_href?: string;
          hero_slider_image_1?: string;
          hero_slider_image_2?: string;
          hero_slider_image_3?: string;
          logo_white_url?: string;
          logo_dark_url?: string;
          about_title?: string;
          about_body_html?: string;
          about_image_url?: string;
          about_signature?: string;
          tour_eyebrow?: string;
          tour_title_html?: string;
          trainers_eyebrow?: string;
          trainers_title_html?: string;
          trainers_subtitle?: string;
          trainers_footnote?: string;
          programs_eyebrow?: string;
          programs_title_html?: string;
          membership_preview_eyebrow?: string;
          membership_preview_number?: string;
          membership_preview_max_label?: string;
          membership_preview_title_html?: string;
          membership_preview_body?: string;
          membership_preview_bg_image_url?: string;
          membership_preview_cta_label?: string;
          membership_preview_cta_href?: string;
          pricing_title_html?: string;
          pricing_tagline?: string;
          pricing_cta_label?: string;
          pricing_addon_footnote?: string;
          contact_eyebrow?: string;
          contact_title_html?: string;
          contact_body?: string;
          contact_email?: string;
          contact_phone?: string;
          address?: string;
          company_name?: string;
          company_cui?: string;
          company_registry?: string;
          company_address?: string;
          closing_eyebrow?: string;
          closing_title_html?: string;
          closing_button_label?: string;
          closing_button_href?: string;
          footer_tagline?: string;
          legal_license_html?: string;
          legal_license_approved?: boolean;
          legal_privacy_html?: string;
          legal_privacy_approved?: boolean;
          legal_cookies_html?: string;
          legal_cookies_approved?: boolean;
          instagram_url?: string;
          facebook_url?: string;
          linkedin_url?: string;
          app_ios_url?: string | null;
          app_android_url?: string | null;
          show_testimonials?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          photo_url: string | null;
          years_experience: number;
          short_bio: string;
          long_bio: string;
          experience_items: string[];
          order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          photo_url?: string | null;
          years_experience?: number;
          short_bio?: string;
          long_bio?: string;
          experience_items?: string[];
          order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          photo_url?: string | null;
          years_experience?: number;
          short_bio?: string;
          long_bio?: string;
          experience_items?: string[];
          order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_role: string;
          photo_url: string | null;
          quote: string;
          rating: number | null;
          order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_name: string;
          author_role?: string;
          photo_url?: string | null;
          quote: string;
          rating?: number | null;
          order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_name?: string;
          author_role?: string;
          photo_url?: string | null;
          quote?: string;
          rating?: number | null;
          order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      memberships: {
        Row: {
          id: string;
          name: string;
          price_ron: number;
          period: string;
          features: string[];
          addon_name: string | null;
          addon_features: string[];
          addon_discount_percent: number | null;
          addon_price_ron: number | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price_ron: number;
          period?: string;
          features?: string[];
          addon_name?: string | null;
          addon_features?: string[];
          addon_discount_percent?: number | null;
          addon_price_ron?: number | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price_ron?: number;
          period?: string;
          features?: string[];
          addon_name?: string | null;
          addon_features?: string[];
          addon_discount_percent?: number | null;
          addon_price_ron?: number | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tour_tiles: {
        Row: {
          id: string;
          image_url: string | null;
          eyebrow: string;
          title: string;
          span_class: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url?: string | null;
          eyebrow?: string;
          title?: string;
          span_class?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string | null;
          eyebrow?: string;
          title?: string;
          span_class?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          id: string;
          num: string;
          title: string;
          body: string;
          photo_url: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          num?: string;
          title?: string;
          body?: string;
          photo_url?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          num?: string;
          title?: string;
          body?: string;
          photo_url?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          handled: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          handled?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          handled?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience aliases
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Membership = Database["public"]["Tables"]["memberships"]["Row"];
export type TourTile = Database["public"]["Tables"]["tour_tiles"]["Row"];
export type Program = Database["public"]["Tables"]["programs"]["Row"];
export type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];

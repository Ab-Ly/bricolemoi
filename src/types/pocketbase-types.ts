/**
 * Ce fichier a été généré automatiquement par pocketbase-typegen / scripts/generate-types.js
 * standard BricoleMoi (PocketBase 15 chars ID natif)
 */

export interface BaseRecord {
  id: string; // Identifiant natif PocketBase (exactement 15 caractères alphanumériques)
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

export interface ProfilesRecord extends BaseRecord {
  avatar_url?: string;
  city_zone?: string;
  created_at_original?: string;
  credits?: number;
  district?: string;
  full_name?: string;
  is_suspended?: boolean;
  phone?: string;
  pin_hash?: string;
  role?: string;
  updated_at_original?: string;
  uuid?: string;
}

export interface MaalemDetailsRecord extends BaseRecord {
  bio?: string;
  cin_number?: string;
  cin_photo_recto_url?: string;
  cin_photo_url?: string;
  cin_photo_verso_url?: string;
  cin_rejection_reason?: string;
  cin_verified?: boolean;
  consecutive_five_stars?: number;
  created_at_original?: string;
  credit_balance?: number;
  hundred_dh_recharges_count?: number;
  is_available?: boolean;
  is_online?: boolean;
  is_verified?: boolean;
  last_seen_at?: string;
  lat?: number;
  lng?: number;
  portfolio_urls?: any[];
  rating_avg?: number;
  specialties?: any;
  specialty?: string;
  status?: string;
  total_reviews?: number;
  uuid?: string;
}

export interface InterventionsRecord extends BaseRecord {
  accepted_at?: string;
  audio_note_url?: string;
  badges?: any;
  client_id?: string;
  client_name?: string;
  client_phone?: string;
  comment?: string;
  completed_at?: string;
  cost_lead?: number;
  created_at_original?: string;
  devis_confirmed?: boolean;
  district?: string;
  escrow_status?: string;
  estimated_price_max?: number;
  estimated_price_min?: number;
  final_agreed_price?: number;
  lat?: number;
  lng?: number;
  location_address?: string;
  maalem_id?: string;
  maalem_name?: string;
  maalem_phone?: string;
  photos_list?: any;
  progress_step?: string;
  rating?: number;
  service_type?: string;
  status?: string;
  subcategory?: string;
  unfeasible_reason?: string;
  unreachable_reason?: string;
  urgency_level?: string;
  uuid?: string;
}

export interface TransactionsRecord extends BaseRecord {
  admin_notes?: string;
  amount_dh?: number;
  created_at_original?: string;
  maalem_id?: string;
  payment_method?: string;
  receipt_photo_url?: string;
  receipt_url?: string;
  reconciled_at?: string;
  reference_ref?: string;
  status?: string;
  type?: string;
  uuid?: string;
}

export interface ReviewsRecord extends BaseRecord {
  badges?: any;
  client_id?: string;
  client_name?: string;
  comment?: string;
  created_at_original?: string;
  intervention_id?: string;
  maalem_id?: string;
  rating?: number;
  uuid?: string;
}

export interface AdminNotificationsRecord extends BaseRecord {
  created_at_original?: string;
  message?: string;
  read?: boolean;
  target_id?: string;
  title?: string;
  type?: string;
  uuid?: string;
}

export type Collections = {
  profiles: ProfilesRecord;
  maalem_details: MaalemDetailsRecord;
  interventions: InterventionsRecord;
  transactions: TransactionsRecord;
  reviews: ReviewsRecord;
  admin_notifications: AdminNotificationsRecord;
};

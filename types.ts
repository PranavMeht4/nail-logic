import { LucideIcon } from 'lucide-react';

export interface SocialLinkProps {
  label: string;
  url: string;
  icon: LucideIcon;
  colorClass: string;
  description?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

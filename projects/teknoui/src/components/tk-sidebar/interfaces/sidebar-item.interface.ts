import { TkIconName } from '../../tk-icon';

export interface SidebarItem {

    id: string;

    label: string;

    /** Shown when the sidebar is collapsed (the label is shown when expanded). */
    icon?: TkIconName;
  
    route?: string;
  
    fragment?: string;
  
    external?: boolean;
  
    target?: '_self' | '_blank';
  
    disabled?: boolean;
  
    selected?: boolean;
  
    badge?: string;
  
    children?: SidebarItem[];
  
  }
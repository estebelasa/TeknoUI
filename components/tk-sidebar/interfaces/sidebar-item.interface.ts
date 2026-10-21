export interface SidebarItem {

    id: string;
  
    label: string;
  
    icon?: string;
  
    route?: string;
  
    fragment?: string;
  
    external?: boolean;
  
    target?: '_self' | '_blank';
  
    disabled?: boolean;
  
    selected?: boolean;
  
    badge?: string;
  
    children?: SidebarItem[];
  
  }
import { SidebarConfig } from '../interfaces';

export const DEFAULT_SIDEBAR_CONFIG: SidebarConfig = {

  width: 320,

  collapsedWidth: 80,

  position: 'left',

  mode: 'fixed',

  size: 'md',

  collapsible: true,

  collapsed: false,

  showHeader: true,

  showProfile: true,

  showFooter: true,

  animation: true,

  animationDuration: 250

};

export const SIDEBAR_ANIMATION_EASING = 'ease-in-out';

export const SIDEBAR_MIN_WIDTH = 240;

export const SIDEBAR_MAX_WIDTH = 420;
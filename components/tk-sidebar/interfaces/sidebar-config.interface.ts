import {
    SidebarMode,
    SidebarPosition,
    SidebarSize
} from '../types';

export interface SidebarConfig {

    width: number;

    collapsedWidth: number;

    size: SidebarSize;

    position: SidebarPosition;

    mode: SidebarMode;

    collapsible: boolean;

    collapsed: boolean;

    animation: boolean;

    animationDuration: number;

    showHeader: boolean;

    showProfile: boolean;

    showFooter: boolean;

}
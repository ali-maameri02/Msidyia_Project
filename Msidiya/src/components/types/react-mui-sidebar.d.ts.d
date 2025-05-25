declare module 'react-mui-sidebar' {
  import * as React from 'react';

  export interface SidebarProps {
    width?: string;
    textColor?: string;
    isCollapse?: boolean;
    themeColor?: string;
    themeSecondaryColor?: string;
    mode?: 'light' | 'dark';
    direction?: 'ltr' | 'rtl';
    userName?: string;
    designation?: string;
    showProfile?: boolean;
    userimg?: string;
    [key: string]: any;
  }

  export interface MenuProps {
    subHeading?: string;
    [key: string]: any;
  }

  export interface SubmenuProps {
    title: string;
    icon?: React.ReactNode;
    borderRadius?: string;
    textFontSize?: string;
    disabled?: boolean;
    [key: string]: any;
  }

  export interface MenuItemProps {
    icon?: React.ReactNode;
    link?: string;
    badge?: boolean;
    badgeColor?: string;
    badgeContent?: string;
    textFontSize?: string;
    borderRadius?: string;
    disabled?: boolean;
    badgeType?: 'filled' | 'outlined';
    target?: string;
    [key: string]: any;
  }

  export interface LogoProps {
    img: string;
    [key: string]: any;
  }

  export const Sidebar: React.FC<SidebarProps>;
  export const Menu: React.FC<MenuProps>;
  export const MenuItem: React.FC<MenuItemProps>;
  export const Submenu: React.FC<SubmenuProps>;
  export const Logo: React.FC<LogoProps>;
}

// components/Layout.tsx
'use client';

import TopNav from "./TopNavbar";
import BottomNav from "./BottomNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
        {children}
      <BottomNav />
    </>
  );
}

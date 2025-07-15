import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import { AppProviders } from "@/components/providers/AppProvider";
import SidebarDesktop from "@/components/SidebarDesktop";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className="flex h-screen">
        <SidebarDesktop />
        <div className="flex flex-col flex-1 min-h-screen">
          <header className="flex items-center justify-between px-6 py-4 h-[60px] border-b-2 ">
            <BreadcrumbHeader />
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          <div className="overflow-auto">
            <div className="flex-1 container py-4 text-accent-foreground">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AppProviders>
  );
}

export default layout;

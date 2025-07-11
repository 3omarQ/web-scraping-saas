import { AppProviders } from "@/components/providers/AppProvider";
import { Separator } from "@/components/ui/separator";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <div className="flex flex-col w-full h-screen">
        {children}
        {/* <Separator/>
          <footer className='flex items-center justify-between p-2'></footer> */}
      </div>
    </AppProviders>
  );
}

export default layout;

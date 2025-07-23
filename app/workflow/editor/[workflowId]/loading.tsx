import { Loader2Icon } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2Icon
        size={50}
        className="animate-spin stroke-primary"
      ></Loader2Icon>
    </div>
  );
}

export default loading;

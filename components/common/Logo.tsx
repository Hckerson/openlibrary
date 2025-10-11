import { PenTool } from "lucide-react";

export function Logo() {
  return (
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="from-primary to-primary/80 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
            <PenTool className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-blue-400"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl leading-none font-bold text-muted-foreground">
            Openlibrary
          </span>
          <span className="text-xs leading-none text-muted-foreground">
            Professional bookeeping
          </span>
        </div>
      </div>
  );
}

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onCreateUser: () => void;
}

export default function AdminHeader({ onCreateUser }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b pb-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          A
        </div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            User Governance
          </h1>
          <p className="text-xs text-muted-foreground">Administrator Console</p>
        </div>
      </div>

      {/* Right Section */}
      <Button onClick={onCreateUser} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Account
      </Button>
    </header>
  );
}

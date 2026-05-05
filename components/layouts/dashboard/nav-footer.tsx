"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const NavSettings = () => {
  const { state } = useSidebar();

  const user = {
    name: "Ojo Adeshola",
    email: "adeshola@payaza.com",
  };

  const handleLogout = () => {
    // replace with real logout logic
    console.log("logout");
  };

  if (state === "collapsed") {
    return (
      <div className="flex flex-col items-center gap-3 p-2">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
          OA
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full p-4 bg-muted/50 border-white/10 space-y-4">
      
      {/* USER INFO */}
      <div className="space-y-1">
        <h1 className="font-medium text-sm">{user.name}</h1>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>

      {/* STATUS BADGE */}
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <p className="text-xs text-muted-foreground">Active Account</p>
      </div>

      {/* ACTIONS */}
      <div className="pt-2 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </Card>
  );
};

export default NavSettings;
"use client";
import {File  } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";


const Navsettings = () => {
  const { state } = useSidebar();


  if (state == "collapsed") {
    return (
      <div className="p-1">
        <File className="text-muted-foreground" />
      </div>
    );
  }
  return (
    <Card className="w-full flex flex-col justify-between p-4 bg-muted min-h-[8rem]" >
      <div className="pt-4 space-y-2">
        <h1 className="font-medium">Ojo Adeshola</h1>
      </div>
    </Card>
  );
};

export default Navsettings;

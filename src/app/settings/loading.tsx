import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader>
          <Skeleton className="w-full h-[300px]" />
        </CardHeader>
      </Card>
    </div>
  );
};

export default loading;

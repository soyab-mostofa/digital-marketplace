import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
  return (
    <section className="mt-10 mx-auto px-4 max-w-7xl sm:px-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="col-span-1">
          <Skeleton className="h-[300px] lg:h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full mt-10" />
        </div>
        <div className="col-span-1 mt-10">
          <Skeleton className="h-[300px] lg:h-[400px] w-full" />
        </div>
      </div>
    </section>
  );
}

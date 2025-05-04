import { Skeleton } from "./ui/skeleton";

const SkeletonList = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between px-8 items-center gap-4 my-4 ml-2">
        <div className="flex gap-2">
          <Skeleton className="w-64 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
        <Skeleton className="w-60 h-10" />
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8">
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
      </div>
    </div>
  );
};
export default SkeletonList;

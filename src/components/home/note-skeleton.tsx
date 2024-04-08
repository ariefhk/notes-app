import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const NoteSkeleton = () => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index: number) => {
        return (
          <Card key={index + 1}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[100px] h-[30px]" />
              </CardTitle>
              {/* not using Card Desc because hydration error :) */}
              <div>
                <Skeleton className="w-[80%] h-[20px]" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-[50px]" />
            </CardContent>
            <CardFooter className="gap-2 justify-end">
              <Skeleton className="w-[70px] h-[40px]" />
              <Skeleton className="w-[70px] h-[40px]" />
              <Skeleton className="w-[70px] h-[40px]" />
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default NoteSkeleton;

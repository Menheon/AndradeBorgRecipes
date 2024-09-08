export const RecipeItemSkeleton = () => {
  return (
    <div className="flex h-[460px] flex-col items-center rounded-xl border-2 border-brown-600 bg-grey-200 shadow-lg  md:h-[525px] lg:h-[560px] xl:h-[525px]">
      <div className="h-56  w-full animate-pulse rounded-t-lg border-b-2 border-brown-600 bg-grey-600 object-cover md:h-64" />
      <div className="mt-3 flex w-full flex-1 animate-pulse gap-1 px-10">
        <div className="h-8 w-7/12 rounded-full bg-grey-600" />
        <div className="h-8 w-5/12 rounded-full bg-grey-600" />
      </div>
      <div className="w-full flex-1">
        <div className="mt-8 flex w-full animate-pulse gap-2 px-4">
          <div className="h-4 w-2/3 rounded-full bg-grey-600" />
          <div className="h-4 w-1/3 rounded-full bg-grey-600" />
        </div>
        <div className="mt-3 flex w-full animate-pulse gap-2 px-4">
          <div className="h-4 w-3/12 rounded-full bg-grey-600" />
          <div className="h-4 w-9/12 rounded-full bg-grey-600" />
        </div>
        <div className="mb-3 mt-2 flex w-full animate-pulse gap-2 px-4">
          <div className="h-4 w-1/4 rounded-full bg-grey-600" />
          <div className="h-4 w-3/4 rounded-full bg-grey-600" />
        </div>
        <div className="mb-3 mt-2 hidden w-full animate-pulse gap-2 px-4 md:flex">
          <div className="h-4 w-1/4 rounded-full bg-grey-600" />
          <div className="h-4 w-3/4 rounded-full bg-grey-600" />
        </div>
      </div>
      <div className="mb-4 flex w-full animate-pulse gap-1 px-4">
        <div className="h-8 w-16 rounded-md bg-grey-600" />
        <div className="h-8 w-16 rounded-md bg-grey-600" />
      </div>
    </div>
  );
};

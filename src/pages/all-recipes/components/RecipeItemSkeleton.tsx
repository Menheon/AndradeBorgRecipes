export const RecipeItemSkeleton = () => {
  return (
    <div className="shadow-card flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white md:min-h-[460px]">
      {/* Image placeholder */}
      <div className="h-48 w-full animate-pulse bg-neutral-200 md:h-56" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title placeholder */}
        <div className="mb-3 flex animate-pulse gap-2">
          <div className="h-8 w-3/5 rounded-full bg-neutral-200" />
          <div className="h-8 w-2/5 rounded-full bg-neutral-200" />
        </div>

        {/* Description placeholder */}
        <div className="mb-4 flex-1 space-y-2">
          <div className="flex animate-pulse gap-2">
            <div className="h-4 w-2/3 rounded-full bg-neutral-200" />
            <div className="h-4 w-1/3 rounded-full bg-neutral-200" />
          </div>
          <div className="flex animate-pulse gap-2">
            <div className="h-4 w-1/4 rounded-full bg-neutral-200" />
            <div className="h-4 w-3/4 rounded-full bg-neutral-200" />
          </div>
          <div className="flex animate-pulse gap-2">
            <div className="h-4 w-1/2 rounded-full bg-neutral-200" />
            <div className="h-4 w-1/2 rounded-full bg-neutral-200" />
          </div>
        </div>

        {/* Tags placeholder */}
        <div className="mt-auto flex animate-pulse gap-2">
          <div className="h-7 w-16 rounded-full bg-neutral-200" />
          <div className="h-7 w-20 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

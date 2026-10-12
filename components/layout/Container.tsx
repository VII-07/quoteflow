import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 lg:px-8 xl:px-18",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

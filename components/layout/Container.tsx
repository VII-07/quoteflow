import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        "max-w-8xl mx-auto w-full px-4 lg:px-8 xl:px-18",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;

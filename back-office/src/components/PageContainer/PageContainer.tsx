import { IPageContainer } from "./PageContainer.types";

interface IPageContainerProps extends IPageContainer {
  className?: string;
}

export const PageContainer = ({ children, className }: IPageContainerProps) => {
  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-soft-gradient ${
        className || ""
      }`}
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/back.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

import { IPageTitle } from "./PageTitle.types";

export const PageTitle = ({ children }: IPageTitle) => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold mb-3 text-primary tracking-wide">
        {children}
      </h2>
    </div>
  );
};

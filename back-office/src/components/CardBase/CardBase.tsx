import { Card } from "../ui/card";
import { ICardBase } from "./CardBase.types";

export const CardBase = ({ children, className }: ICardBase) => {
  return (
    <Card
      className={`w-full max-w-md bg-white/20 backdrop-blur border border-white/20 shadow-xl gap-0 m-0 p-0 ${
        className || ""
      }`}
    >
      {children}
    </Card>
  );
};

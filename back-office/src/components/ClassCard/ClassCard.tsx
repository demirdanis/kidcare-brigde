import { CardBase } from "../CardBase/CardBase";
import { IClassCard } from "./ClassCard.types";

export const ClassCard = ({ id, name, img, onClick }: IClassCard) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(id);
  };

  return (
    <CardBase className="h-[160px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]">
      <div onClick={handleClick} className="h-full">
        <div className="h-[112px]">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover rounded-t-dui-box transition-transform duration-300"
          />
        </div>

        <div className="flex items-center justify-center p-3">
          <h3 className="font-bold text-primary text-center truncate transition-colors duration-300 group-hover:text-primary-hover">
            {name}
          </h3>
        </div>
      </div>
    </CardBase>
  );
};

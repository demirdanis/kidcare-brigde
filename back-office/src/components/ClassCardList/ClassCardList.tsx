import { ClassCard } from "../ClassCard/ClassCard";
import { IClassCardList } from "./ClassCardList.types";

export const ClassCardList = ({
  classes,
  className,
  onClassClick,
}: IClassCardList) => {
  return (
    <div
      className={`grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
        className || ""
      }`}
    >
      {classes.map((classItem) => (
        <ClassCard
          id={classItem.id}
          key={classItem.id}
          name={classItem.name}
          img={classItem.img}
          onClick={onClassClick}
        />
      ))}
    </div>
  );
};

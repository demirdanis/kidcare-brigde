import { IClassCard } from "../ClassCard/ClassCard.types";

export interface IClassCardList {
  classes: IClassCard[];
  className?: string;
  onClassClick?: (classId: string) => void;
}

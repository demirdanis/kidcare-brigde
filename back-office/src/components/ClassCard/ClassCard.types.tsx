export interface IClassCard {
  id: string;
  name: string;
  img: string | null;
  onClick?: (classId: string) => void;
}

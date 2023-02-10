export type CriteriaType = {
  category?: string;
};

export default interface FilterProps {
  onChange: (criteria: any) => void;
  criteria: CriteriaType;
}

import { Dispatch, SetStateAction } from 'react';

export type CriteriaType = {
  category: string;
};

export default interface FilterProps {
  onChange: (criteria: any) => void;
  criteria: {
    category: string;
  };
  setCriteria: Dispatch<SetStateAction<CriteriaType>>;
}

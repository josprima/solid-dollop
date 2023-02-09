import { SelectInput } from '@components/select-input';
import createOptions from '@utils/create-options';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import FilterProps from './Filter.interface';

function Filter({ onChange, criteria, setCriteria }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterHeight, setFilterHeight] = useState(0);

  const filterRef = useRef<HTMLDivElement>(null);

  const getCategories = async () => {
    try {
      const { data: categoriesResponseData } = await axios.get(
        '/api/products/categories',
      );

      setCategories(categoriesResponseData);
    } catch (error) {
      // handle api error
    }
  };

  const handleInputChange = (e: any) => {
    const newCriteria = {
      ...criteria,
      [e.target.name]: e.target.value,
    };

    setCriteria(newCriteria);
    onChange(newCriteria);
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFilterHeight(filterRef.current?.clientHeight || 0);
    } else {
      setFilterHeight(0);
    }
  }, [isOpen]);

  return (
    <div>
      <button
        type="button"
        onClick={toggleFilter}
        className={`flex items-center justify-between w-full px-4 py-2 bg-gray-200 cursor-pointer transition-all ${
          isOpen ? 'rounded-t-md' : 'rounded-md'
        }`}
      >
        <span className="font-medium text-base text-gray-700">
          {`${isOpen ? 'Close' : 'Open'} filter`}
        </span>

        <FiChevronDown
          className={`text-gray-700 text-2xl transition-all ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all"
        style={{ height: `${filterHeight}px` }}
      >
        <div className="p-4 bg-gray-50 rounded-b-md" ref={filterRef}>
          <SelectInput
            options={createOptions(categories)}
            id="product-category-select"
            label="Category"
            name="category"
            onChange={handleInputChange}
            value={criteria.category}
            className="max-w-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;

import { Filter } from '@components/filter';
import { CriteriaType } from '@components/filter/Filter.interface';
import Pagination from '@components/pagination';
import { ProductsTable } from '@components/products-table';
import { TextInput } from '@components/text-input';
import useGetProducts from '@hooks/get-products';
import Head from 'next/head';
import { useState } from 'react';

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [criteria, setCriteria] = useState<CriteriaType>({});

  const { isLoading, products, totalPage } = useGetProducts({
    page: currentPage,
    category: criteria.category,
    keyword: searchValue,
  });

  const handleOnClickPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOnClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleChangeSearchValue = (e: any) => {
    setSearchValue(e.target.value);
    setCriteria({});
  };

  const handleOnFilter = (newCriteria: CriteriaType) => {
    setCriteria(newCriteria);
    setSearchValue('');
  };

  return (
    <>
      <Head>
        <title>Products | usedeall-ecommerce</title>
      </Head>

      <div className="px-4 lg:px-10 pt-12 pb-4 lg:pb-10 w-full h-full flex flex-col">
        <div className="flex flex-col md:justify-between md:items-center md:flex-row border-b border-gray-200 py-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-700">Product List</h1>

          <TextInput
            placeholder="Search Product..."
            value={searchValue}
            onChange={handleChangeSearchValue}
            name="search"
            id="search-product"
            className="w-64"
          />
        </div>

        <Filter onChange={handleOnFilter} criteria={criteria} />

        <div className="flex flex-col flex-grow mt-4 overflow-y-auto">
          <div className="flex-1">
            <ProductsTable products={products} />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onNextClick={handleOnClickNextPage}
            onPrevClick={handleOnClickPrevPage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

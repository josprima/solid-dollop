import { Filter } from '@components/filter';
import { CriteriaType } from '@components/filter/Filter.interface';
import Pagination from '@components/pagination';
import { TextInput } from '@components/text-input';
import useGetProducts from '@hooks/get-products';
import Head from 'next/head';
import { useState } from 'react';

const initialCriteria = {
  category: '',
};

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [criteria, setCriteria] = useState(initialCriteria);

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
    setCriteria(initialCriteria);
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

      <div className="px-10 py-12 w-full h-full flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-200 py-4 mb-4">
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

        <Filter
          onChange={handleOnFilter}
          criteria={criteria}
          setCriteria={setCriteria}
        />

        <div className="flex flex-col flex-grow mt-4">
          <div className="flex-1">
            <table className="table-auto w-full border">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="p-4 uppercase">Product Name</th>
                  <th className="p-4 uppercase w-72">Brand</th>
                  <th className="p-4 uppercase w-24">Price</th>
                  <th className="p-4 uppercase w-24">Stock</th>
                  <th className="p-4 uppercase w-52">Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="odd:bg-gray-100 even:bg-gray-200"
                  >
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">{product.brand}</td>
                    <td className="p-3 text-center">{product.price}</td>
                    <td className="p-3 text-center">{product.stock}</td>
                    <td className="p-3">{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

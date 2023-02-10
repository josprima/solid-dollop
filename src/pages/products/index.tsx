import { Filter } from '@components/filter';
import { CriteriaType } from '@components/filter/Filter.interface';
import Pagination from '@components/pagination';
import { TextInput } from '@components/text-input';
import { BASE_PATH } from '@constants/common';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { ProductResponseType, ProductType } from './ProductInterfaces';

const LIMIT_PER_PAGE = 10;

const initialCriteria = {
  category: '',
};

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [criteria, setCriteria] = useState(initialCriteria);

  const getProducts = async ({
    page = 1,
    productNameKeyword = '',
    category = '',
  }: {
    page?: number;
    productNameKeyword?: string;
    category?: string;
  }) => {
    setCurrentPage(page);
    const skip = (page - 1) * LIMIT_PER_PAGE;

    let productListUrl;

    if (category !== '') {
      productListUrl = new URL(
        `${BASE_PATH}/api/products/category/${category}`,
      );
    } else if (productNameKeyword !== '') {
      productListUrl = new URL(`${BASE_PATH}/api/products/search`);

      productListUrl.searchParams.set('q', productNameKeyword);
    } else {
      productListUrl = new URL(`${BASE_PATH}/api/products`);
    }

    productListUrl.searchParams.set('limit', String(LIMIT_PER_PAGE));
    productListUrl.searchParams.set('skip', String(skip));

    try {
      const { data: productsResponse }: { data: ProductResponseType } =
        await axios.get(productListUrl.toString());

      setProducts(productsResponse?.products || []);
      setTotalPage(Math.ceil(productsResponse.total / LIMIT_PER_PAGE));
    } catch (error) {
      // todo: handle api error
    }
  };

  const handleOnClickPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOnClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const debouncedSearchProductHandler = useCallback(
    debounce(
      (keyword) => getProducts({ page: 1, productNameKeyword: keyword }),
      2000,
    ),
    [],
  );

  const handleChangeSearchValue = (e: any) => {
    setSearchValue(e.target.value);
    setCriteria(initialCriteria);

    debouncedSearchProductHandler(e.target.value);
  };

  const handleOnFilter = (newCriteria: CriteriaType) => {
    getProducts({ category: newCriteria.category });
    setSearchValue('');
  };

  useEffect(() => {
    getProducts({ page: currentPage });
  }, [currentPage]);

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
                  <th className="p-4 w-12">No.</th>
                  <th className="p-4 uppercase">Product Name</th>
                  <th className="p-4 uppercase w-72">Brand</th>
                  <th className="p-4 uppercase w-24">Price</th>
                  <th className="p-4 uppercase w-24">Stock</th>
                  <th className="p-4 uppercase w-52">Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="odd:bg-gray-100 even:bg-gray-200"
                  >
                    <td className="p-3 text-center">
                      {(currentPage - 1) * LIMIT_PER_PAGE + index + 1}
                    </td>
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
          />
        </div>
      </div>
    </>
  );
}

import Pagination from '@components/pagination';
import { TextInput } from '@components/text-input';
import { BASE_PATH } from '@constants/common';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { ProductResponseType, ProductType } from './ProductInterfaces';

const LIMIT_PER_PAGE = 10;

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const getProducts = async ({
    page,
    productNameKeyword = '',
  }: {
    page: number;
    productNameKeyword?: string;
  }) => {
    const skip = (page - 1) * LIMIT_PER_PAGE;

    let productListUrl;

    if (productNameKeyword !== '') {
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
    debouncedSearchProductHandler(e.target.value);
  };

  useEffect(() => {
    getProducts({ page: currentPage });
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Products | usedeall-ecommerce</title>
      </Head>

      <div>
        <TextInput
          placeholder="Search Product"
          value={searchValue}
          onChange={handleChangeSearchValue}
        />

        <table className="table-auto">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onNextClick={handleOnClickNextPage}
          onPrevClick={handleOnClickPrevPage}
        />
      </div>
    </>
  );
}

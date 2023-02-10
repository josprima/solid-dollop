import { useCallback, useEffect, useState } from 'react';
import { BASE_PATH } from '@constants/common';
import {
  ProductResponseType,
  ProductType,
} from 'src/pages/products/ProductInterfaces';
import axios from 'axios';
import debounce from 'lodash.debounce';

const LIMIT_PER_PAGE = 10;

const useGetProducts = ({ page = 1, category = '', keyword = '' }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  const getProducts = async (searchValue = '') => {
    setIsLoading(true);

    const skip = (page - 1) * LIMIT_PER_PAGE;

    let productListUrl;

    if (category !== '') {
      productListUrl = new URL(
        `${BASE_PATH}/api/products/category/${category}`,
      );
    } else if (searchValue !== '') {
      productListUrl = new URL(`${BASE_PATH}/api/products/search`);

      productListUrl.searchParams.set('q', searchValue);
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
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearchProductHandler = useCallback(
    debounce((searchValue) => getProducts(searchValue), 1000),
    [],
  );

  useEffect(() => {
    getProducts();
  }, [page, category]);

  useEffect(() => {
    debouncedSearchProductHandler(keyword);
  }, [keyword]);

  return { products, isLoading, totalPage };
};

export default useGetProducts;

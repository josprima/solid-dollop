import { BASE_PATH } from '@constants/common';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CartResponseType, CartType } from 'src/interfaces/CartInterfaces';

const LIMIT_PER_PAGE = 10;

const useGetCarts = ({ page }: { page: number }) => {
  const [carts, setCarts] = useState<CartType[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getCarts = async () => {
    setIsLoading(true);

    const skip = (page - 1) * LIMIT_PER_PAGE;
    const cartListUrl = new URL(`${BASE_PATH}/api/carts`);

    cartListUrl.searchParams.set('limit', String(LIMIT_PER_PAGE));
    cartListUrl.searchParams.set('skip', String(skip));

    try {
      const { data: cartResponse }: { data: CartResponseType } =
        await axios.get(cartListUrl.toString());

      setCarts(cartResponse?.carts || []);
      setTotalPage(Math.ceil(cartResponse.total / LIMIT_PER_PAGE));
    } catch (error) {
      // todo: handle api error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
  }, [page]);

  return {
    carts,
    totalPage,
    isLoading,
  };
};

export default useGetCarts;

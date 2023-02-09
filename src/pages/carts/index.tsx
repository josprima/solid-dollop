import Pagination from '@components/pagination';
import { BASE_PATH } from '@constants/common';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartResponseType, CartType } from './CartInterfaces';

const LIMIT_PER_PAGE = 10;

export default function CartPage() {
  const [carts, setCarts] = useState<CartType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getCarts = async (page: number) => {
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
    }
  };

  const handleOnClickPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOnClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getCarts(currentPage);
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>Carts | usedeall-ecommerce</title>
      </Head>

      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Total</th>
              <th>Discounted Total</th>
              <th>Total Products</th>
              <th>Total Quantity</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id}>
                <td>{cart.userId}</td>
                <td>{cart.total}</td>
                <td>{cart.discountedTotal}</td>
                <td>{cart.totalProducts}</td>
                <td>{cart.totalQuantity}</td>
                <td>
                  <Link href={`/carts/${cart.id}`}>Detail</Link>
                </td>
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

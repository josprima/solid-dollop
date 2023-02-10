import { Button } from '@components/button';
import Pagination from '@components/pagination';
import useGetCarts from '@hooks/get-carts';
import Head from 'next/head';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

export default function CartPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { carts, totalPage, isLoading } = useGetCarts({ page: currentPage });

  const handleOnClickPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleOnClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Head>
        <title>Carts | usedeall-ecommerce</title>
      </Head>

      <div className="px-10 py-12 w-full h-full flex flex-col">
        <div className="border-b border-gray-200 py-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-700">Cart List</h1>
        </div>

        <div className="flex flex-col flex-grow mt-4">
          <div className="flex-1">
            <table className="table-auto w-full border">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="p-4 uppercase">User ID</th>
                  <th className="p-4 uppercase">Total</th>
                  <th className="p-4 uppercase">Discounted Total</th>
                  <th className="p-4 uppercase">Total Products</th>
                  <th className="p-4 uppercase">Total Quantity</th>
                  <th className="p-4 uppercase">Detail</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => (
                  <tr
                    key={cart.id}
                    className="odd:bg-gray-100 even:bg-gray-200"
                  >
                    <td className="p-3 text-center">{cart.userId}</td>
                    <td className="p-3 text-center">{cart.total}</td>
                    <td className="p-3 text-center">{cart.discountedTotal}</td>
                    <td className="p-3 text-center">{cart.totalProducts}</td>
                    <td className="p-3 text-center">{cart.totalQuantity}</td>
                    <td className="p-3 flex justify-center">
                      <Button
                        href={`/carts/${cart.id}`}
                        text="Detail"
                        icon={<FiExternalLink />}
                        iconPosition="right"
                      />
                    </td>
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

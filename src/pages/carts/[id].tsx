import { Button } from '@components/button';
import { CartDetailInfo } from '@components/cart-detail-info';
import { ProductsTable } from '@components/products-table';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { ProductType } from '../products/ProductInterfaces';
import { CartType, UserType } from './CartInterfaces';

function CartDetailPage() {
  const [cartDetail, setCartDetail] = useState<CartType>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [userData, setUserData] = useState<UserType>();

  const router = useRouter();
  const cartId = router.query.id;

  const getCartDetailData = async () => {
    try {
      const { data: cartResponseData } = await axios.get(
        `/api/carts/${cartId}`,
      );

      setCartDetail(cartResponseData);
    } catch (error) {
      // handle api error
    }
  };

  const getAllProductsData = async () => {
    const promises: any[] = [];

    cartDetail?.products.forEach((product) => {
      promises.push(axios.get(`/api/products/${product.id}`));
    });

    try {
      const productResponses = await Promise.all(promises);
      const productsData: ProductType[] = [];

      productResponses.forEach((response) => {
        productsData.push(response.data);
      });

      setProducts(productsData);
    } catch (error) {
      // handle api error
    }
  };

  const getCartUserData = async () => {
    try {
      const { data: userResponseData } = await axios.get(
        `/api/users/${cartDetail?.userId}`,
      );

      setUserData(userResponseData);
    } catch (error) {
      // handle api error
    }
  };

  useEffect(() => {
    if (cartId) {
      getCartDetailData();
    }
  }, [cartId]);

  useEffect(() => {
    if (cartDetail) {
      getAllProductsData();
    }

    if (cartDetail?.userId) {
      getCartUserData();
    }
  }, [cartDetail]);

  return (
    <>
      <Head>
        <title>{`Cart Detail ${cartId || ''} | usedeall-ecommerce`}</title>
      </Head>

      <div className="px-10 py-12 w-full h-full flex flex-col">
        <Button href="/carts" icon={<FiChevronLeft />} text="Back" />

        <h1 className="text-3xl font-bold text-gray-700 border-b border-gray-200 py-4 mb-4">{`Cart ${cartDetail?.id}`}</h1>

        <h2 className="text-lg font-semibold mb-1">Details</h2>

        <div className="border rounded-md bg-violet-200 px-4 py-6 mb-6 grid grid-cols-2 gap-2">
          <CartDetailInfo
            label="User"
            value={`${userData?.firstName} ${userData?.lastName}`}
          />
          <CartDetailInfo label="Total" value={cartDetail?.total} />
          <CartDetailInfo
            label="Total Products"
            value={cartDetail?.totalProducts}
          />
          <CartDetailInfo
            label="Total Quantity"
            value={cartDetail?.totalQuantity}
          />
        </div>

        <ProductsTable products={products} />
      </div>
    </>
  );
}

export default CartDetailPage;

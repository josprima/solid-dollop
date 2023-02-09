import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

      <div>
        <Link href="/carts">Back</Link>

        <h1>{`Cart ${cartDetail?.id}`}</h1>

        <div>
          <h2>Details</h2>

          <div>
            <span>
              User:
              {`${userData?.firstName} ${userData?.lastName}`}
            </span>
            <span>
              Total:
              {cartDetail?.total}
            </span>
            <span>
              Total Products:
              {cartDetail?.totalProducts}
            </span>
            <span>
              Total Quantity:
              {cartDetail?.totalQuantity}
            </span>
          </div>
        </div>

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
      </div>
    </>
  );
}

export default CartDetailPage;

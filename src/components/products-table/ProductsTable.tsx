import { ProductType } from 'src/pages/products/ProductInterfaces';

function ProductsTable({ products }: { products: ProductType[] }) {
  return (
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
          <tr key={product.id} className="odd:bg-gray-100 even:bg-gray-200">
            <td className="p-3">{product.title}</td>
            <td className="p-3">{product.brand}</td>
            <td className="p-3 text-center">{product.price}</td>
            <td className="p-3 text-center">{product.stock}</td>
            <td className="p-3">{product.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;

import CartDetailInfoProps from './CartDetailInfo.interface';

function CartDetailInfo({ label, value }: CartDetailInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-xs">{label}</span>
      <span className="font-normal text-lg">{value}</span>
    </div>
  );
}

export default CartDetailInfo;

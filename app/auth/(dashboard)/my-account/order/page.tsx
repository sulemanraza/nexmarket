import { getOrders } from "@/server/action/order/getOrders";
import { OrderTable } from "./OrderTable";

const Orders = async () => {
  const Order = await getOrders();

  return (
    <div>
      <OrderTable data={Order || []} />
    </div>
  );
};

export default Orders;

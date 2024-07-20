import { getOrders } from "@/server/action/order/getOrders";
import { OrderTable } from "./OrderTable";

const Orders = async () => {
  const Order = await getOrders();

  return <OrderTable data={Order || []} />;
};

export default Orders;

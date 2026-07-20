import { getCustomerPrescriptions } from "@/lib/api/customer/customerPrescription";
import { getUser } from "@/lib/core/server";
import { Button } from "@heroui/react";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";

const OrderPage = async() => {
    const user = await getUser()
    const userId = user?.id
    // console.log(userId);
    const response = await getCustomerPrescriptions(userId)

    const myOrders = response.result

//   const myOrders = [
//     {
//       id: "ORD-2024-024",
//       date: "18 Jul 2024",
//       status: "processing",
//       amount: "৳850",
//       items: "Napa Extra, Azithromycin 500mg",
//     },
//     {
//       id: "ORD-2024-019",
//       date: "12 Jul 2024",
//       status: "delivered",
//       amount: "৳1,240",
//       items: "Losartan 50mg, Metformin 500mg",
//     },
//     {
//       id: "ORD-2024-014",
//       date: "5 Jul 2024",
//       status: "delivered",
//       amount: "৳560",
//       items: "ORS, Zinc Tablet, Oral Saline",
//     },
//     {
//       id: "ORD-2024-009",
//       date: "28 Jun 2024",
//       status: "delivered",
//       amount: "৳2,100",
//       items: "Insulin Pen + Needles, Glucometer",
//     },
//     {
//       id: "ORD-2024-003",
//       date: "15 Jun 2024",
//       status: "cancelled",
//       amount: "৳730",
//       items: "Amoxicillin 250mg, Cetirizine",
//     },
//   ];
  return (
    <div className="py-10">
      <div className="space-y-4">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl border border-border p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <span className="font-mono font-semibold text-foreground text-sm">
                  {order.orderNumber}
                </span>
                <span className="ml-3 text-xs text-muted-foreground">
                  {order.date}
                </span>
              </div>
              <Button variant="ghost" className={'bg-green-200'}>{order.status}</Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{order.additionalInfo}</p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
              <span className="font-bold text-foreground">price: ${order.price}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BsEye size={13} /> View
                </Button>
                <Button variant="outline" size="sm">
                  <BiDownload size={13} /> Invoice
                </Button>
                {order.status === "delivered" && (
                  <Button variant="secondary" size="sm">
                    <FiRefreshCcw size={13} /> Reorder
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;

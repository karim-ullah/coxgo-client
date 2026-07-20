import { getPrescriptions } from '@/lib/api/admin/admin';
import { Button } from "@heroui/react";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
const PrescriptionsPage = async() => {
    const response = await getPrescriptions()
    const prescriptions = response.result

    return (
        <div className="py-10">
              <div className="space-y-4">
                {prescriptions.map((order) => (
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

export default PrescriptionsPage;
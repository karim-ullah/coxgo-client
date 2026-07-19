import { Button } from "@heroui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Submitted = ({ setSubmitted }) => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-border p-12 text-center max-w-md w-full shadow-xl">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle size={40} className="text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mb-3">
          Prescription Submitted!
        </h2>
        <p className="text-muted-foreground mb-2">
          Your prescription has been received. Our pharmacist will review it
          within 30 minutes.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          We'll contact you via phone to confirm your order details and pricing.
        </p>
        <div className="bg-teal-50 rounded-xl p-4 mb-6 text-left">
          <div className="text-xs text-muted-foreground mb-1">
            Reference Number
          </div>
          <div className="font-mono text-primary font-semibold text-lg">
            RX-2024-00847
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Prescription
        </Button>
      </div>
    </div>
  );
};

export default Submitted;

import { Button } from "@/components/ui/button";
import { useCreatePaymentCardMutation } from "@/store/services/payment.service";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";


interface CardPaymentFormProps {
  onSuccess: (paymentIntent: any, captureResponse: any) => void;
  onError: (error: any) => void;
  isLoading: boolean;
  pemesanId: string;
  captureCard: any;
}

const CardPaymentForm:React.FC<CardPaymentFormProps> = ({
    onSuccess,
    onError,
    isLoading,
    pemesanId,
    captureCard,
  }: {
    onSuccess: (paymentIntent: any, captureResponse: any) => void;
    onError: (error: any) => void;
    isLoading: boolean;
    pemesanId: string;
    captureCard: any;
  }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [createPaymentCard] = useCreatePaymentCardMutation();
  
    if (!stripe || !elements) {
      console.error("Stripe or Elements not initialized");
      return <p>Loading Stripe...</p>;
    }
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("CardElement not found");
        onError(new Error("Card input not found"));
        return;
      }
  
      try {
        console.log("Creating Payment Intent with pemesanId:", pemesanId);
        const response = await createPaymentCard({ pemesanId }).unwrap();
        console.log("Payment Intent Response:", response);
  
        if (!response.clientSecret) {
          throw new Error("Failed to create payment intent: No clientSecret returned");
        }
  
        console.log("Confirming Card Payment with clientSecret:", response.clientSecret);
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          response.clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: pemesanId,
              },
            },
          }
        );
  
        if (error) {
          console.error("Payment Error:", error);
          onError(error);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          console.log("Payment Successful:", paymentIntent);
          // Call CapturePaymentCard API
          try {
            console.log("Before calling captureCard:", { paymentIntentId: paymentIntent.id });
            const captureResponse = await captureCard.captureCards({ paymentIntentId: paymentIntent.id });
            console.log("Capture Payment Response:", captureResponse);
            onSuccess(paymentIntent, captureResponse);
          } catch (captureError: any) {
            console.error("Capture Payment Error:", captureError);
            onError(new Error("Failed to capture payment: " + captureError.message));
          }
        } else {
          console.error("PaymentIntent not succeeded:", paymentIntent);
          onError(new Error("Payment not completed"));
        }
      } catch (error: any) {
        console.error("Payment Error:", error);
        onError(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="border p-3 rounded-md"
          onChange={(event) => {
            console.log("CardElement change:", event);
            if (event.error) {
              console.error("CardElement error:", event.error.message);
            }
          }}
          onFocus={() => console.log("CardElement focused")}
          onBlur={() => console.log("CardElement blurred")}
        />
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full py-3 mt-4"
        >
          {isLoading ? "Processing..." : "Pay with Card"}
        </Button>
      </form>
    );
  };
export default CardPaymentForm;

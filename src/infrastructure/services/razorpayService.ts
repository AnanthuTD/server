import Razorpay from 'razorpay';
import env from '../env/env';
import crypto from 'node:crypto';

interface CreateRazorpayOrderProps {
  amount: number;
}

interface PaymentVerificationProps {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export class RazorpayService {
  async createOrder({ amount }: CreateRazorpayOrderProps) {
    try {
      const instance = new Razorpay({
        key_id: env.RAZORPAY_KEY_ID,
        key_secret: env.RAZORPAY_SECRET,
      });

      const options = {
        amount: amount * 100, // convert to paise
        currency: 'INR',
      };

      const razorpayOrder = await instance.orders.create(options);

      if (!razorpayOrder) throw new Error('Failed to create Razorpay order');

      return razorpayOrder;
    } catch (error) {
      console.error('Failed to create Razorpay order:', error);
      throw error;
    }
  }

  /**
   * Verifies the Razorpay payment by validating the signature.
   *
   * @param {PaymentVerificationProps} props - Contains razorpayOrderId, razorpayPaymentId, and razorpaySignature.
   * @returns {boolean} - Returns `true` if the signature is valid, `false` otherwise.
   */
  verifyPayment({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  }: PaymentVerificationProps): boolean {
    try {
      const generatedSignature = `${razorpayOrderId}|${razorpayPaymentId}`;

      // Create the HMAC SHA256 hash with Razorpay key secret
      const expectedSignature = crypto
        .createHmac('sha256', env.RAZORPAY_SECRET)
        .update(generatedSignature)
        .digest('hex');

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error('Failed to verify Razorpay payment:', error);
      return false;
    }
  }
}
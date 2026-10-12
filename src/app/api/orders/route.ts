import { NextResponse } from 'next/server'
import { STORE_CONFIG } from '@/data/config'

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    const { orderNumber, customer, items, subtotal, deliveryCharges, grandTotal, notes } = orderData

    const itemsSummary = items
      .map(
        (it: any) =>
          `• ${it.name} (Qty: ${it.quantity}) - Rs. ${(it.price * it.quantity).toLocaleString()} [SKU: ${it.sku || 'N/A'}]`
      )
      .join('\n')

    // 1. Send Email Notification to STORE_CONFIG.email (tanveerrafiq499@gmail.com)
    try {
      await fetch(`https://formsubmit.co/ajax/${STORE_CONFIG.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `🛍️ New Order #${orderNumber} - ${customer.name} (Rs. ${grandTotal.toLocaleString()})`,
          'Order Number': orderNumber,
          'Customer Name': customer.name,
          'Phone / WhatsApp': customer.phone,
          City: customer.city,
          'Delivery Address': customer.address,
          'Order Items': itemsSummary,
          Subtotal: `Rs. ${subtotal.toLocaleString()}`,
          Delivery: deliveryCharges === 0 ? 'FREE' : `Rs. ${deliveryCharges}`,
          'Grand Total': `Rs. ${grandTotal.toLocaleString()} (Cash on Delivery)`,
          'Special Notes': notes || 'None',
          'Order Time': new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
        }),
      })
    } catch (emailErr) {
      console.warn('FormSubmit email notice warning:', emailErr)
    }

    // 2. Optional: If CallMeBot API key is configured, send direct WhatsApp notification
    const callmebotApiKey = process.env.CALLMEBOT_API_KEY
    if (callmebotApiKey && STORE_CONFIG.whatsappNumber) {
      try {
        const waText = encodeURIComponent(
          `🛍️ *NEW ORDER #${orderNumber}*\n\n` +
          `👤 *Customer:* ${customer.name}\n` +
          `📞 *Phone:* ${customer.phone}\n` +
          `📍 *City:* ${customer.city}\n` +
          `🏠 *Address:* ${customer.address}\n\n` +
          `📦 *Items:*\n${itemsSummary}\n\n` +
          `💰 *Total: Rs. ${grandTotal.toLocaleString()} (COD)*`
        )
        await fetch(
          `https://api.callmebot.com/whatsapp.php?phone=${STORE_CONFIG.whatsappNumber}&text=${waText}&apikey=${callmebotApiKey}`
        )
      } catch (waErr) {
        console.warn('WhatsApp webhook notice warning:', waErr)
      }
    }

    return NextResponse.json({ success: true, orderNumber })
  } catch (error: any) {
    console.error('Error processing order API:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

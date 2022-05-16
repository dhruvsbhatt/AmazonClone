/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async event => {
  const body = JSON.parse(event.body);

  switch (body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = body.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = body.data.object;
      console.log('PaymentMethod was attached to a customer!');
      break;
    default:
      console.log(`Unhandled event type ${body.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({received: true}),
  };
};

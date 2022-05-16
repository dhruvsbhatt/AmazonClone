/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stripe = require('stripe')(
  'sk_test_51HhxcyJul1JPjfN4t2sa91WzEr4OXYwwf4i9NHnuXl7ndO90KAWSExXoH3gTDc8ls5jeJcLt9ARZGMHO3JPKycWn00iF3Rv3Kd',
);

exports.handler = async event => {
  const {typeName, arguments} = event;

  if (typeName !== 'Mutation') {
    throw new Error('Request is not a mutation');
  }

  if (!arguments?.amount) {
    throw new Error('Amount argument is required');
  }

  // create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: arguments.amount,
    currency: 'usd',
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

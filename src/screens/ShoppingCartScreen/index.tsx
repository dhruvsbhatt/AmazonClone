import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import {CartProduct} from '../../models';
import {Auth, DataStore} from 'aws-amplify';
import {Product} from '../../models';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const navigation = useNavigation();

  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      const aProducts = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      console.log('Products =', aProducts);
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: aProducts.find(p => {
            const pro = p;
            if (pro) {
              p.id === cartProduct.id;
            }
          }),
        })),
      );
    };
    fetchProducts();
  }, [cartProducts]);

  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe(() =>
      fetchCartProducts(),
    );

    return subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct, cp.id).subscribe(msg => {
        console.log('MSG = ', msg);
        if (msg.opType === 'UPDATE') {
          console.log('Hello');
          setCartProducts(curCartProducts =>
            curCartProducts.map(cprod => {
              if (cprod.id !== msg.element.id) {
                return cprod;
              }
              return {
                ...cprod,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );

  const onCheckout = () => {
    navigation.navigate('Address' as never, {totalPrice} as never);
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.textSubTotal}>
              Subtotal ({cartProducts.length} items):{' '}
              <Text style={styles.textPrice}> ${totalPrice.toFixed(2)} </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={() => onCheckout()}
              containerStyles={styles.button}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  button: {
    backgroundColor: '#f7e300',
  },
  textPrice: {
    color: '#e47911',
  },
  textSubTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShoppingCartScreen;

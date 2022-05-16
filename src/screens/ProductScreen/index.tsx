import React, {useState, useEffect} from 'react';
import {Text, ScrollView, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Auth, DataStore} from 'aws-amplify';
import {Product} from '../../models';
import styles from './styles';
import QuantitySelector from '../../components/QuantitySelector';

import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {CartProduct} from '../../models';

const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Route = ', route.params);
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
      product: product as Product,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart' as never);
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      <ImageCarousel images={product.images} />

      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map((options, index) => (
          <Picker.Item label={options} value={options} key={index} />
        ))}
      </Picker>
      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <Button text={'Add To Cart'} onPress={onAddToCart} />
      <Button
        text={'Buy Now'}
        onPress={() => {
          console.warn('Buy Now');
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;

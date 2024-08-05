import { Product } from '@/types/types';
import _ from 'lodash';

export function compareProducts(product1, product2) {
    const fieldsToOmit = ['cartId', 'cartQuantity'];
    const cleanProduct1 = _.omit(product1, fieldsToOmit) as Product;
    const cleanProduct2 = _.omit(product2, fieldsToOmit) as Product;

    return _.isEqual(cleanProduct1, cleanProduct2);
}
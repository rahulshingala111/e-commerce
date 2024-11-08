// pages/ProductPage.tsx
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import ProductList from './ProductList/ProductList';
import './Product.css';
import { useQuery } from '../../constants/Helper';


const ProductPage: React.FC = () => {

    const _params = useQuery()

    return (
        <div className="product-page">
            {
                (
                    <>
                        <Sidebar />
                        <div className="product-section">
                            <ProductList params={_params} />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ProductPage;

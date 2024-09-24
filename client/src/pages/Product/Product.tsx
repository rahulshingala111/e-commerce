// pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ProductList from './ProductList/ProductList';
import './Product.css';
import ApiCall from '../../constants/ApiCall';
import { Categories } from '../../constants/Interfaces';

const ProductPage: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [category, setCategory] = useState<Array<Categories>>([])

    useEffect(() => {
        const callme = async () => {
            try {
                const category = await ApiCall.get('/product/categories')
                setCategory(category.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        callme()
    }, [])

    return (
        <div className="product-page">
            {
                !loading && (
                    <>
                        <Sidebar category={category} />
                        <div className="product-section">
                            <h2>Products</h2>
                            <ProductList />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ProductPage;

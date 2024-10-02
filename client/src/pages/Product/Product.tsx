// pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ProductList from './ProductList/ProductList';
import './Product.css';
import ApiCall from '../../constants/ApiCall';
import { CategoriesInterface } from '../../constants/Interfaces';
import { useLocation } from 'react-router-dom';

const ProductPage: React.FC = () => {


    const location = useLocation();

    const [loading, setLoading] = useState<boolean>(true)
    const [category, setCategory] = useState<Array<CategoriesInterface>>([])

    const [params, setParams] = useState<any>('')

    const queryParams = new URLSearchParams(location.search);
    const _category_id = queryParams.get('category_id');

    useEffect(() => {
        setParams({
            category_id: _category_id
        })
    }, [_category_id])


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
                            <ProductList params={params} />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ProductPage;

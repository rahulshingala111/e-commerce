// pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ProductList from './ProductList/ProductList';
import './Product.css';
import ApiCall from '../../constants/ApiCall';
import { BransInterface, CategoriesInterface } from '../../constants/Interfaces';
import { useLocation } from 'react-router-dom';

const ProductPage: React.FC = () => {

    const location = useLocation();

    const [loading, setLoading] = useState<boolean>(true)
    const [category, setCategory] = useState<Array<CategoriesInterface>>([])
    const [brand, setBrand] = useState<Array<BransInterface>>([])


    const [params, setParams] = useState<any>({})

    const queryParams = new URLSearchParams(location.search);

    const _category_id = queryParams.get('category_id');
    const _brand_id = queryParams.get('brand_id');

    useEffect(() => {
        if (_category_id) {
            setParams({ ...params, category_id: _category_id! })
        }
    }, [_category_id])

    useEffect(() => {
        if (_brand_id) {
            setParams({ ...params, brand_id: _brand_id })
        }
    }, [_brand_id])


    useEffect(() => {

        const callme = async () => {
            try {
                const category = await ApiCall.get('/product/categories')
                setCategory(category.data)

                const brand = await ApiCall.get('/product/brands')
                setBrand(brand.data)



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
                        <Sidebar category={category} brand={brand} />
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

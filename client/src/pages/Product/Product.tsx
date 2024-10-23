// pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ProductList from './ProductList/ProductList';
import './Product.css';
import ApiCall from '../../constants/ApiCall';
import { BrandInterface, CategoriesInterface } from '../../constants/Interfaces';
import CONSTANTS from '../../constants/constants';
import { useQuery } from '../../constants/Helper';


const ProductPage: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [category, setCategory] = useState<Array<CategoriesInterface>>([])
    const [brand, setBrand] = useState<Array<BrandInterface>>([])
    
    const _params = useQuery()

    useEffect(() => {

        const callme = async () => {
            try {
                const category = await ApiCall.get(CONSTANTS.API_ENDPOINTS.CATEGORY.FETCH)
                setCategory(category.data)

                const brand = await ApiCall.get(CONSTANTS.API_ENDPOINTS.BRANDS.FETCH)
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
                            <ProductList params={_params} />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ProductPage;

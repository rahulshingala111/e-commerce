import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import type {BrandInterface} from '../../../constants/Interfaces';
import {Link, useNavigate} from 'react-router-dom';
import CONSTANTS from '../../../constants/constants';
import {generateQuery, useQuery} from '../../../constants/Helper';
import ApiCall from '../../../constants/ApiCall';

interface SubCategoriesInterface {
    id: number,
    name: string
}

const Sidebar: React.FC = () => {

    const _params = useQuery();
    const navigate = useNavigate();

    const [sub_category, setSub_category] = useState<Array<SubCategoriesInterface>>([])
    const [brand, setBrand] = useState<Array<BrandInterface>>([])

    // const [filter, setFilter] = useState<Record<string, Array<string>>>({})
    //
    // const FilterObject: Record<string, Array<string>> = {
    //     "color": ['red', 'green', 'pink'],
    //     "size": ['6 inch', '8 inch']
    // }

    useEffect(() => {

        const callme = async () => {
            try {
                const sub_category = await ApiCall.get(CONSTANTS.API_ENDPOINTS.SUB_CATEGORY.FETCH(_params.category_id))
                setSub_category(sub_category.data)

                const brand = await ApiCall.get(CONSTANTS.API_ENDPOINTS.BRANDS.FETCH)
                setBrand(brand.data)

            } catch (error) {
                console.log(error);
            }
        }
        callme()
    }, [])

    const handleBrands = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const value: number = Number(e.target.value);

        if (value) {
            let currentSelectedBrands: Array<number> = []
            currentSelectedBrands = _params.brand_id ? JSON.parse(_params.brand_id) : []

            if (checked) {
                if (!currentSelectedBrands.includes(value)) {
                    currentSelectedBrands.push(value)
                }
            } else {
                const index = currentSelectedBrands.indexOf(value)
                currentSelectedBrands.splice(index, 1)
            }

            const params = _params;
            Object.assign(params, {brand_id: JSON.stringify(currentSelectedBrands)})
            const redirect = generateQuery(params)
            navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
        }
    }

    const handleCategory = (id: number) => {
        const params = _params;
        Object.assign(params, {sub_category_id: id})
        const redirect = generateQuery(params)
        navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
    }

    // const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     const targetValue: string = e.target.value
    //     const splitValue = targetValue.split(',')
    //     const key: string = splitValue[0]
    //     const value: string = splitValue[1]
    //     const currentFilter = filter
    //     if (e.target.checked) {
    //         if (currentFilter[key]?.length > 0) {
    //             if (!currentFilter[key].includes(value)) {
    //                 currentFilter[key].push(value);
    //             }
    //         } else {
    //             currentFilter[key] = [value];
    //         }
    //         setFilter(currentFilter)
    //     } else {
    //         if (currentFilter[key]?.length > 0) {
    //             if (currentFilter[key].includes(value)) {
    //                 currentFilter[key].splice(currentFilter[key].indexOf(value), 1);
    //             }
    //         }
    //         setFilter(currentFilter)
    //     }
    //
    //     const convertFilterToURL = generateFilterQuery(filter)
    //
    //     const params = _params;
    //     Object.assign(params, {filter: convertFilterToURL})
    //     const redirect: string = generateQuery(params)
    //     navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
    //
    // }

    return (
        <div className="sidebar">

            <h3>Filters</h3>
            <Link to={CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCTS_ONLY_CATEGORY(0)}>
                <button className='product-button-2'>Reset Filter</button>
            </Link>

            {/*<div>*/}
            {/*    {*/}
            {/*        Object.entries(FilterObject).map(([key, value], index: number) => (*/}
            {/*            <div key={index}>*/}
            {/*                <div>*/}
            {/*                    {key}*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    {value.map((element: string, index: number) => (*/}
            {/*                        <div key={index}>*/}
            {/*                            <input type='checkbox' value={key + ',' + element} onChange={handleFilter}/>*/}
            {/*                            <label>{element}</label>*/}
            {/*                        </div>*/}
            {/*                    ))}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}

            <div>
                <h2>other categories</h2>
                {
                    sub_category.map((element: SubCategoriesInterface) => (
                        <div key={element.id}>
                            <button className='product-button-2'
                                    onClick={() => handleCategory(element.id)}>{element.name}</button>
                        </div>
                    ))
                }
            </div>

            <div>
                <h2>By Brands</h2>
                {
                    brand.length > 0 && (
                        brand.map((element: BrandInterface, index: number) => (
                            <div key={index} className="checkbox-container">
                                <label className="custom-checkbox">
                                    <input type='checkbox' value={element.id} name={element.name} onChange={handleBrands}/>
                                    <span className="checkmark"></span>
                                    {element.name}
                                    <div>
                                    </div>
                                </label>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Sidebar;

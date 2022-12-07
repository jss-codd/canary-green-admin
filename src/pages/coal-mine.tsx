import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import Sidebar from '../components/Sidebar';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { commonFetchAllUser } from '../services/UserServices';
import { agingInventoryItems, agingInventoryItemsStatus, expirationApproachingItems, expirationApproachingItemsStatus, fetchAgingInventoryItems, fetchExpirationApproachingItems, fetchLowestPricedLocations, fetchLowInventoryItems, fetchTopPricedLocations, lowestPricedLocationsItems, lowestPricedLocationsItemsStatus, lowInventoryItems, lowInventoryItemsStatus, mergeCategories, mergeLocations, mergeProducts, topPricedLocationsItems, topPricedLocationsItemsStatus } from '../redux/reducers/CoalMine';

let category: any[] = [];
let location: any[] = [];
let brands = [
    { BRAND: '1907' },
    { BRAND: 'Willi Reserve' },
    { BRAND: 'Nector B' },
];
let products: any[] = [];

let categoryFilterValue: { CATEGORY: string }[] = [];
let locationFilterValue: { LOCATION: string }[] = [];
let brandFilterValue: { BRAND: string }[] = [];
let productFilterValue: { ITEM_ID: number; ITEM_NAME: string }[] = [];

function CoalMine() {
    const dispatch: any = useDispatch();

    const lowInventoryItemsLoaded = useSelector(lowInventoryItemsStatus);
    const lowInventoryInitialData = useSelector(lowInventoryItems);

    const agingInventoryItemsLoaded = useSelector(agingInventoryItemsStatus);
    const agingInventoryInitialData = useSelector(agingInventoryItems);

    const expirationApproachingItemsLoaded = useSelector(expirationApproachingItemsStatus);
    const expirationApproachingInitialData = useSelector(expirationApproachingItems);

    const topPricedLocationsLoaded = useSelector(topPricedLocationsItemsStatus);
    const topPricedLocationsInitialData = useSelector(topPricedLocationsItems);

    const lowestPricedLocationsLoaded = useSelector(lowestPricedLocationsItemsStatus);
    const lowestPricedLocationsInitialData = useSelector(lowestPricedLocationsItems);

    const mergeLocationList = useSelector(mergeLocations);
    const mergeCategorieList = useSelector(mergeCategories);
    const mergeProductList = useSelector(mergeProducts);

    category = mergeCategorieList;
    location = mergeLocationList;
    products = mergeProductList;
    
    const [lowInventoryDataList, setLowInventoryDataList] = useState([]);
    const [agingInventoryDataList, setAgingInventoryDataList] = useState([]);
    const [expirationApproachingDataList, setExpirationApproachingDataList] = useState([]);
    const [topPricedLocationsDataList, setTopPricedLocationsDataList] = useState([]);
    const [lowestPricedLocationsDataList, setLowestPricedLocationsDataList] = useState([]);

    const [locationData, setLocationData] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [productData, setProductData] = useState<any[]>([]);

    const [operateLocation, setOperateLocation] = useState<any[]>([]);

    //an object array for store checked status for category, location, brand, products
    const [checkedState, setCheckedState] = useState(
        {
            activeCategory: new Array(category?.length).fill(false),
            activeLocation: new Array(location?.length).fill(false),
            activeBrands: new Array(brands?.length).fill(false),
            activeProducts: new Array(products?.length).fill(false)
        }
    );

    //run when checkbox is checked or unchecked
    const handleCheckBoxStatus = (position: number, key: string,) => {
        const updatedCheckedState = checkedState[key as keyof typeof checkedState]?.map((item: any, index: number) =>
            index === position ? !item : item
        );
        setCheckedState((prevState: any) => ({
            ...prevState,
            [key]: updatedCheckedState
        }));
    }

    //run when filter checkbox is clicked
    const lowInventoryFilter = () => {
        let filterDataLowInventory = lowInventoryInitialData;
        let filterDataAgingInventory = agingInventoryInitialData;
        let filterDataExpirationApproaching = expirationApproachingInitialData;
        let filterDataTopPricedLocations = topPricedLocationsInitialData;
        let filterDataLowestPricedLocations = lowestPricedLocationsInitialData;

        if (categoryFilterValue?.length > 0) {
            filterDataLowInventory = filterDataLowInventory.filter((el: { CATEGORY: string; }) => {
                return categoryFilterValue.some((f) => {
                    return f.CATEGORY == el.CATEGORY;
                });
            });

            filterDataAgingInventory = filterDataAgingInventory.filter((el: { CATEGORY: string; }) => {
                return categoryFilterValue.some((f) => {
                    return f.CATEGORY == el.CATEGORY;
                });
            });

            filterDataExpirationApproaching = filterDataExpirationApproaching.filter((el: { CATEGORY: string; }) => {
                return categoryFilterValue.some((f) => {
                    return f.CATEGORY == el.CATEGORY;
                });
            });

            filterDataTopPricedLocations = filterDataTopPricedLocations.filter((el: { CATEGORY: string; }) => {
                return categoryFilterValue.some((f) => {
                    return f.CATEGORY == el.CATEGORY;
                });
            });

            filterDataLowestPricedLocations = filterDataLowestPricedLocations.filter((el: { CATEGORY: string; }) => {
                return categoryFilterValue.some((f) => {
                    return f.CATEGORY == el.CATEGORY;
                });
            });
        }

        if (locationFilterValue?.length > 0) {
            filterDataLowInventory = filterDataLowInventory.filter((el: { NAME: string; }) => {
                return locationFilterValue.some((f) => {
                    return f.LOCATION == el.NAME;
                });
            });

            filterDataAgingInventory = filterDataAgingInventory.filter((el: { NAME: string; }) => {
                return locationFilterValue.some((f) => {
                    return f.LOCATION == el.NAME;
                });
            });

            filterDataExpirationApproaching = filterDataExpirationApproaching.filter((el: { NAME: string; }) => {
                return locationFilterValue.some((f) => {
                    return f.LOCATION == el.NAME;
                });
            });

            filterDataTopPricedLocations = filterDataTopPricedLocations.filter((el: { NAME: string; }) => {
                return locationFilterValue.some((f) => {
                    return f.LOCATION == el.NAME;
                });
            });

            filterDataLowestPricedLocations = filterDataLowestPricedLocations.filter((el: { NAME: string; }) => {
                return locationFilterValue.some((f) => {
                    return f.LOCATION == el.NAME;
                });
            });
        }

        if (productFilterValue?.length > 0) {
            filterDataLowInventory = filterDataLowInventory.filter((el: { ITEM_ID: number; }) => {
                return productFilterValue.some((f) => {
                    return f.ITEM_ID == el.ITEM_ID;
                });
            });

            filterDataAgingInventory = filterDataAgingInventory.filter((el: { ITEM_ID: number; }) => {
                return productFilterValue.some((f) => {
                    return f.ITEM_ID == el.ITEM_ID;
                });
            });

            filterDataExpirationApproaching = filterDataExpirationApproaching.filter((el: { ITEM_ID: number; }) => {
                return productFilterValue.some((f) => {
                    return f.ITEM_ID == el.ITEM_ID;
                });
            });

            filterDataTopPricedLocations = filterDataTopPricedLocations.filter((el: { ITEM_ID: number; }) => {
                return productFilterValue.some((f) => {
                    return f.ITEM_ID == el.ITEM_ID;
                });
            });

            filterDataLowestPricedLocations = filterDataLowestPricedLocations.filter((el: { ITEM_ID: number; }) => {
                return productFilterValue.some((f) => {
                    return f.ITEM_ID == el.ITEM_ID;
                });
            });
        }

        setLowInventoryDataList(filterDataLowInventory);
        setAgingInventoryDataList(filterDataAgingInventory);
        setExpirationApproachingDataList(filterDataExpirationApproaching);
        setTopPricedLocationsDataList(filterDataTopPricedLocations);
        setLowestPricedLocationsDataList(filterDataLowestPricedLocations);
    }

    //run when search input box typed for filter in existing locations
    const searchLocationHandler = (e: { target: { value: string; }; }) => {
        const filteredLocation = location.map((d: { LOCATION: string; }) => {
            return d.LOCATION.toLowerCase().includes(e.target.value.toLowerCase()) == true ? d : { LOCATION: "" };
        });

        setLocationData(filteredLocation);
    }

    //run when search input box typed for filter in existing products
    const searchProductHandler = (e: { target: { value: string; }; }) => {
        const filteredProduct = products.map((d: { ITEM_NAME: string; }) => {
            return d.ITEM_NAME.toLowerCase().includes(e.target.value.toLowerCase()) == true ? d : { ITEM_NAME: "", ITEM_ID: "" };
        });

        setProductData(filteredProduct);
    }

    const getOperateLocation = async () => {
        commonFetchAllUser('operate-region', dispatch)
            .then((res: any) => {
                if (!res || res.status != 200) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(
                (data) => {
                    if (data.status) {
                        setOperateLocation(data.regions)
                    } else {
                        toast.error(data.message);
                        setOperateLocation([])
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    // fetch coal mine & operate location data for first time
    useEffect(() => {
        getOperateLocation();

        if (!lowInventoryItemsLoaded) {
            dispatch(fetchLowInventoryItems());
        }
        if (!agingInventoryItemsLoaded) {
            dispatch(fetchAgingInventoryItems());
        }
        if (!expirationApproachingItemsLoaded) {
            dispatch(fetchExpirationApproachingItems());
        }
        if (!topPricedLocationsLoaded) {
            dispatch(fetchTopPricedLocations());
        }
        if (!lowestPricedLocationsLoaded) {
            dispatch(fetchLowestPricedLocations());
        }
    }, [])

    //set in state for lowInventoryItems
    useEffect(() => {
        if (lowInventoryItemsLoaded) {
            setLowInventoryDataList(lowInventoryInitialData);
        }
    }, [lowInventoryItemsLoaded]);

    //set in state for agingInventoryItems
    useEffect(() => {
        if (agingInventoryItemsLoaded) {
            setAgingInventoryDataList(agingInventoryInitialData);
        }
    }, [agingInventoryItemsLoaded]);

    //set in state for expirationApproachingItems
    useEffect(() => {
        if (expirationApproachingItemsLoaded) {
            setExpirationApproachingDataList(expirationApproachingInitialData);
        }
    }, [expirationApproachingItemsLoaded]);

    //set in state for topPricedLocations
    useEffect(() => {
        if (topPricedLocationsLoaded) {
            setTopPricedLocationsDataList(topPricedLocationsInitialData);
        }
    }, [topPricedLocationsLoaded]);

    //set in state for lowestPricedLocations
    useEffect(() => {
        if (lowestPricedLocationsLoaded) {
            setLowestPricedLocationsDataList(lowestPricedLocationsInitialData);
        }
    }, [lowestPricedLocationsLoaded]);

    //set in state for category, location, products dropdown data also set false for all checkbox array length
    useEffect(() => {
        setCheckedState((prevState: any) => ({
            ...prevState,
            activeCategory: new Array(mergeCategorieList?.length).fill(false),
        }));
        setCheckedState((prevState: any) => ({
            ...prevState,
            activeLocation: new Array(mergeLocationList?.length).fill(false),
        }));
        setCheckedState((prevState: any) => ({
            ...prevState,
            activeProducts: new Array(mergeProductList?.length).fill(false),
        }));

        setCategoryData(mergeCategorieList);
        setLocationData(mergeLocationList);
        setProductData(mergeProductList);
    }, [lowInventoryItemsLoaded, agingInventoryItemsLoaded, expirationApproachingItemsLoaded, topPricedLocationsLoaded, lowestPricedLocationsLoaded]);

    return (
        <>
            <Sidebar/>
            <div className='main-content'>
                <div className='cantainer'>
                    <div className='main-content card'>
                        <div className='shadow'>
                            <div className='row'>
                                <div className='col-xl-3' id="sticky-sidebar">
                                    <div className="sticky-top-1">
                                        <h4 className='px-2 border-bottom py-2 fw-600'>Market</h4>

                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <tbody>
                                                    {operateLocation.length > 0 && operateLocation.map((d: { ID: number; NAME: string }) => (
                                                        <tr key={`region-${d.ID}`}>
                                                            <td><label><input type="checkbox" />&nbsp; {d.NAME}</label></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Category</h4>
                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <label>
                                                                <input type="checkbox"
                                                                    checked={checkedState?.activeCategory.find((d) => d === false) === undefined ? true : false}
                                                                    onChange={(e) => {
                                                                        categoryFilterValue = [];
                                                                        if (checkedState?.activeCategory.find((d) => d === false) !== undefined) {
                                                                            categoryFilterValue.push(...categoryData.filter((d) => d.CATEGORY != ''));

                                                                            let obj = categoryData.map((d, i) => {
                                                                                return d.CATEGORY != '' ? true : false;
                                                                            })

                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeCategory: obj
                                                                            }));

                                                                            lowInventoryFilter();
                                                                        } else {
                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeCategory: new Array(category.length).fill(false),
                                                                            }));
                                                                            lowInventoryFilter();
                                                                        }
                                                                    }
                                                                    } />&nbsp; Select All</label>
                                                        </td>
                                                    </tr>
                                                    {categoryData.length > 0 && categoryData.map((d: any, position: number) => (
                                                        <tr className={d.CATEGORY == '' ? 'd-none' : ''} key={`region-${position}`}>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox"
                                                                        checked={checkedState?.activeCategory[position] == true ? true : false}
                                                                        value={d.CATEGORY}
                                                                        onChange={(e) => {
                                                                            let index = categoryFilterValue?.map((dt: { CATEGORY: string }) => dt.CATEGORY).indexOf(e?.target?.value);
                                                                            if (index === -1) {
                                                                                categoryFilterValue.push({ CATEGORY: e?.target?.value })
                                                                                lowInventoryFilter()
                                                                                handleCheckBoxStatus(position, 'activeCategory');
                                                                            }
                                                                            else {
                                                                                categoryFilterValue?.splice(index, 1);
                                                                                lowInventoryFilter()
                                                                                handleCheckBoxStatus(position, 'activeCategory');
                                                                            }

                                                                        }
                                                                        } />&nbsp; {d.CATEGORY}
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Brands</h4>
                                        <div style={{ maxHeight: "25vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <label>
                                                                <input type="checkbox"
                                                                    checked={checkedState?.activeBrands.find((d) => d === false) === undefined ? true : false}
                                                                    onChange={(e) => {
                                                                        brandFilterValue = [];
                                                                        if (checkedState?.activeBrands.find((d) => d === false) !== undefined) {
                                                                            brandFilterValue.push(...brands);
                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeBrands: new Array(brands.length).fill(true),
                                                                            }));
                                                                            lowInventoryFilter();
                                                                        }
                                                                        else {
                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeBrands: new Array(brands.length).fill(false),
                                                                            }));
                                                                            lowInventoryFilter();
                                                                        }
                                                                    }
                                                                    } />&nbsp; Select All
                                                            </label>
                                                        </td>
                                                    </tr>
                                                    {brands.length > 0 && brands.map((d: any, position: number) => (
                                                        <tr key={`region-${position}`}>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox"
                                                                        checked={checkedState?.activeBrands[position]}
                                                                        value={d.BRAND}
                                                                        onChange={(e) => {
                                                                            let index = brandFilterValue?.map((dt: { BRAND: string }) => dt.BRAND).indexOf(e?.target?.value);
                                                                            if (index === -1) {
                                                                                brandFilterValue.push({ BRAND: e?.target?.value })
                                                                                lowInventoryFilter();
                                                                                handleCheckBoxStatus(position, 'activeBrands');
                                                                            }
                                                                            else {
                                                                                brandFilterValue?.splice(index, 1);
                                                                                lowInventoryFilter();
                                                                                handleCheckBoxStatus(position, 'activeBrands');
                                                                            }

                                                                        }
                                                                        } />&nbsp; {d.BRAND}
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Locations</h4>
                                        <div style={{ maxHeight: "35vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                                                            <fieldset className="position-relative has-icon-left">
                                                                <input onChange={searchLocationHandler} type="text" className='form-control autoheight' placeholder='search' />
                                                                <div className="form-control-position top-0">
                                                                    <FaSearch />
                                                                </div>
                                                            </fieldset>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <label>
                                                                <input type="checkbox"
                                                                    checked={checkedState?.activeLocation.find((d) => d === false) === undefined ? true : false}
                                                                    onChange={(e) => {
                                                                        locationFilterValue = [];
                                                                        if (checkedState?.activeLocation.find((d) => d === false) !== undefined) {
                                                                            locationFilterValue.push(...locationData.filter((d) => d.LOCATION != ''));

                                                                            let obj = locationData.map((d, i) => {
                                                                                return d.LOCATION != '' ? true : false;
                                                                            })

                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeLocation: obj
                                                                            }));

                                                                            lowInventoryFilter();
                                                                        } else {
                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeLocation: new Array(location.length).fill(false),
                                                                            }));
                                                                            lowInventoryFilter();
                                                                        }
                                                                    }
                                                                    } />&nbsp; Select All</label>
                                                        </td>
                                                    </tr>
                                                    {locationData.length > 0 && locationData.map((d: any, position: number) => (
                                                        <tr className={d.LOCATION == '' ? 'd-none' : ''} key={`region-${position}`}>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox"
                                                                        checked={checkedState?.activeLocation[position] == true ? true : false}
                                                                        value={d.LOCATION}
                                                                        onChange={(e) => {
                                                                            let index = locationFilterValue?.map((dt: { LOCATION: string }) => dt.LOCATION).indexOf(e?.target?.value);
                                                                            if (index === -1) {
                                                                                locationFilterValue.push({ LOCATION: e?.target?.value })
                                                                                lowInventoryFilter();
                                                                                handleCheckBoxStatus(position, 'activeLocation');
                                                                            }
                                                                            else {
                                                                                locationFilterValue?.splice(index, 1);
                                                                                lowInventoryFilter();
                                                                                handleCheckBoxStatus(position, 'activeLocation');
                                                                            }

                                                                        }
                                                                        } />&nbsp; {d.LOCATION}
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <h4 className='px-2 border-bottom py-2 fw-600'>Products</h4>
                                        <div style={{ maxHeight: "35vh" }} className='table-responsive fixTableHead-full border border-light rounded shadow-lg mb-2'>
                                            <table className='align-items-center table-flush table padding-1'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
                                                            <fieldset className="position-relative has-icon-left">
                                                                <input onChange={searchProductHandler} type="text" className='form-control autoheight' placeholder='search' />
                                                                <div className="form-control-position top-0">
                                                                    <FaSearch />
                                                                </div>
                                                            </fieldset>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <label>
                                                                <input type="checkbox"
                                                                    checked={checkedState?.activeProducts.find((d) => d === false) === undefined ? true : false}
                                                                    onChange={(e) => {
                                                                        productFilterValue = [];
                                                                        if (checkedState?.activeProducts.find((d) => d === false) !== undefined) {
                                                                            productFilterValue.push(...productData.filter((d) => d.ITEM_ID != ''));

                                                                            let obj = productData.map((d, i) => {
                                                                                return d.ITEM_ID != '' ? true : false;
                                                                            })

                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeProducts: obj
                                                                            }));
                                                                            lowInventoryFilter();
                                                                        }
                                                                        else {
                                                                            setCheckedState((prevState: any) => ({
                                                                                ...prevState,
                                                                                activeProducts: new Array(products.length).fill(false),
                                                                            }));
                                                                            lowInventoryFilter();
                                                                        }
                                                                    }
                                                                    } />&nbsp; Select All</label>
                                                        </td>
                                                    </tr>
                                                    {productData.length > 0 && productData.map((d: any, position: number) => (
                                                        <tr className={d.ITEM_ID == '' ? 'd-none' : ''} key={`region-${position}`}>
                                                            <td>
                                                                <label>
                                                                    <input type="checkbox"
                                                                        checked={checkedState?.activeProducts[position] == true ? true : false}
                                                                        value={d.ITEM_ID}
                                                                        onChange={(e) => {
                                                                            let index = productFilterValue?.map((dt: { ITEM_ID: number }) => dt.ITEM_ID).indexOf(+e?.target?.value);
                                                                            console.log('index', index)
                                                                            if (index === -1) {
                                                                                productFilterValue.push({ ITEM_ID: +e?.target?.value, ITEM_NAME: d.ITEM_NAME })
                                                                                lowInventoryFilter();
                                                                                handleCheckBoxStatus(position, 'activeProducts');
                                                                            } else {
                                                                                productFilterValue?.splice(index, 1);
                                                                                lowInventoryFilter();
                                                                                handleCheckBoxStatus(position, 'activeProducts');
                                                                            }

                                                                        }
                                                                        } />&nbsp; {d.ITEM_NAME}
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-9' id='main'>
                                    <h2 className="mb-0 pt-2 px-2">Coal Mine</h2>
                                    <div className='shadow card'>
                                        <div className="container py-4">
                                            <div className="row">
                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Low Inventory
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Days of Inv</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lowInventoryItemsLoaded ? (
                                                                <>
                                                                    {lowInventoryDataList && lowInventoryDataList.length > 0 && Array.isArray(lowInventoryDataList) ? lowInventoryDataList?.map((d: any, i: Number) => (
                                                                        <tr key={i as number}>
                                                                            <td>{d.PACKAGES_ITEMFROMFACILITYNAME}</td>
                                                                            <td>{d.NAME}</td>
                                                                            <td>{d.PACKAGES_ITEM_NAME}</td>
                                                                            <td>{d.DAYS_OF_INVENTORY} Days</td>
                                                                        </tr>
                                                                    )) : (
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th colSpan={4}>No Data Found</th>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={5}>
                                                                        <FaSpinner size="2em" className="spinner" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Aging Inventory
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Days of Inv</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {agingInventoryItemsLoaded ? (
                                                                <>
                                                                    {agingInventoryDataList && agingInventoryDataList.length > 0 && Array.isArray(agingInventoryDataList) ? agingInventoryDataList?.map((d: any, i: Number) => (
                                                                        <tr key={i as number}>
                                                                            <td>{d.PACKAGES_ITEMFROMFACILITYNAME}</td>
                                                                            <td>{d.NAME}</td>
                                                                            <td>{d.PACKAGES_ITEM_NAME}</td>
                                                                            <td>{(+d.DAYS_OF_INVENTORY).toFixed(0)} Days</td>
                                                                        </tr>
                                                                    )) : (
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th colSpan={4}>No Data Found</th>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={4}>
                                                                        <FaSpinner size="2em" className="spinner" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Products Approaching Expiration
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Days Until Exp.</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {expirationApproachingItemsLoaded ? (
                                                                <>
                                                                    {expirationApproachingDataList && expirationApproachingDataList.length > 0 && Array.isArray(expirationApproachingDataList) ? expirationApproachingDataList?.map((d: any, i: Number) => (
                                                                        <tr key={i as number}>
                                                                            <td>{d.PACKAGES_ITEMFROMFACILITYNAME}</td>
                                                                            <td>{d.NAME}</td>
                                                                            <td>{d.PACKAGES_ITEM_NAME}</td>
                                                                            <td>{d.DAYS_UNTIL_EXPIRATION} Days</td>
                                                                        </tr>
                                                                    )) : (
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th colSpan={4}>No Data Found</th>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={4}>
                                                                        <FaSpinner size="2em" className="spinner" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Forecast Variance
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Forecas</th>
                                                                <th>Actua</th>
                                                                <th>Varianc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrid .5g Sativa Vape</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kind Love</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Best Buds</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>.5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Columbia Care</td>
                                                                <td>1555 Newton ST</td>
                                                                <td>Hybrif .5g Joint Indica</td>
                                                                <td>100</td>
                                                                <td>120</td>
                                                                <td>20%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Top Priced Locations
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {topPricedLocationsLoaded ? (
                                                                <>
                                                                    {topPricedLocationsDataList && topPricedLocationsDataList.length > 0 && Array.isArray(topPricedLocationsDataList) ? topPricedLocationsDataList?.map((d: any, i: Number) => (
                                                                        <tr key={i as number}>
                                                                            <td>{d.ITEMFROMFACILITYNAME}</td>
                                                                            <td>{d.NAME}</td>
                                                                            <td>{d.ITEM_NAME}</td>
                                                                            <td>${d.PRICE}</td>
                                                                        </tr>
                                                                    )) : (
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th colSpan={4}>No Data Found</th>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={5}>
                                                                        <FaSpinner size="2em" className="spinner" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <h3 className='px-2 border-bottom fw-600'>
                                                    Lowest Priced Locations
                                                </h3>
                                                <div className='table-responsive border border-light rounded shadow-lg fixTableHead shadow-lg mb-2 bg-white rounded'>
                                                    <table className='align-items-center table-flush table padding-1'>
                                                        <thead>
                                                            <tr>
                                                                <th>Retailer</th>
                                                                <th>Location</th>
                                                                <th>SKU</th>
                                                                <th>Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {lowestPricedLocationsLoaded ? (
                                                                <>
                                                                    {lowestPricedLocationsDataList && lowestPricedLocationsDataList.length > 0 && Array.isArray(lowestPricedLocationsDataList) ? lowestPricedLocationsDataList?.map((d: any, i: Number) => (
                                                                        <tr key={i as number}>
                                                                            <td>{d.ITEMFROMFACILITYNAME}</td>
                                                                            <td>{d.NAME}</td>
                                                                            <td>{d.ITEM_NAME}</td>
                                                                            <td>${d.PRICE}</td>
                                                                        </tr>
                                                                    )) : (
                                                                        <tr style={{ textAlign: "center" }}>
                                                                            <th colSpan={4}>No Data Found</th>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={5}>
                                                                        <FaSpinner size="2em" className="spinner" />
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CoalMine;
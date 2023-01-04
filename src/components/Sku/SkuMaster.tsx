import React, { useState, useEffect, useMemo } from 'react';
import { SelectPicker, Modal, Button, Table } from 'rsuite';
import axios from 'axios';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
const { Column, HeaderCell, Cell } = Table;

import { authHeader } from '../../helpers/auth-header';
import { commonFetchAllAuth, commonSubmit, logout } from '../../services/UserServices';
import { getBrandList, getSizeList, getCategoryList, getDominanceList, getFlavorStrainList, getFormList } from '../../services/CommonServices';
import AddSku from './AddSku';
import EditBatch from './EditBatch';
import UploadSku from './UploadSku';

const baseURL = process.env.API_PATH + 'sku-products';

//FOR SKU TAB
const getSKUTableData = (page: number, postsPerPage: number, posts: any[], searchText: string, searchBrand: string, sortColumn: string | number | undefined, sortType: string | undefined, brandList: any[]) => {
  if (posts.length > 0) {
    const start = (+page - 1) * postsPerPage;

    const end = +postsPerPage + (+start);

    let filteredPost = posts;

    if (searchText) {
      filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchText.toLowerCase()));
    }

    if (searchBrand) {
      const getBrandLabel = brandList.find((d) => d.value === searchBrand)?.label;
      filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
    }

    if (sortColumn && sortType) {
      const sorted = filteredPost.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });

      return sorted.slice(start, end);
    }

    return Array.isArray(filteredPost) ? filteredPost.slice(start, end) : [];
  } else {
    return [];
  }
}

//FOR RFID TAB
const getRFIDTableData = (pageRFID: string | number, perPageRFID: number, RFIDItem: any, searchTextRFID: string, searchBrandRFID: any, sortColumnRFID: string | undefined, sortTypeRFID: string | undefined, brandList: any[], basicActive: string) => {
  if (RFIDItem.length > 0 && basicActive === 'tab2') {
    const start = (+pageRFID - 1) * perPageRFID;

    const end = +perPageRFID + (+start);

    let filteredPost = RFIDItem;

    if (searchTextRFID) {
      filteredPost = filteredPost.filter((d: { ITEM_NAME: string; }) => d.ITEM_NAME.toLowerCase().includes(searchTextRFID.toLowerCase()));
    }

    if (searchBrandRFID) {
      const getBrandLabel = brandList.find((d) => d.value === searchBrandRFID)?.label;
      filteredPost = filteredPost.filter((d: { BRAND: any; }) => d.BRAND === getBrandLabel);
    }

    if (sortColumnRFID && sortTypeRFID) {
      const sorted = filteredPost.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        let x = a[sortColumnRFID];
        let y = b[sortColumnRFID];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortTypeRFID === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });

      return sorted.slice(start, end);
    }

    return Array.isArray(filteredPost) ? filteredPost.slice(start, end) : [];
  } else {
    return [];
  }
};

//FOR Exceptions TAB
const getExcTableData = (pageExc: number, postsPerPageExc: number, exceptionsItem: any[], searchTextExc: string | undefined, searchBrandExc: string | undefined, sortColumnExc: string | number | undefined, sortTypeExc: string | undefined, brandList: any[], basicActive: string) => {
  if (exceptionsItem.length > 0 && basicActive === 'tab3') {
    const start = (+pageExc - 1) * postsPerPageExc;

    const end = +postsPerPageExc + (+start);

    let filteredPost = exceptionsItem;

    if (searchTextExc) {
      filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchTextExc.toLowerCase()));
    }

    if (searchBrandExc) {
      const getBrandLabel = brandList.find((d) => d.value === searchBrandExc)?.label;
      filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
    }

    if (sortColumnExc && sortTypeExc) {
      const sorted = filteredPost.sort((a, b) => {
        let x = a[sortColumnExc];
        let y = b[sortTypeExc];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortTypeExc === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });

      return sorted.slice(start, end);
    }

    return Array.isArray(filteredPost) ? filteredPost?.slice(start, end) : [];
  } else {
    return [];
  }
};

const SkuMaster = () => {
  const dispatch = useDispatch();

  const [basicActive, setBasicActive] = useState('tab1');
  const [exceptionsItem, setExceptionsItem] = useState<any[]>([]);
  const [RFIDItem, setRFIDItem] = useState<any[]>([]);

  const [posts, setPosts] = useState<any[]>([]);
  const [product, setProduct] = useState<any[]>([]);

  const [searchText, setSearchText] = useState('');
  const [searchTextExc, setSearchTextExc] = useState('');
  const [searchTextRFID, setSearchTextRFID] = useState('');
  const [total, setTotal] = useState(0);
  const [totalExc, setTotalExc] = useState(0);
  const [totalRFID, setTotalRFID] = useState(0);
  const [page, setPage] = useState(1);
  const [pageExc, setPageExc] = useState(1);
  const [pageRFID, setPageRFID] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [postsPerPageExc, setPostsPerPageExc] = useState(10);
  const [perPageRFID, setPerPageRFID] = useState(10);
  const [bodyLoaderClass, setBodyLoaderClass] = useState("");

  const [selectValue, setSelectValue] = React.useState<any[]>([]);
  const [brandList, setBrandList] = useState<any[]>([]);
  const [sizeList, setSizeList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [dominanceList, setDominanceList] = useState<any[]>([]);
  const [flavorStrainList, setFlavorStrainList] = useState<any[]>([]);
  const [formList, setFormList] = useState<any[]>([]);
  const [skuChanged, setSkuChanged] = useState(false);
  const [excChanged, setExcChanged] = useState(false);
  const [RFIDChanged, setRFIDChanged] = useState(false);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchBrandRFID, setSearchBrandRFID] = useState('');
  const [searchBrandExc, setSearchBrandExc] = useState('');
  const [mapConfirmModalShow, setMapConfirmModalShow] = useState(false);
  const [mapConfirmPopupObj, setMapConfirmPopupObj] = useState({ rfid: "", mapped_item: "", mapped_to_item: "", mapped_item_id: 0, mapped_to_item_id: 0, index: 0 });

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const [sortColumnRFID, setSortColumnRFID] = useState();
  const [sortTypeRFID, setSortTypeRFID] = useState();
  const [loadingRFID, setLoadingRFID] = useState(false);

  const [sortColumnExc, setSortColumnExc] = useState();
  const [sortTypeExc, setSortTypeExc] = useState();
  const [loadingExc, setLoadingExc] = useState(false);

  const addSkuHelper = {
    setProduct,
    setSkuChanged,
    setPosts,
    brandList,
    sizeList,
    categoryList,
    dominanceList,
    flavorStrainList,
    formList,
    buttonName: 'Add Product',
    buttonClass: "btn btn-primary",
  }

  const editSkuHelper = {
    setProduct,
    setSkuChanged,
    setPosts,
    brandList,
    sizeList,
    categoryList,
    dominanceList,
    flavorStrainList,
    formList,
    buttonName: 'Edit',
    buttonClass: "btn btn-success btn-sm",
  }

  const cloneSkuHelper = {
    setProduct,
    setSkuChanged,
    setPosts,
    brandList,
    sizeList,
    categoryList,
    dominanceList,
    flavorStrainList,
    formList,
    buttonName: 'Clone',
    buttonClass: "btn btn-primary btn-sm",
  }

  const editBatchHelper = {
    setRFIDChanged,
    setRFIDItem,
    buttonName: 'Edit',
    buttonClass: "btn btn-success btn-sm",
  }

  const uploadSkuHelper = {
    buttonName: 'Upload',
    buttonClass: "btn btn-danger",
  }

  const blankObj = {
    ID: 0,
    SIZE: "",
    BRAND: "",
    CATEGORY_NAME: "",
    DOMINANCE: "",
    ITEM_NAME: "",
    TIER: "",
    FLAVOR_STRAIN: "",
    FORM: "",
    RFID: ""
  };

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const loadData = async (search = '', pageno = 0, limit = 10) => {
    setLoading(true);
    const defaultOptions = {
      headers: {
        ...authHeader(),
      },
    };
    axios
      .get(
        baseURL + '?search=' + search + '&pageno=' + pageno + '&limit=' + limit,
        { ...defaultOptions }
      )
      .then((response) => {
        setPosts(response?.data || []);
        setTotal(response?.data?.length || 0);
        setLoading(false);
        setProduct(response?.data?.map((d: { ITEM_NAME: any; ID: any; }) => ({ label: d.ITEM_NAME, value: d.ID })));
      })
      .catch((error) => {
        if (error?.response?.status == '403' || error?.response?.status == '401') {
          logout(dispatch);
        }
      });
  };

  //call when post per count change
  const onShowSizeChange = (
    _current: any,
    pageSize: React.SetStateAction<number>
  ) => {
    setPostsPerPage(pageSize);
  };

  const onShowSizeChangeExc = (
    _current: any,
    pageSize: React.SetStateAction<number>
  ) => {
    setPostsPerPageExc(pageSize);
  };

  const onShowSizeChangeRFID = (
    _current: any,
    pageSize: React.SetStateAction<number>
  ) => {
    setPerPageRFID(pageSize);
  };

  //pagination text render
  const itemRender = (current: any, type: string, originalElement: any) => {
    if (type === 'prev') {
      return (
        <a>
          <b>Previous</b>
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a>
          <b>Next</b>
        </a>
      );
    }
    return originalElement;
  };

  const mapConfirmHandleClose = (type: string) => {
    if (type === 'yes') {
      productMapConfirmed(mapConfirmPopupObj.mapped_to_item_id, mapConfirmPopupObj.mapped_item_id, mapConfirmPopupObj.index);
    } else {
      setSelectValue((pre) => ({ ...pre, [mapConfirmPopupObj.index]: "" }));
      setMapConfirmModalShow(false);
    }
  }

  //call when product map from exceptions section
  const productMap = (mapped_to_item_id: number, mapped_item_id: number, index: number) => {
    if ((+mapped_to_item_id || 0) > 0 && (+mapped_item_id || 0) > 0) {

      const mapped_item = exceptionsItem.find((d) => d.ID === mapped_item_id);

      if (mapped_item && mapped_item !== undefined) {

        const findItemName = product.find((d) => d.value === mapped_to_item_id).label;

        setMapConfirmPopupObj((pre) => ({
          rfid: mapped_item.RFID,
          mapped_item: mapped_item.ITEM_NAME,
          mapped_to_item: findItemName,
          mapped_item_id: mapped_item_id,
          mapped_to_item_id: mapped_to_item_id,
          index: index
        }))

        setSelectValue((pre) => ({ ...pre, [index]: mapped_to_item_id }));

        setMapConfirmModalShow(true);
      }
    }
  }

  const productMapConfirmed = (mapped_to_item_id: number, mapped_item_id: number, index: number) => {
    if ((+mapped_to_item_id || 0) > 0 && (+mapped_item_id || 0) > 0) {
      setBodyLoaderClass("cover-spin");

      //setSelectValue((pre) => ({ ...pre, [index]: mapped_to_item_id }));

      const data_to_send = { mapped_to_item_id, mapped_item_id };

      commonSubmit(data_to_send, 'sku-exceptions-item-mapping', dispatch)
        .then((res: any) => {
          if (!res || res.status != 200) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            if (data.res) {
              toast.success(data.message);
              //first get unique id then remove it from exception table
              const mapped_item_unique_id = exceptionsItem.find((d) => d.ID === mapped_item_id).UNIQUE_ID;

              const removedArr = exceptionsItem.filter(function (obj) {
                return obj.ID !== (+mapped_item_id || 0);
              });

              //replace all DESTINATION_ITEM_NAME where it is mentioned with mapped_to_item_id name
              const findItemName = product.find((d) => d.value === mapped_to_item_id).label;

              const updatedDestinationName = removedArr.map(function (obj) {
                return { ...obj, DESTINATION_ITEM_NAME: obj.DESTINATION_ITEM === mapped_item_unique_id ? findItemName : obj.DESTINATION_ITEM_NAME };
              });

              setExceptionsItem(updatedDestinationName);

              setSelectValue(new Array(removedArr?.length).fill(""));
              setExcChanged(pre => !pre);
              setBodyLoaderClass("");
              setMapConfirmModalShow(false);
            }
          },
          (err) => {
            console.log(err);
            toast.error('Something went wrong');
            setBodyLoaderClass("");
            setMapConfirmModalShow(false);
          }
        );
    } else {
      setMapConfirmModalShow(false);
    }
  }

  //run when search enter, page change, post per change for SKU Master
  useEffect(() => {
    let filteredPost = posts;
    if (filteredPost.length > 0) {
      if (searchText) {
        filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchText.toLowerCase()));
      }

      if (searchBrand) {
        const getBrandLabel = brandList.find((d) => d.value === searchBrand)?.label;
        filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
      }

      setTotal(filteredPost.length);
    }
  }, [searchText, skuChanged, searchBrand]);

  //run when search enter, page change, post per change for SKU Exceptions Master
  useEffect(() => {
    let filteredPost = exceptionsItem;

    if (filteredPost.length > 0) {
      if (searchTextExc) {
        filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchTextExc.toLowerCase()));
      }

      if (searchBrandExc) {
        const getBrandLabel = brandList.find((d) => d.value === searchBrandExc)?.label;
        filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
      }

      setTotalExc(filteredPost.length);
    }
  }, [searchTextExc, searchBrandExc, excChanged]);

  //run when search enter, page change, post per change for RFID Master
  useEffect(() => {
    let filteredPost = RFIDItem;

    if (filteredPost.length > 0) {
      if (searchTextRFID) {
        filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchTextRFID.toLowerCase()));
      }

      if (searchBrandRFID) {
        const getBrandLabel = brandList.find((d) => d.value === searchBrandRFID)?.label;
        filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
      }

      setTotalRFID(filteredPost.length);
    }
  }, [searchTextRFID, searchBrandRFID]);

  //call api for sku products
  useEffect(() => {
    loadData(searchText, Number(page) - 1, Number(postsPerPage));
  }, []);

  // sku exception items
  useEffect(() => {
    const getExceptionsItem = () => {
      setLoadingExc(true);
      commonFetchAllAuth('sku-exceptions-items', dispatch)
        .then((res: any) => {
          if (!res || res.status != 200) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setExceptionsItem(data);
            setSelectValue(new Array(data?.length).fill(""));
            setTotalExc(data?.length || 0);
            setLoadingExc(false);
          },
          (err) => {
            setLoadingExc(false);
            console.log(err);
          }
        );
    }

    getExceptionsItem();
  }, [])

  //RFIDS Tab
  useEffect(() => {
    const getBatchInventory = () => {
      setLoadingRFID(true);
      commonFetchAllAuth('batch-level-inventory', dispatch)
        .then((res: any) => {
          if (!res || res.status != 200) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (data) => {
            setRFIDItem(data);
            setTotalRFID(data?.length || 0);
            setLoadingRFID(false);
          },
          (err) => {
            setLoadingRFID(false);
            console.log(err);
          }
        );
    }

    getBatchInventory();
  }, [])

  //get brand list & other attributes
  useEffect(() => {
    getBrandList(dispatch).then((data) => setBrandList(data?.map((d: { NAME: any; ID: any; }) => ({ label: d.NAME, value: d.ID }))));

    getSizeList(dispatch).then((data) => setSizeList(data?.map((d: { NAME: any; ID: any; }) => ({ label: d.NAME, value: d.ID }))));

    getCategoryList(dispatch).then((data) => setCategoryList(data?.map((d: { NAME: any; ID: any; }) => ({ label: d.NAME, value: d.ID }))));

    getDominanceList(dispatch).then((data) => setDominanceList(data?.map((d: { NAME: any; ID: any; }) => ({ label: d.NAME, value: d.ID }))));

    getFlavorStrainList(dispatch).then((data) => setFlavorStrainList(data?.map((d: { NAME: any; ID: any; }) => ({ label: d.NAME, value: d.ID }))));

    getFormList(dispatch).then((data) => setFormList(data?.map((d: { NAME: any; ID: any; }) => ({ label: d.NAME, value: d.ID }))));
  }, [])

  //For SKU Tab
  const skuTableData = useMemo(() => getSKUTableData(page, postsPerPage, posts, searchText, searchBrand, sortColumn, sortType, brandList), [page, postsPerPage, posts.length, searchText, searchBrand, sortColumn, sortType, skuChanged]);

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const setSearchTextHandler = (searchText: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPage(1);
      setSearchText(searchText);
    }, 100);
  };

  const setSearchBrandHandler = (searchBrand: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPage(1);
      setSearchBrand(searchBrand)
    }, 100);
  };

  //FOR RFID TAB
  const RFIDTableData = useMemo(() => getRFIDTableData(pageRFID, perPageRFID, RFIDItem, searchTextRFID, searchBrandRFID, sortColumnRFID, sortTypeRFID, brandList, basicActive), [pageRFID, perPageRFID, RFIDItem.length, searchTextRFID, searchBrandRFID, sortColumnRFID, sortTypeRFID, basicActive, RFIDChanged]);

  const handleSortColumnRFID = (sortColumn: any, sortType: any) => {
    setLoadingRFID(true);
    setTimeout(() => {
      setLoadingRFID(false);
      setSortColumnRFID(sortColumn);
      setSortTypeRFID(sortType);
    }, 500);
  };

  const setSearchTextRFIDHandler = (searchText: any) => {
    setLoadingRFID(true);
    setTimeout(() => {
      setLoadingRFID(false);
      setPageRFID(1);
      setSearchTextRFID(searchText);
    }, 100);
  };

  const setSearchBrandRFIDHandler = (searchBrand: any) => {
    setLoadingRFID(true);
    setTimeout(() => {
      setLoadingRFID(false);
      setPageRFID(1);
      setSearchBrandRFID(searchBrand)
    }, 100);
  };

  //FOR EXCEPTIONS TAB
  const excTableData = useMemo(() => getExcTableData(pageExc, postsPerPageExc, exceptionsItem, searchTextExc, searchBrandExc, sortColumnExc, sortTypeExc, brandList, basicActive), [pageExc, postsPerPageExc, exceptionsItem.length, searchTextExc, searchBrandExc, sortColumnExc, sortTypeExc, basicActive, excChanged]);

  const handleSortColumnExc = (sortColumn: any, sortType: any) => {
    setLoadingExc(true);
    setTimeout(() => {
      setLoadingExc(false);
      setSortColumnExc(sortColumn);
      setSortTypeExc(sortType);
    }, 500);
  };

  const setSearchTextExcHandler = (searchText: any) => {
    setLoadingExc(true);
    setTimeout(() => {
      setLoadingExc(false);
      setPageExc(1);
      setSearchTextExc(searchText);
    }, 100);
  };

  const setSearchBrandExcHandler = (searchBrand: any) => {
    setLoadingExc(true);
    setTimeout(() => {
      setLoadingExc(false);
      setPageExc(1);
      setSearchBrandExc(searchBrand)
    }, 100);
  };

  return (
    <>
      <div className={bodyLoaderClass}></div>
      <div className='container'>
        <div
          className='border-0 card-header'
          style={{ padding: '1.25rem 1.5rem 1.25rem 0.6rem' }}
        >
          <div className='align-items-center row'>
            <div className='col'>
              <h1 className='mb-0'>SKU Master</h1>
            </div>
            <form className='form-inline my-2 my-lg-0'>
              {basicActive === 'tab1' && (
                <>
                  <input
                    className='form-control mr-sm-2'
                    type='search'
                    placeholder='Search'
                    aria-label='Search'
                    value={searchText}
                    onChange={(e) => {
                      setSearchTextHandler(e.target.value);
                    }}
                  />
                  <SelectPicker value={searchBrand} placeholder="All Brands" size="lg" data={brandList} style={{ width: 200 }} onChange={(d: any) => setSearchBrandHandler(d)} />
                </>
              )}
              {basicActive === 'tab2' && (
                <>
                  <input
                    className='form-control mr-sm-2'
                    type='search'
                    placeholder='Search'
                    aria-label='Search'
                    value={searchTextRFID}
                    onChange={(e) => {
                      setSearchTextRFIDHandler(e.target.value);
                    }}
                  />
                  <SelectPicker value={searchBrandRFID} placeholder="All Brands" size="lg" data={brandList} style={{ width: 200 }} onChange={(d: any) => setSearchBrandRFIDHandler(d)} />
                </>
              )}
              {basicActive === 'tab3' && (
                <>
                  <input
                    className='form-control mr-sm-2'
                    type='search'
                    placeholder='Search'
                    aria-label='Search'
                    value={searchTextExc}
                    onChange={(e) => {
                      setSearchTextExcHandler(e.target.value);
                    }}
                  />
                  <SelectPicker value={searchBrandExc} placeholder="All Brands" size="lg" data={brandList} style={{ width: 200 }} onChange={(d: any) => setSearchBrandExcHandler(d)} />
                </>
              )}
            </form>{' '}
          </div>
        </div>
        <ul className='nav nav-tabs mb-3' role='tablist'>
          <li className='nav-item' role='presentation'>
            <a
              className={basicActive === 'tab1' ? 'nav-link active' : 'nav-link'}
              data-mdb-toggle='tab'
              role='tab'
              aria-selected='true'
              onClick={() => handleBasicClick('tab1')}
            >
              Product ({total})
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className={basicActive === 'tab2' ? 'nav-link active' : 'nav-link'}
              data-mdb-toggle='tab'
              role='tab'
              onClick={() => handleBasicClick('tab2')}
              aria-selected='false'
            >
              RFID ({totalRFID})
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className={basicActive === 'tab3' ? 'nav-link active' : 'nav-link'}
              data-mdb-toggle='tab'
              role='tab'
              onClick={() => handleBasicClick('tab3')}
              aria-selected='false'
            >
              Exceptions ({totalExc})
            </a>
          </li>
          <div className='col text-right'>
            <AddSku helper={addSkuHelper} formData={blankObj} />
            <UploadSku helper={uploadSkuHelper} />
          </div>
        </ul>

        <div className='tab-content'>
          {/* SKU MASTER */}
          <div
            className={
              basicActive === 'tab1'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            role='tabpanel'
          >
            <div className='shadow card my-4'>
              <Table
                height={420}
                autoHeight={true}
                data={skuTableData}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                wordWrap="break-word"
              >
                <Column width={100} align="center" fixed sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>ID</HeaderCell>
                  <Cell dataKey="ID" />
                </Column>
                <Column width={175} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>BRAND</HeaderCell>
                  <Cell dataKey="BRAND" />
                </Column>
                <Column width={250} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>PRODUCT NAME</HeaderCell>
                  <Cell dataKey="ITEM_NAME" />
                </Column>

                <Column width={175} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>CATEGORY</HeaderCell>
                  <Cell dataKey="CATEGORY_NAME" />
                </Column>

                <Column width={100} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>SIZE</HeaderCell>
                  <Cell dataKey="SIZE" />
                </Column>

                <Column width={75}>
                  <HeaderCell>{" "}</HeaderCell>
                  <Cell style={{ padding: '10px 0' }}>
                    {(rowData: any) => <AddSku helper={editSkuHelper} formData={rowData} />}
                  </Cell>
                </Column>

                <Column width={75}>
                  <HeaderCell>{" "}</HeaderCell>
                  <Cell style={{ padding: '10px 0' }}>
                    {(rowData: any) => <AddSku helper={cloneSkuHelper} formData={{ ...rowData, ID: 0 }} />}
                  </Cell>
                </Column>
              </Table>
              <div className='col text-right'>
                <Pagination
                  onChange={(value) => setPage(value)}
                  pageSize={postsPerPage}
                  total={total}
                  current={page}
                  showSizeChanger
                  showQuickJumper
                  onShowSizeChange={onShowSizeChange}
                  itemRender={itemRender}
                />
              </div>
            </div>
          </div>
          {/* RFID TAB */}
          <div
            className={
              basicActive === 'tab2'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            role='tabpanel'
          >
            <div className='shadow card my-4'>
              <Table
                height={420}
                autoHeight={true}
                data={RFIDTableData}
                sortColumn={sortColumnRFID}
                sortType={sortTypeRFID}
                onSortColumn={handleSortColumnRFID}
                loading={loadingRFID}
                wordWrap="break-word"
              >
                <Column width={300} align="center" fixed sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>RFID</HeaderCell>
                  <Cell dataKey="RFID" />
                </Column>
                <Column width={300} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>PRODUCT NAME</HeaderCell>
                  <Cell dataKey="ITEM_NAME" />
                </Column>
                <Column width={200} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>LOCATION</HeaderCell>
                  <Cell>
                    {(rowData: any) => rowData.NAME.replace(/___/g, ',')}
                  </Cell>
                </Column>

                <Column width={100} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>QUAN</HeaderCell>
                  <Cell dataKey="ONHANDD_VALUE" />
                </Column>

                <Column width={100}>
                  <HeaderCell>{" "}</HeaderCell>
                  <Cell style={{ padding: '10px 0' }}>
                    {(rowData: any) => <EditBatch helper={editBatchHelper} formData={rowData} />}
                  </Cell>
                </Column>
              </Table>
              <div className='col text-right'>
                <Pagination
                  onChange={(value) => setPageRFID(value)}
                  pageSize={perPageRFID}
                  total={totalRFID}
                  current={pageRFID}
                  showSizeChanger
                  showQuickJumper
                  onShowSizeChange={onShowSizeChangeRFID}
                  itemRender={itemRender}
                />
              </div>
            </div>
          </div>
          {/* EXCEPTION TAB */}
          <div
            className={
              basicActive === 'tab3'
                ? 'tab-pane fade show active'
                : 'tab-pane fade'
            }
            role='tabpanel'
          >
            <div className='shadow card my-4'>
              <Table
                height={420}
                autoHeight={true}
                data={excTableData}
                sortColumn={sortColumnExc}
                sortType={sortTypeExc}
                onSortColumn={handleSortColumnExc}
                loading={loadingExc}
                wordWrap="break-word"
              >
                <Column width={250} align="center" fixed sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>RFID</HeaderCell>
                  <Cell dataKey="RFID" />
                </Column>
                <Column width={250} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>SOURCE NAME</HeaderCell>
                  <Cell dataKey="ITEM_NAME" />
                </Column>
                <Column width={250} sortable>
                  <HeaderCell style={{ fontSize: "16px" }}>DESTINATION NAME</HeaderCell>
                  <Cell dataKey="DESTINATION_ITEM_NAME" />
                </Column>

                <Column width={250}>
                  <HeaderCell style={{ fontSize: "16px" }}>PRODUCT NAME</HeaderCell>
                  <Cell style={{ padding: '10px 0' }}>
                    {(rowData: any, rowIndex: number | undefined) => <SelectPicker value={selectValue[rowIndex || 0]} data={product} style={{ width: 200 }} onChange={(e: any) => productMap(e, rowData.ID, rowIndex || 0)} />}
                  </Cell>
                </Column>
              </Table>
              <div className='col text-right'>
                <Pagination
                  onChange={(value) => setPageExc(value)}
                  pageSize={postsPerPageExc}
                  total={totalExc}
                  current={pageExc}
                  showSizeChanger
                  showQuickJumper
                  onShowSizeChange={onShowSizeChangeExc}
                  itemRender={itemRender}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal backdrop={`static`} keyboard={false} open={mapConfirmModalShow} onClose={() => mapConfirmHandleClose('no')}>
        <Modal.Header>
          <Modal.Title>Confirmation for mapping SKU</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <small><span className='text-danger'>RFID: </span> {mapConfirmPopupObj.rfid}</small>
          <br></br>
          <small><span className='text-danger'>SOURCE NAME:</span> {mapConfirmPopupObj.mapped_item}</small>
          <br></br>
          <small><span className='text-danger'>MAP TO:</span> {mapConfirmPopupObj.mapped_to_item}</small>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => mapConfirmHandleClose('yes')} appearance="primary">
            Yes
          </Button>
          <Button onClick={() => mapConfirmHandleClose('no')} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SkuMaster;
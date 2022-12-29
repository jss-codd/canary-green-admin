import React, { useState, useEffect } from 'react';
import { SelectPicker, Modal, Button } from 'rsuite';
import axios from 'axios';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

import { authHeader } from '../../helpers/auth-header';
import { commonFetchAllAuth, commonSubmit, logout } from '../../services/UserServices';
import { getBrandList, getSizeList, getCategoryList, getDominanceList, getFlavorStrainList, getFormList } from '../../services/CommonServices';
import AddSku from './AddSku';
import EditBatch from './EditBatch';
import UploadSku from './UploadSku';

const baseURL = process.env.API_PATH + 'sku-products';

export default function SkuMaster() {
  const dispatch = useDispatch();

  const [basicActive, setBasicActive] = useState('tab1');
  const [exceptionsItem, setExceptionsItem] = useState<any[]>([]);
  const [RFIDItem, setRFIDItem] = useState<any[]>([]);

  const [posts, setPosts] = useState<any[]>([]);
  const [filterPosts, setFilterPosts] = useState<any[]>([]);
  const [filterPostsExc, setFilterPostsExc] = useState<any[]>([]);
  const [filterRFID, setFilterRFID] = useState<any[]>([]);
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
  const [loadingClass, setLoadingClass] = useState('');
  const [loadingClassExc, setLoadingClassExc] = useState('');
  const [loadingClassRFID, setLoadingClassRFID] = useState('');
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
    FORM: ""
  };

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const loadData = async (search = '', pageno = 0, limit = 10) => {
    setLoadingClass('loading');
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
        setFilterPosts((response?.data || []).slice(0, postsPerPage));
        setTotal(response?.data?.length || 0);
        setLoadingClass('');
        setProduct(response?.data?.map((d: { ITEM_NAME: any; ID: any; }) => ({ label: d.ITEM_NAME, value: d.ID })));
      })
      .catch((error) => {
        console.log('error', error.response.status);
        if (error.response.status == '403' || error.response.status == '401') {
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

      const start = (+page - 1) * postsPerPage;
      const end = +postsPerPage + (+start);

      filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchText.toLowerCase()));

      if (searchBrand) {
        const getBrandLabel = brandList.find((d) => d.value === searchBrand)?.label;
        filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
      }

      setFilterPosts(filteredPost.slice(start, end));

      setTotal(filteredPost.length);
    }
  }, [searchText, page, postsPerPage, skuChanged, searchBrand]);

  //run when search enter, page change, post per change for SKU Exceptions Master
  useEffect(() => {
    let filteredPost = exceptionsItem;

    if (filteredPost.length > 0) {
      const start = (+pageExc - 1) * postsPerPageExc;
      const end = +postsPerPageExc + (+start);

      filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchTextExc.toLowerCase()));

      if (searchBrandExc) {
        const getBrandLabel = brandList.find((d) => d.value === searchBrandExc)?.label;
        filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
      }

      setFilterPostsExc(filteredPost.slice(start, end));

      setTotalExc(filteredPost.length);
    }
  }, [searchTextExc, pageExc, postsPerPageExc, searchBrandExc, excChanged]);

  //run when search enter, page change, post per change for RFID Master
  useEffect(() => {
    let filteredPost = RFIDItem;

    if (filteredPost.length > 0) {
      const start = (+pageRFID - 1) * perPageRFID;
      const end = +perPageRFID + (+start);

      filteredPost = filteredPost.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchTextRFID.toLowerCase()));

      if (searchBrandRFID) {
        const getBrandLabel = brandList.find((d) => d.value === searchBrandRFID)?.label;
        filteredPost = filteredPost.filter((d) => d.BRAND === getBrandLabel);
      }

      setFilterRFID(filteredPost.slice(start, end));

      setTotalRFID(filteredPost.length);
    }
  }, [searchTextRFID, pageRFID, perPageRFID, RFIDChanged, searchBrandRFID]);

  //call api for sku products
  useEffect(() => {
    loadData(searchText, Number(page) - 1, Number(postsPerPage));
  }, []);

  // sku exception items
  useEffect(() => {
    const getExceptionsItem = () => {
      setLoadingClassExc('loading');
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
            setFilterPostsExc((data || []).slice(0, postsPerPageExc));
            setTotalExc(data?.length || 0);
            setLoadingClassExc('');
          },
          (err) => {
            setLoadingClassExc('');
            console.log(err);
          }
        );
    }

    getExceptionsItem();
  }, [])

  //RFIDS Tab
  useEffect(() => {
    const getBatchInventory = () => {
      setLoadingClassRFID('loading');
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
            setFilterRFID((data || []).slice(0, perPageRFID));
            setTotalRFID(data?.length || 0);
            setLoadingClassRFID('');
          },
          (err) => {
            setLoadingClassRFID('');
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
                      setPage(1);
                      setSearchText(e.target.value);
                    }}
                  />
                  <SelectPicker value={searchBrand} placeholder="All Brands" size="lg" data={brandList} style={{ width: 200 }} onChange={(d: any) => setSearchBrand(d)} />
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
                      setPageRFID(1);
                      setSearchTextRFID(e.target.value);
                    }}
                  />
                  <SelectPicker value={searchBrandRFID} placeholder="All Brands" size="lg" data={brandList} style={{ width: 200 }} onChange={(d: any) => setSearchBrandRFID(d)} />
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
                      setPageExc(1);
                      setSearchTextExc(e.target.value);
                    }}
                  />
                  <SelectPicker value={searchBrandExc} placeholder="All Brands" size="lg" data={brandList} style={{ width: 200 }} onChange={(d: any) => setSearchBrandExc(d)} />
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
              <div className='table-responsive'>
                <table className={`align-items-center table-flush table mb-2 table-sm ${loadingClass}`}>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col' style={{ textAlign: 'center' }}>Brand</th>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Category</th>
                      <th scope='col'>Sub Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterPosts.length > 0 ? (
                      filterPosts.map((post: any, i: Number) => (
                        <tr key={post.ID}>
                          <td style={{ whiteSpace: "normal" }}>{post.ID}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.BRAND || 'NA'}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.ITEM_NAME}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.CATEGORY_NAME}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.CATEGORY_TYPE}</td>
                          <td>
                            <AddSku helper={editSkuHelper} formData={post} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>&nbsp;</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
              <div className='table-responsive'>
                <table className={`align-items-center table-flush table mb-2 ${loadingClassRFID}`}>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>RFID</th>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Location</th>
                      <th scope='col'>Quan</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterRFID.length > 0 ? (
                      <>
                        {filterRFID.map((d, i) => (
                          <tr key={`rfid-${i}`}>
                            <td style={{ whiteSpace: "normal" }}>{d.RFID}</td>
                            <td style={{ whiteSpace: "normal" }}>{d.ITEM_NAME}</td>
                            <td style={{ whiteSpace: "normal" }}>{d.NAME.replace(/___/g, ',')}</td>
                            <td>{d.ONHANDD_VALUE}</td>
                            <td><EditBatch helper={editBatchHelper} formData={d} /></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td style={{ whiteSpace: "normal" }} colSpan={5}>&nbsp;</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
              <div className='table-responsive'>
                <table className={`align-items-center table-flush table mb-2 table-sm ${loadingClassExc}`}>
                  <thead className='thead-light'>
                    <tr>
                      <th>RFID</th>
                      <th>Source Name</th>
                      <th>Destination Name</th>
                      <th>Product Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterPostsExc.length > 0 ? (
                      <>
                        {filterPostsExc.map((d, i) => (
                          <tr key={`exception-${i}`}>
                            <td style={{ whiteSpace: "normal" }}>{d.RFID}</td>
                            <td style={{ whiteSpace: "normal" }}>{d.ITEM_NAME}</td>
                            <td style={{ whiteSpace: "normal" }}>{d.DESTINATION_ITEM_NAME}</td>
                            <td style={{ whiteSpace: "normal" }}>
                              <SelectPicker value={selectValue[i]} data={product} style={{ width: 150 }} onChange={(e: any) => productMap(e, d.ID, i)} />
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td style={{ whiteSpace: "normal" }} colSpan={4}>&nbsp;</td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
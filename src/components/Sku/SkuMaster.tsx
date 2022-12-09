import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, SelectPicker } from 'rsuite';
import axios from 'axios';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

import { authHeader } from '../../helpers/auth-header';
import { commonFetchAllAuth, commonSubmit, logout } from '../../services/UserServices';
import { getBrandList } from '../../services/CommonServices';
import AddSku from './AddSku';

const baseURL = process.env.API_PATH + 'sku-products';

export default function SkuMaster() {
  const dispatch = useDispatch();
  const brandRef = useRef<any[]>([]);
  const brandSelectRef = useRef<any[]>([]);
  const addProductTriggerRef = useRef<any>(null);

  const [basicActive, setBasicActive] = useState('tab1');
  const [exceptionsItem, setExceptionsItem] = useState<any[]>([]);

  const [posts, setPosts] = useState<any[]>([]);
  const [filterPosts, setFilterPosts] = useState<any[]>([]);
  const [product, setProduct] = useState<any[]>([]);

  const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loadingClass, setLoadingClass] = useState('');
  const [bodyLoaderClass, setBodyLoaderClass] = useState("");

  const [selectValue, setSelectValue] = React.useState<any[]>([]);
  const [brandList, setBrandList] = useState<any[]>([]);
  const [productAdded, setProductAdded] = useState(0);

  const addSkuHelper = {
    setProductAdded,
    brandList,
    buttonName: 'Add Product',
    buttonClass: "btn btn-primary",
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

  const editSkuHelper = {
    setProductAdded,
    brandList,
    buttonName: 'Edit',
    buttonClass: "btn btn-success btn-sm",
  }

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

  //call when product map from exceptions section
  const productMap = (mapped_to_item_id: number, mapped_item_id: number, index: number) => {
    if ((+mapped_to_item_id || 0) > 0 && (+mapped_item_id || 0) > 0) {
      setBodyLoaderClass("cover-spin");
      setSelectValue((pre) => ({ ...pre, [index]: mapped_to_item_id }));
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

              setBodyLoaderClass("");
            }
          },
          (err) => {
            console.log(err);
            toast.error('Something went wrong');
            setBodyLoaderClass("");
          }
        );
    }
  }

  //when brand name clicked then brand select list is open
  const brandClickAction = (id: any) => {
    brandRef.current[id.toString()].classList.add('d-none');
    brandSelectRef.current[id.toString()].root.classList.remove('d-none');
  }

  //run when brand is assign to product
  const brandAssign = (brand_id: number, product_id: any) => {
    brandRef.current[product_id.toString()].classList.remove('d-none');
    const oldText = brandRef.current[product_id.toString()].innerText;
    brandRef.current[product_id.toString()].innerText = 'in process...';

    if ((+brand_id || 0) > 0 && (+product_id || 0) > 0) {
      setBodyLoaderClass("cover-spin");

      const data_to_send = { brand_id, product_id };
      commonSubmit(data_to_send, 'sku-brand-assignment', dispatch)
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

              brandRef.current[product_id.toString()].innerText = data.brand_name;

              setBodyLoaderClass("");
            }
          },
          (err) => {
            console.log(err);
            toast.error('Something went wrong');
            brandRef.current[product_id.toString()].innerText = oldText;
            setBodyLoaderClass("");
          }
        );
    } else {
      brandRef.current[product_id.toString()].innerText = oldText;
    }
  }

  //run when search enter, page change, post per change
  useEffect(() => {
    if (posts.length > 0) {
      const start = (+page - 1) * postsPerPage;
      const end = +postsPerPage + (+start);

      console.log(start, end)

      const filteredPost = posts.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchText.toLowerCase())).slice(start, end);

      setFilterPosts(filteredPost);

      setTotal(posts.filter((d) => d.ITEM_NAME.toLowerCase().includes(searchText.toLowerCase())).length);
    }
  }, [searchText, page, postsPerPage]);

  //call api for sku products
  useEffect(() => {
    loadData(searchText, Number(page) - 1, Number(postsPerPage));
  }, []);

  // sku exception items
  useEffect(() => {
    const getExceptionsItem = () => {
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
          },
          (err) => {
            console.log(err);
          }
        );
    }

    getExceptionsItem();
  }, [])

  //get brand list
  useEffect(() => {
    getBrandList(dispatch).then((data) => setBrandList(data?.map((d: { BRAND_NAME: any; ID: any; }) => ({ label: d.BRAND_NAME, value: d.ID }))));
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
            </form>{' '}
            <Dropdown title='All Products'>
              <Dropdown.Item>New File</Dropdown.Item>
              <Dropdown.Item>New File with Current Profile</Dropdown.Item>
              <Dropdown.Item>Download As...</Dropdown.Item>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export HTML</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>About</Dropdown.Item>
            </Dropdown>
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
              RFID ({" "})
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
              Exceptions ({exceptionsItem.length})
            </a>
          </li>
          <div className='col text-right'>
            <AddSku helper={addSkuHelper} formData={blankObj} />
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
                <table
                  className={`align-items-center table-flush table mb-2 table-sm ${loadingClass}`}
                >
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
                          <td style={{ whiteSpace: "normal", textAlign: 'center' }}>

                            <span onClick={() => brandClickAction(post.ID)} ref={(el) => { brandRef.current[post.ID.toString()] = el }}>{post.BRAND || 'NA'}</span>

                            <SelectPicker ref={(el) => { brandSelectRef.current[post.ID.toString()] = el }} style={{ width: 150 }} className="d-none" data={brandList} onChange={(e: any) => brandAssign(e, post.ID)} />
                          </td>
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
                <table className='align-items-center table-flush table mb-2'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>RFID</th>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Location</th>
                      <th scope='col'>Quan</th>
                      <th></th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td>A1540434343434</td>
                      <td>WYLD Elderberry Gummeis 2:1 TCH:CBN</td>
                      <td>Missiob Bay LLC</td>
                      <td>153</td>
                      <td>
                        <a href='#'>Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>A1540434343434</td>
                      <td>WYLD Elderberry Gummeis 2:1 TCH:CBN</td>
                      <td>Missiob Bay LLC</td>
                      <td>153</td>
                      <td>
                        <a href='#'>Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>A1540434343434</td>
                      <td>WYLD Elderberry Gummeis 2:1 TCH:CBN</td>
                      <td>Missiob Bay LLC</td>
                      <td>153</td>
                      <td>
                        <a href='#'>Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>A154043553434</td>
                      <td>WYLD Elderberry Gummeis 2:1 TCH:CBN</td>
                      <td>Missiob Bay LLC</td>
                      <td>153</td>
                      <td>
                        <a href='#'>Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>A1540434343434</td>
                      <td>WYLD Elderberry Gummeis 2:1 TCH:CBN</td>
                      <td>Missiob Bay LLC</td>
                      <td>153</td>
                      <td>
                        <a href='#'>Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td>A1540434343434</td>
                      <td>WYLD Elderberry Gummeis 2:1 TCH:CBN</td>
                      <td>Missiob Bay LLC</td>
                      <td>153</td>
                      <td>
                        <a href='#'>Edit</a>
                      </td>
                    </tr>
                  </tbody> */}
                </table>
                <div className='col text-right'>
                  <Pagination
                    pageSize={10}
                    total={30}
                    current={1}
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
                <table className='align-items-center table-flush table mb-2 table-sm'>
                  <thead className='thead-light'>
                    <tr>
                      <th>RFID</th>
                      <th>Source Name</th>
                      <th>Destination Name</th>
                      <th>Product Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exceptionsItem.map((d, i) => (
                      <tr key={`exception-${i}`}>
                        <td style={{ whiteSpace: "normal" }}>{d.RFID}</td>
                        <td style={{ whiteSpace: "normal" }}>{d.ITEM_NAME}</td>
                        <td style={{ whiteSpace: "normal" }}>{d.DESTINATION_ITEM_NAME}</td>
                        <td style={{ whiteSpace: "normal" }}>
                          <SelectPicker value={selectValue[i]} data={product} style={{ width: 150 }} onChange={(e: any) => productMap(e, d.ID, i)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='col text-right'>
                  <Pagination
                    pageSize={10}
                    total={10}
                    current={1}
                    itemRender={itemRender}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

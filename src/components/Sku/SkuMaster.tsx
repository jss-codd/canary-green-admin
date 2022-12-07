import React, { useState, useMemo, useEffect } from 'react';
import { Dropdown, SelectPicker } from 'rsuite';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { Pagination } from 'antd';

import { toast } from "react-toastify";

import { authHeader } from '../../helpers/auth-header';
import { commonFetchAllAuth, commonSubmit, logout } from '../../services/UserServices';
import { useDispatch } from 'react-redux';

export default function SkuMaster() {
  const dispatch = useDispatch();
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

  const baseURL = process.env.API_PATH + 'sku-products';

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
        // setPosts(response?.data?.product);
        // setTotal(response?.data?.totalLength);
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

  // useEffect(() => {
  //   loadData(searchText, Number(page) - 1, Number(postsPerPage));
  // }, [searchText, page, postsPerPage]);

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

  useEffect(() => {
    loadData(searchText, Number(page) - 1, Number(postsPerPage));
  }, []);

  const onShowSizeChange = (
    _current: any,
    pageSize: React.SetStateAction<number>
  ) => {
    setPostsPerPage(pageSize);
  };

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
          },
          (err) => {
            console.log(err);
          }
        );
    }

    getExceptionsItem();
  }, [])

  const productMap = (mapped_to_item_id: number, mapped_item_id: number) => {
    // console.log(mapped_to_item_id, 'mapped_to_item_id');
    // return false;
    setBodyLoaderClass("cover-spin");
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
              RFID (100)
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
            <a href='#' className='btn btn-primary'>
              Add Product
            </a>
          </div>
        </ul>

        <div className='tab-content'>
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
                      <th scope='col'>Brand</th>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Category</th>
                      <th scope='col'>Sub Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterPosts.length > 0 ? (
                      filterPosts.map((post: any) => (
                        <tr key={post.ID}>
                          <td style={{ whiteSpace: "normal" }}>{post.ID}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.BRAND}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.ITEM_NAME}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.CATEGORY_NAME}</td>
                          <td style={{ whiteSpace: "normal" }}>{post.CATEGORY_TYPE}</td>
                          <td>
                            <a href='#'>Edit</a>
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
                          <SelectPicker data={product} style={{ width: 150 }} onChange={(e: any) => productMap(e, d.ID)} />
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

import React, { useState, useMemo, useEffect } from 'react';
import { Dropdown } from 'rsuite';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { Pagination } from 'antd';

import { authHeader } from '../../helpers/auth-header';
import { logout } from '../../services/UserServices';
import { useDispatch } from 'react-redux';

export default function SkuMaster() {
  const dispatch = useDispatch();
  const [basicActive, setBasicActive] = useState('tab1');
  const [tabledata, setTabledata] = useState([]);

  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loadingClass, setLoadingClass] = useState('');

  const baseURL = process.env.API_PATH+'product-rfid-exceptions';

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
        setPosts(response?.data?.Product);
        setTotal(response?.data?.totalLength);
        setLoadingClass('');
      })
      .catch((error) => {
        console.log('error', error.response.status);
        if (error.response.status == '403' || error.response.status == '401') {
          logout(dispatch);
        }
      });
  };

  useEffect(() => {
    loadData(searchText, Number(page) - 1, Number(postsPerPage));
  }, [searchText, page, postsPerPage]);

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

  return (
    <>
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
            Exceptions (12)
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
                className={`align-items-center table-flush table mb-2 ${loadingClass}`}
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
                  {posts.length > 0 ? (
                    posts.map((post: any) => (
                      <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.brand}</td>
                        <td>{post.productName}</td>
                        <td>{post.category}</td>
                        <td>{post.subCategory}</td>
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
                <tbody>
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
                </tbody>
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
              <table className='align-items-center table-flush table mb-2'>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>RFID</th>
                    <th scope='col'>Source Name</th>
                    <th scope='col'>Destination Name</th>
                    <th scope='col'>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1A406030</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 1</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 10</td>
                    <td>
                      <div className='dropdown'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          Prod Name
                        </button>
                        <div
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <a className='dropdown-item' href='#'>
                            Action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Another action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1A406030</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 1</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 10</td>
                    <td>
                      <div className='dropdown'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          Prod Name
                        </button>
                        <div
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <a className='dropdown-item' href='#'>
                            Action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Another action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1A406030</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 1</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 10</td>
                    <td>
                      <div className='dropdown'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          Prod Name
                        </button>
                        <div
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <a className='dropdown-item' href='#'>
                            Action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Another action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1A406030</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 1</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 10</td>
                    <td>
                      <div className='dropdown'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          Prod Name
                        </button>
                        <div
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <a className='dropdown-item' href='#'>
                            Action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Another action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>1A406030</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 1</td>
                    <td>WYLD Elderberry Gummeis 12:11 TCG:AAA - 10</td>
                    <td>
                      <div className='dropdown'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          Prod Name
                        </button>
                        <div
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <a className='dropdown-item' href='#'>
                            Action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Another action
                          </a>
                          <a className='dropdown-item' href='#'>
                            Something else here
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
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

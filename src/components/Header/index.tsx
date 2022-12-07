import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/UserServices';
import { FaChartBar, FaChartPie, FaTrademark, FaUser } from 'react-icons/fa';
import { authHeader } from '../../helpers/auth-header';

interface SalesType {
  response: string;
  Data: String;
  MTD_sales: number;
  QTD_percent: number;
  MTD_percent: number;
  QTD_sales: number;
  YTD_sales: number;
  YTD_percent: number;
}

function Header() {
  const dispatch = useDispatch();
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [Data, setData] = useState<SalesType>();
  const baseURL = process.env.API_PATH + 'mtd-qtd-ytd';

  React.useEffect(() => {
    const defaultOptions = {
      headers: {
        ...authHeader(),
      },
    };
    axios.get(baseURL, { ...defaultOptions })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log('error', error.response.status);
        if (error.response.status == '403' || error.response.status == '401') {
          logout(dispatch);
        }
      });
  }, []);

  const doLogout = () => {
    logout(dispatch);
  };

  return (
    <>
      <div>
        <nav
          id='navbar-main'
          className='navbar-top navbar-dark navbar navbar-expand-md'
        >
          <div className='container-fluid'>
            <a
              className='h4 mb-0 text-white text-uppercase d-none d-lg-inline-block'
              href='/salesDashboard'
            >
              Sales Dashboard
            </a>
            <form className='navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto'>
              <div className='mb-0 form-group'>
                <div className='input-group-alternative input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-search'></i>
                    </span>
                  </div>
                  <input
                    placeholder='Search'
                    type='text'
                    className='form-control'
                  />
                </div>
              </div>
            </form>
            <div
              onClick={() => setdropdownOpen(!dropdownOpen)}
              className='overflow-hidden rounded-full w-8 h-8 flex justify-center items-center
                            hover:cursor-pointer
                            '
            >
              <div className='align-items-center media'>
                <span className='avatar avatar-sm rounded-circle'>
                  <img src='https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' />
                </span>
                <div className='ml-2 d-none d-lg-block media'>
                  <span className='mb-0 text-sm font-weight-bold text-white'>
                    Jessica Jones
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${dropdownOpen ? `` : 'invisible opacity-0'
                }   rounded border bg-white px-3 py-3 shadow-card transition-all dropdown-opemn`}
            >
              <ul className='drop-down-menu'>
                <li>
                  <a href=''>Dashboard</a>
                </li>
                <li>
                  <a href=''>Settings</a>
                </li>
                <li>
                  <a href=''>Earnings</a>
                </li>
                <li>
                  <a onClick={doLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='header bg-gradient-dark pb-8 pt-5 pt-md-8 '>
          <div className='container-fluid'>
            <div className='header-body'>
              <div className='row'>
                <div className='col-lg-6 col-xl-4'>
                  <div className='card-stats mb-4 mb-xl-0 card'>
                    <div className='card-body'>
                      <div className='row'>
                        <>
                          <div className='col'>
                            <h2> MTD_SALES</h2>
                            <h3 className='text-uppercase text-muted mb-0 card-title'>
                              ${Data?.MTD_sales}
                            </h3>
                            <span className='h3 font-weight-bold mb-0'>
                              {Data?.MTD_percent}%
                            </span>
                          </div>
                          <div className='col-auto col'>
                            <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                              <FaChartBar />
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-xl-4'>
                  <div className='card-stats mb-4 mb-xl-0 card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col'>
                          <h2> QTD_SALES</h2>
                          <h3 className='text-uppercase text-muted mb-0 card-title'>
                            <i className='bi bi-currency-dollar'></i>$
                            {Data?.QTD_sales}
                          </h3>
                          <span className='h3 font-weight-bold mb-0'>
                            {Data?.QTD_percent}%
                          </span>
                        </div>
                        <div className='col-auto col'>
                          <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                            <FaChartPie />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-xl-4'>
                  <div className='card-stats mb-4 mb-xl-0 card'>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col'>
                          <h2> YTD_SALES</h2>
                          <h3 className='text-uppercase text-muted mb-0 card-title'>
                            ${Data?.YTD_sales}
                          </h3>
                          <span className='h3 font-weight-bold mb-0'>
                            {Data?.YTD_percent}%
                          </span>
                        </div>
                        <div className='col-auto col'>
                          <div className='icon icon-shape bg-yellow text-white rounded-circle shadow'>
                            <FaUser />
                            {/* <i className='fas fa-users'></i> */}
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
      </div>
    </>
  );
}

export default Header;
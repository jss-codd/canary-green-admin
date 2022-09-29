import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Collapse } from 'reactstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';

import logo2 from "../../images/logo1.png";

import {
  FaChartArea,
  FaCogs,
  FaMeteor,
  FaSearchLocation,
  FaServicestack,
  FaTag,
  FaUserCheck,
  FaUserCog,
  FaUsers,
  FaWarehouse,
} from 'react-icons/fa';

function Sidebar() {
  const router = useRouter();
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [collapseOpenBrand, setCollapseOpenBrand] = React.useState(false);
  const [collapseOpenRetail, setCollapseOpenRetail] = React.useState(false);

  return (
    <>
      <nav
        id='sidenav-main'
        className='navbar-vertical fixed-left navbar-light bg-white navbar navbar-expand-md'
      >
        <div className='container-fluid'>
          <button className='navbar-toggler' type='button'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <span>
            <Link href='#!'>
              <a className='pt-0 navbar-brand'>
                <div className="text-center">
                  <Image
                    src={logo2}
                    alt="logo"
                    width="100px"
                    height="90px"
                  />
                </div>
              </a>
            </Link>
          </span>
          <ul className='align-items-center d-md-none nav'>
            <li className='dropdown nav-item'>
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
                className={`${dropdownOpen ? `` : 'invisible opacity-0'} rounded border bg-white px-3 py-3 shadow-card transition-all dropdown-opemn`}
              >
                {/* <ul className="drop-down-menu">
                  <li>
                    <Link href="">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="">Settings</Link>
                  </li>
                  <li>
                    <Link href="">Earnings</Link>
                  </li>
                  <li>
                    <Link href="">Logout</Link>
                  </li>
                </ul> */}
              </div>
            </li>
          </ul>
          <div className='collapse navbar-collapse'>
            <div className='navbar-collapse-header d-md-none'>
              <div className='row'>
                <div className='collapse-brand col-6'>
                  <img
                    alt='...'
                    data-cfsrc='/nextjs-argon-dashboard/_next/static/images/nextjs_argon_black-00653defbe44f7b5ed0e3926ec44f265.png'
                    src=''
                  />
                </div>
                <div className='collapse-close col-6'>
                  <button className='navbar-toggler' type='button'>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <form className='mt-4 mb-3 d-md-none'>
              <div className='input-group-rounded input-group-merge input-group'>
                <input
                  type='search'
                  aria-label='Search'
                  placeholder='Search'
                  className='form-control-rounded form-control-prepended form-control'
                />
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <span className='fa fa-search'></span>
                  </span>
                </div>
              </div>
            </form>

            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link href='/dashboard'>
                  <a
                    className={
                      router.pathname == '/dashboard'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    <FaChartArea />
                    Admin Panel Home
                  </a>
                </Link>
              </li>

              <li className='nav-item '>
                <Link href='/brand'>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setCollapseOpenBrand(!collapseOpenBrand);
                    }}
                    role='button'
                    id='collapseExample'
                    className={
                      router.pathname == '/brand-registrations' || router.pathname == '/brand-master' || router.pathname == '/sku-master' || router.pathname == '/subscriptions' || router.pathname == '/coal-mine'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    <FaTag />
                    Brand
                  </a>
                </Link>
              </li>
              <Collapse isOpen={router.pathname == '/brand-registrations' || router.pathname == '/brand-master' || router.pathname == '/sku-master' || router.pathname == '/subscriptions' || router.pathname == '/coal-mine' ? !collapseOpenBrand : collapseOpenBrand}>
                <ul className='sidebar-nav'>
                  <li className='nav-item '>
                    <Link href='/brand-registrations'>
                      <a
                        className={
                          router.pathname == '/brand-registrations'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaUserCog /> Registrations
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link href='./brand-master'>
                      <a
                        className={
                          router.pathname == '/brand-master'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaCogs /> Brand Master
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link href='/sku-master'>
                      <a
                        className={
                          router.pathname == '/sku-master'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaWarehouse /> SKU Master
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link href='./subscriptions'>
                      <a
                        className={
                          router.pathname == '/subscriptions'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaServicestack /> Subscriptions
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link href='./coal-mine'>
                      <a
                        className={
                          router.pathname == '/coal-mine'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaMeteor /> Coal Mine
                      </a>
                    </Link>
                  </li>
                </ul>
              </Collapse>

              <li className='nav-item'>
                <Link href='/'>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setCollapseOpenRetail(!collapseOpenRetail);
                    }}
                    role='button'
                    id='collapseExample'
                    className={
                      router.pathname == '/users' || router.pathname == '/locations'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    <FaUsers />
                    Retail
                  </a>
                </Link>
              </li>

              <Collapse isOpen={router.pathname == '/users' || router.pathname == '/locations' ? !collapseOpenRetail : collapseOpenRetail}>
                <ul className='sidebar-nav'>
                  <li className='nav-item '>
                    <Link href='/users'>
                      <a
                        className={
                          router.pathname == '/users'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaUserCheck /> Users
                      </a>
                    </Link>
                  </li>
                  <li className='nav-item '>
                    <Link href='./locations'>
                      <a
                        className={
                          router.pathname == '/locations'
                            ? 'nav-link active'
                            : 'nav-link'
                        }
                      >
                        <FaSearchLocation /> Locations
                      </a>
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </ul>
            <hr className='my-3' />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;

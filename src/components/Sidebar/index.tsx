import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Collapse } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';

import logo2 from "../../images/logo1.png";

import {
  FaChartArea,
  FaChartLine,
  FaClipboardList,
  FaCogs,
  FaDesktop,
  FaHammer,
  FaRegSun,
  FaShoppingBag,
  FaSignInAlt,
  FaTag,
  FaToolbox,
  FaTrademark,
  FaUserCog,
} from 'react-icons/fa';

interface AuthState {
  auth: any;
}

function Sidebar() {
  const router = useRouter();
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);

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
            <Link href='#'>
              <a className='pt-0 navbar-brand'><div className="text-center"><Image
                src={logo2}
                alt="logo"
                width="100px"
                height="90px"
              /></div></a>
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
                className={`${dropdownOpen ? `` : 'invisible opacity-0'
                  }   rounded border bg-white px-3 py-3 shadow-card transition-all dropdown-opemn`}
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

              <>
                <li className='nav-item '>
                  <Link href='/brand'>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setCollapseOpen(!collapseOpen);
                      }}
                      role='button'
                      id='collapseExample'
                      className={
                        router.pathname == '/brand'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      <FaTag />
                      Brand
                    </a>
                  </Link>
                </li>
                <Collapse isOpen={router.pathname == '/brand-registrations' || router.pathname == '/brand-master' ? !collapseOpen : collapseOpen}>
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
                          <FaUserCog/> Registrations
                        </a>
                      </Link>
                    </li>
                    <li className='nav-item '>
                      <Link href='/brand-master'>
                        <a
                          className={
                            router.pathname == '/brand-master'
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                        >
                          <FaCogs/> Brand Master
                        </a>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </>

              {/* <>
                <li className='nav-item '>
                  <Link href='/dashboard'>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setCollapseOpen(!collapseOpen);
                      }}
                      role='button'
                      id='collapseExample'
                      className={
                        router.pathname == '/dashboard'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                    >
                      <FaTag />
                      Admin Panel Home
                    </a>
                  </Link>
                </li>
                <Collapse isOpen={collapseOpen}>
                  <ul className='sidebar-nav'>
                    <li className='nav-item '>
                      <Link href='/dashboard'>
                        <a
                          className={
                            router.pathname == '/dashboard'
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                        >
                          <FaDesktop />
                          Dashboard
                        </a>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link href='/coalmine'>
                        <a
                          className={
                            router.pathname == '/coalmine'
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                        >
                          <FaHammer />
                          Coal Mines
                        </a>
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link href='/performances'>
                        <a
                          className={
                            router.pathname == '/performances'
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                        >
                          <FaChartLine />
                          Performance
                        </a>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link href='brandmaster'>
                        <a
                          className={
                            router.pathname == '/brandmaster'
                              ? 'nav-link active'
                              : 'nav-link'
                          }
                        >
                          <FaClipboardList />
                          Outreach Planning
                        </a>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </> */}

              {/* <li className='nav-item'>
                <Link href='/skumaster'>
                  <a
                    className={
                      router.pathname == '/skumaster'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    <FaToolbox />
                    SKU Master
                  </a>
                </Link>
              </li> */}

              {/* <li className='nav-item'>
                <Link href='/brandmaster'>
                  <a
                    className={
                      router.pathname == '/brandmaster'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    <FaTrademark />
                    Brand Master
                  </a>
                </Link>
              </li> */}

              {/* <li className='nav-item'>
                <Link href='#'>
                  <a
                    className={
                      router.pathname == '#' ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <FaSignInAlt />
                    Production Planning
                  </a>
                </Link>
              </li> */}

              {/* <li className='nav-item'>
                <Link href='#'>
                  <a
                    role='button'
                    className={
                      router.pathname == '/settings'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                  >
                    <FaRegSun />
                    Settings
                  </a>
                </Link>
              </li> */}

            </ul>
            <hr className='my-3' />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;

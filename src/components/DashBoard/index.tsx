import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";

import Sidebar from '../Sidebar';
import { FaAngleDoubleUp, FaChartLine, FaDatabase, FaExclamation, FaExclamationTriangle, FaUserCheck, FaUserFriends, FaUserTag, FaUserTimes } from 'react-icons/fa';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const rangeColor:any = ["#ffedea", "#ff5233"];
const colorScale:any = scaleLinear()
  .domain([0.01, 2.00])
  .range(rangeColor);


const Dashboard = () => {
  const [content, setContent] = useState("");
  return (
    <>
      <Sidebar />
      <div className='main-content'>
        <div className='cantainer'>
          <div
            className='border-0 card-header bg-gradient-dark'
            style={{ padding: '1.25rem 1.5rem 1.25rem 0.6rem' }}
          >
            <div className='header bg-gradient-dark pb-8 pt-2'>
              <div className='container-fluid'>
                <div className='header-body'>

                  <h1 className='h2 mb-2 text-center text-white text-uppercase'><u>Brand Indicators</u></h1>
                  <div className='row align-items-center'>
                    <div className='col-lg-6 col-xl-4'>
                      <div className='card-stats mb-4 mb-xl-0 card'>
                        <div className='card-body'>
                          <div className='row'>
                            <div className='col'>
                              <h2>Total Brand Users</h2>
                              <h3 className='font-weight-bold mb-0 text-success card-title'>
                                2000
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-green text-white rounded-circle shadow'>
                                <FaUserTag />
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
                              <h2>MoM Brand Growth</h2>
                              <h3 className='font-weight-bold mb-0 text-success card-title'>
                                17%
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                                <FaAngleDoubleUp />
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
                              <h2>!Active Brand Registration</h2>
                              <h3 className='font-weight-bold mb-0 text-success card-title'>
                                12 to review
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                                <FaUserTimes />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr style={{ marginTop: "1rem", marginBottom: "0.6rem" }}></hr>

                  <h1 className='h2 mb-2 text-center text-white text-uppercase'><u>System Indicators</u></h1>
                  <div className='row align-items-center'>
                    <div className='col-lg-6 col-xl-4'>
                      <div className='card-stats mb-4 mb-xl-0 card'>
                        <div className='card-body'>
                          <div className='row'>
                            <div className='col'>
                              <h2>!Broken Data Pulls</h2>
                              <h3 className='font-weight-bold mb-0 text-primary card-title'>
                                2
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                                <FaDatabase />
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
                              <h2>!Product Match Exceptions</h2>
                              <h3 className='font-weight-bold mb-0 text-primary card-title'>
                                25
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
                                <FaExclamationTriangle />
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
                              <h2>Users Currently Active</h2>
                              <h3 className='font-weight-bold mb-0 text-primary card-title'>
                                215 Users
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-primary text-white rounded-circle shadow'>
                                <FaUserCheck />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr style={{ marginTop: "1rem", marginBottom: "0.6rem" }}></hr>

                  <h1 className='h2 mb-2 text-center text-white text-uppercase'><u>Retail Indicators</u></h1>
                  <div className='row align-items-center'>
                    <div className='col-lg-6 col-xl-4'>
                      <div className='card-stats mb-4 mb-xl-0 card'>
                        <div className='card-body'>
                          <div className='row'>
                            <div className='col'>
                              <h2>Total Retails Users</h2>
                              <h3 className='font-weight-bold mb-0 text-primary card-title'>
                                5000
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-info text-white rounded-circle shadow'>
                                <FaUserFriends />
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
                              <h2>MoM Retail Growth</h2>
                              <h3 className='font-weight-bold mb-0 text-primary card-title'>
                                15%
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-success text-white rounded-circle shadow'>
                                <FaChartLine />
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
                              <h2>!Broken API Keys</h2>
                              <h3 className='font-weight-bold mb-0 text-primary card-title'>
                                7
                              </h3>
                            </div>
                            <div className='col-auto col'>
                              <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                                <FaExclamation />
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


          <div className='mt--7 container-fluid'>
            <div className='row'>
              <div className='col-xl-6'>
                <div className='rounded bg-white mb-3'>
                  <div className='rounded-t px-4 py-3 bg-transparent'>
                    <h1 className='h2 mb-2 text-center text-uppercase'><u>Market Indicators</u></h1>
                    <div className='shadow my-4'>
                      <div className='table-responsive subtable'>
                        <h3>Top 5 Brands</h3>
                        <table className='align-items-center table-flush table'>
                          <thead className='thead-light'>
                            <tr>
                              <th scope='col'>Brand</th>
                              <th scope='col'>Market</th>
                              <th scope='col'>30 Day Demand</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope='row'>STIIZY</th>
                              <td>California</td>
                              <td>30000</td>
                            </tr>
                            <tr>
                              <th scope='row'>Lowel Smokes</th>
                              <td>California</td>
                              <td>25000</td>
                            </tr>
                            <tr>
                              <th scope='row'>Wanna Gummeis</th>
                              <td>California</td>
                              <td>22000</td>
                            </tr>
                            <tr>
                              <th scope='row'>710 Labs</th>
                              <td>California</td>
                              <td>20000</td>
                            </tr>
                            <tr>
                              <th scope='row'>Tyson 2.0</th>
                              <td>Michigan</td>
                              <td>19000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-xl-6'>
                <div className='rounded bg-white mb-3'>
                  <div className='rounded-t px-4 py-3 bg-transparent'>
                    <h1 className='h2 mb-2 text-center text-uppercase'><u>Brand + Retail Pairs by Market</u></h1>
                    <div data-tip="">
                      <ComposableMap>
                        <ZoomableGroup>
                          <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                              geographies.map((geo, d) => (
                                <Geography
                                  key={geo.rsmKey}
                                  fill={d ? colorScale(d / 100) : "#fff"}
                                  geography={geo}
                                  onMouseEnter={() => {
                                    setContent(`${geo.properties.name}`);
                                  }}
                                  onMouseLeave={() => {
                                    setContent("");
                                  }}
                                  style={{
                                    hover: {
                                      fill: "#F53",
                                      outline: "none"
                                    },
                                    pressed: {
                                      fill: "#E42",
                                      outline: "none"
                                    }
                                  }}
                                />
                              ))
                            }
                          </Geographies>
                        </ZoomableGroup>
                      </ComposableMap>
                    </div>
                    <ReactTooltip>{content}</ReactTooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;

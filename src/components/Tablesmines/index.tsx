import React, { useState } from "react";
import axios from "axios";
// TypeError: Data.map is not a function
// ID:'203263825' ID:'2022-07-20T14:17:10.577': SALESCUSTOMERTYPE:'Consumer  TOTALPACKAGES: '1' TOTALPRICE:'60'
function Tablesmines() {
  const [inventry, setInventry] = useState();
  const [Data, setData] = useState([]);
  // const baseURL = "http://localhost:8080/api/coalmines/findAll";
  const baseURL =
    "https://dg1cvflu19.execute-api.us-west-1.amazonaws.com/snowdata";
    // console.log(baseURL,"baseURL----------------")
   React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data.body);
    });  
  }, []);
  
  // console.log(Data, "data-------");
  return (
   
    <div className="mt--7 container-fluid">
      <div className="row">
        <div className="col">
          <div className="shadow card mb-5">
            <div className="border-0 card-header">
              <h3 className="mb-0">Low Inventory</h3>
            </div>
            <div className="table-responsive ">
              <table className="align-items-center table-flush table table-striped">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Retailer</th>
                    <th scope="col">Location</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Days Of INV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>1555 Newton St</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br/>
                      <span> 0.5g Joint</span>
                    </td>
                    <td>2 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>4645 De Soto</td>
                    <td>
                      <span className="">Indica</span>
                      <br />
                      <span>1.0g Joint</span>
                    </td>
                    <td>3 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Kind Love</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Kind Love</th>
                    <td>342 Pine St</td>
                    <td>
                      <span className="">Sativa Vape</span>
                      <br />
                      <span>0.5g Disposable</span>
                    </td>
                    <td>0 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Best Buds</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Best Buds</th>
                    <td>722 Piermont Ave</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br />
                      <span>0.5g Joint</span>
                    </td>
                    <td>1 Days</td>
                  </tr>
                </tbody>
                {/* <tbody>
                  {Data?.slice(0,10).map((item: any, i: number) => (
                    <tr key={i}>
                      <>
                        <td>{item.ID}</td>
                        <td>{item.SALESCUSTOMERTYPE}</td>
                        <td>{item.TOTALPACKAGES}</td>
                        <td>{item.TOTALPRICE}</td>
                      </>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
            <div className="py-4 card-footer">
              <nav aria-label="...">
                <nav
                  className="pagination justify-content-end mb-0"
                  aria-label="pagination"
                >
                  <ul className="justify-content-end mb-0 pagination">
                    <li className="disabled page-item">
                      <a href="#" tabIndex={-1} className="page-link">
                        <i className="fas fa-angle-left"></i>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="active page-item">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        <i className="fas fa-angle-right"></i>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </nav>
            </div>
          </div>
          <div className="shadow card mb-5">
            <div className="border-0 card-header">
              <h3 className="mb-0">Aging Inventory</h3>
            </div>
            <div className="table-responsive">
              <table className="align-items-center table-flush table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Retailer</th>
                    <th scope="col">Location</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Days of Inv</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>1555 Newton St</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br/>
                      <span> 0.5g Joint</span>
                    </td>
                    <td>2 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>4645 De Soto</td>
                    <td>
                      <span className="">Indica</span>
                      <br />
                      <span>1.0g Joint</span>
                    </td>
                    <td>3 Days</td>
                  </tr>

                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Kind Love</span>
                        </div>
                      </div>
                    </th> */}
                     <th>Kind Love</th>
                    <td>342 Pine St</td>
                    <td>
                      <span className="">Sativa Vape</span>
                      <br />
                      <span>0.5g Disposable</span>
                    </td>
                    <td>0 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Best Buds</span>
                        </div>
                      </div>
                    </th> */}
                     <th>Best Buds</th>
                    <td>722 Piermont Ave</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br />
                      <span>0.5g Joint</span>
                    </td>
                    <td>1 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="py-4 card-footer">
              <nav aria-label="...">
                <nav
                  className="pagination justify-content-end mb-0"
                  aria-label="pagination"
                >
                  <ul className="justify-content-end mb-0 pagination">
                    <li className="disabled page-item">
                      <a href="#" tabIndex={-1} className="page-link">
                        <i className="fas fa-angle-left"></i>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="active page-item">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        <i className="fas fa-angle-right"></i>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </nav>
            </div>
          </div>
          <div className="shadow card mb-5">
            <div className="border-0 card-header">
              <h3 className="mb-0">Products Approaching Expiration</h3>
            </div>
            <div className="table-responsive">
              <table className="align-items-center table-flush table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Retailer</th>
                    <th scope="col">Location</th>
                    <th scope="col">SKU     </th>
                    <th scope="col">Days of Inv</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>1555 Newton St</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br/>
                      <span> 0.5g Joint</span>
                    </td>
                    <td>2 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>4645 De Soto</td>
                    <td>
                      <span className="">Indica</span>
                      <br />
                      <span>1.0g Joint</span>
                    </td>
                    <td>3 Days</td>
                  </tr>

                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Kind Love</span>
                        </div>
                      </div>
                    </th> */}
                     <th>Kind Love</th>
                    <td>342 Pine St</td>
                    <td>
                      <span className="">Sativa Vape</span>
                      <br />
                      <span>0.5g Disposable</span>
                    </td>
                    <td>0 Days</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Best Buds</span>
                        </div>
                      </div>
                    </th> */}
                     <th>Best Buds</th>
                    <td>722 Piermont Ave</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br />
                      <span>0.5g Joint</span>
                    </td>
                    <td>1 Days</td>
                  </tr>
                </tbody>
                {/* <tbody>
                  {Data?.map((item: any, i: number) => (
                    <tr key={i}>
                      <>                                                        
                        <td>{item.RETAILER}</td>
                        <td>{item.LOCATION}</td>
                        <td>{item.SKU}</td>
                        <td>{item.DAYSOFINV}</td>
                      </>{" "}
                    </tr>
                  ))}
                </tbody> */}
              
              </table>
            </div>
            <div className="py-4 card-footer">
              <nav aria-label="...">
                <nav
                  className="pagination justify-content-end mb-0"
                  aria-label="pagination"
                >
                  <ul className="justify-content-end mb-0 pagination">
                    <li className="disabled page-item">
                      <a href="#" tabIndex={-1} className="page-link">
                        <i className="fas fa-angle-left"></i>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="active page-item">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        <i className="fas fa-angle-right"></i>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </nav>
            </div>
          </div>
          <div className="shadow card mb-5">
            <div className="border-0 card-header">
              <h3 className="mb-0">Forecast Variance</h3>
            </div>
            <div className="table-responsive">
              <table className="align-items-center table-flush table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Retailer</th>
                    <th scope="col">Location</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Forecast</th>
                    <th scope="col">Actual</th>
                    <th scope="col">Variance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>1555 Newton St</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br />
                      <span> 0.5g Joint</span>
                    </td>
                    <td>100</td>
                    <td>120</td>
                    <td>20%</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Columbia Care</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Columbia Care</th>
                    <td>4645 De Soto</td>
                    <td>
                      <span className="">Indica</span>
                      <br />
                      <span>1.0g Joint</span>
                    </td>
                    <td>100</td>
                    <td>120</td>
                    <td>20%</td>
                  </tr>

                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Kind Love</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Kind Love</th>
                    <td>342 Pine St</td>
                    <td>
                      <span className="">Sativa Vape</span>
                      <br />
                      <span>0.5g Disposable</span>
                    </td>
                    <td>100</td>
                    <td>120</td>
                    <td>20%</td>
                  </tr>
                  <tr>
                    {/* <th scope="row">
                      <div className="align-items-center media">
                        <div className="media">
                          <span className="mb-0 text-sm">Best Buds</span>
                        </div>
                      </div>
                    </th> */}
                    <th>Kind Love</th>
                    <td>722 Piermont Ave</td>
                    <td>
                      <span className="">Hybrid</span>
                      <br />
                      <span>0.5g Joint</span>
                    </td>
                    <td>100</td>
                    <td>120</td>
                    <td>20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="py-4 card-footer">
              <nav aria-label="...">
                <nav
                  className="pagination justify-content-end mb-0"
                  aria-label="pagination"
                >
                  <ul className="justify-content-end mb-0 pagination">
                    <li className="disabled page-item">
                      <a href="#" tabIndex={-1} className="page-link">
                        <i className="fas fa-angle-left"></i>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="active page-item">
                      <a href="#" className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">
                        <i className="fas fa-angle-right"></i>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tablesmines;
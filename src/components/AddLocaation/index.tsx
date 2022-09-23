
function AddLocation() {

    return (
        <div className="mt--7 container-fluid">
            <div className="row">
                <div className=" col-xl-12">
                    <div className="bg-secondary shadow card mb-5">
                        <div className="bg-white border-0 card-header">
                            <div className="align-items-center row">
                                <div className="col-8">
                                    <h3 className="mb-0">Location</h3>
                                </div>
                                <div className="text-right col-4"><a href="#pablo" className="btn btn-primary btn-sm">Settings</a></div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form className="">
                                <div >
                                    <div className="row align-items-end" >
                                        <div className="col-lg-10">
                                            <div className="form-group m-0"><label className="form-control-label" htmlFor="input-username">Retailer API Key</label><input id="input-username" type="text" className="form-control-alternative form-control" 
                                            placeholder="sKwf0zfZ3iRQpAw7qz8BqZpOlfkXDXJfdTsJEzaFi0V-mFc7"
                                             /></div>
                                        </div>
                                        <div className="col-lg-2">
                                            <button className="btn btn-success">Validate</button>
                                        </div>
                                    </div>
                                </div>
                            </form>                          
                        </div>
                    </div>
                    <div className="bg-secondary shadow card mb-5">
                        <div className="bg-white border-0 card-header">
                            <div className="align-items-center row">
                                <div className="col-8">
                                    <h3 className="mb-0">Currently Monitored Licenses</h3>
                                </div>
                         
                            </div>
                        </div>
                        <div className="">
                            <div className="p-3 bg-blue-1">
                            C10-0000288-LIC - the WEED Retail License
                            </div>
                            <div className="bg-white p-3">
                            C10-0000527-LIC - San Francisco Retail License
                            </div>
                            

                        </div>
                    </div>
                    <div className="bg-secondary shadow card mb-5">
                        <div className="bg-white border-0 card-header">
                            <div className="align-items-center row">
                                <div className="col-8">
                                    <h3 className="mb-0">Available to Add for Monitoring</h3>
                                </div>                         
                            </div>
                        </div>
                        <div className="">
                            <div className="p-3 bg-green-1">
                            C10-0000130-LIC - North Hollywood Retail License
                            </div>
                            <div className="bg-white p-3">
                            C10-0000050-LIC - Downtown LA Retail License    
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddLocation;
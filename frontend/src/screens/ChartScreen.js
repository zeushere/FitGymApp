import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import Chart from 'react-google-charts';
import MessageBox from '../components/MessageBox';

export default function ChartScreen() {
    const orderSummary = useSelector((state) => state.orderSummary);
    const{loading,summary,error} = orderSummary;
    const dispatch = useDispatch();
    useEffect (()=>{
        dispatch(summaryOrder());
    },[dispatch]);
    return (
        <div className = "container">
           <div className = "row">
           <div><h1 className="display-2 mt-4 mb-4 text-center">Statistics</h1></div>
           </div>
           
           {loading?
             (<LoadingBox/>)  
            :error?(<MessageBox variant = "danger">{error}</MessageBox>):(<>
            <div className = "row">
                <div className = "col-4">
                  <span>
                        <i className = "fa fa-users"/><strong>Users</strong>
                    </span>
                    
                    <div className = "summary-body">
                    {summary.users[0].numUsers}
                    </div>
                    </div>
            
                    <div className = "col-4">
                    <span>
                        <i className = "fa fa-shopping-cart"/><strong>Orders</strong>
                    </span>
                    
                    <div className = "summary-body">
                    {summary.orders[0]?summary.orders[0].numOrders: 0}
                    </div>
                    </div>
                    
                    <div className = "col-4">
                    <span>
                        <i className = "fa fa-money"/><strong>Sales</strong>
                    </span>
                    
                    <div className="summary-body">
                
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
           </div>
          </div>
          <hr className="mt-5 mb-5" style={{ border: "0px", borderTop: "5px solid blue" }}></hr>
          <div className = "row mb-5">
          <div className = " mt-3 "><h1 className="display-2 text-center">Charts</h1></div>
            </div>
           <div className = "container border border-success">
                <div className = "row ">
               <div className = "text-center pt-4"><span className="display-6 mt-5 mb-4">Sales charts</span></div>
               </div>
               <div className = "row">
               <div className = "col-12">
                  {
                      summary.dailyOrders.length === 0 ? (
                          <MessageBox>No Sale</MessageBox>
                      ): <Chart width = "100%" height = "400px" chartType = "AreaChart"
                      loader = {<div>Loading Chart</div>}
                      data={[
                          ['Date', 'Sales'],
                          ...summary.dailyOrders.map((x) =>[x._id,x.sales]),
                      ]
                  
                      }
                      />
                  }
               </div>
               </div>
           </div>
         
          <div className = "container mt-5 mb-5 border border-success">
              
              <div className = "row ">
               <div className = "text-center pt-4"><span className="display-6 mt-5 mb-4">Categories charts</span></div>
               </div>
              <div className  = "row">
              <div className = "col-12">
                  {
                      summary.productCategories.length === 0 ? (
                          <MessageBox>No Category</MessageBox>
                      ): <Chart width = "100%" height = "400px" chartType = "PieChart"
                      loader = {<div>Loading Chart</div>}
                      data={[
                          ['Category', 'Products'],
                          ...summary.productCategories.map((x) =>[x._id,x.count]),
                      ]
                      }
                      />
                  }
                  </div>
              </div>
              </div>
               </>)}
           </div>  
    )
}

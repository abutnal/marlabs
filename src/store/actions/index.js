import { FETCH_USER, DELETE_USER, FILTER_USER } from './type';
import mockRequests from "./requests.json";

export const getRequestsSync = () => mockRequests;


export const fetchUser = (dispatch) =>{

const promise = new Promise((resolve, reject) => {
    setTimeout(() =>{
    	if(true){
    		resolve( dispatch({
    		type: FETCH_USER,
    	    payload: mockRequests
    	}))
    	}else{
          reject('Rejected')
    	}
       
      
    }, 500);
  });

return promise;
}

// export const filterUser = (data) =>{
//   return dispatch =>{
//     console.log(data);
//   console.log('Hello got it');

//   }
// }


export const filterUser = (status)=> dispatch =>{
    const promise = new Promise((resolve, reject) => {
        var filterData = [];
        
      

    setTimeout(() =>{
        if(true){

            const data = mockRequests.filter((user)=>{
          return user.status == status.value
        })

        if(data.length>0){
         filterData = data;
        }
        else{
        filterData = mockRequests;
        }
       
            resolve( dispatch({

            type: FILTER_USER,
            payload: filterData
        }))
        }else{
          reject('Rejected')
        }
    }, 500);

  });

return promise;
}


export const deleteUser = (user_id)=> dispatch =>{
    const promise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        if(true){

            const data = mockRequests.filter((user)=>{
            return user.id != user_id
            })
            resolve( dispatch({

            type: DELETE_USER,
            payload: data
        }))
        }else{
          reject('Rejected')
        }
       
      
    }, 500);
  });

return promise;
}


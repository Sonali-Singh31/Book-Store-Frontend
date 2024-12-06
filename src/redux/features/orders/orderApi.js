import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";


const ordersApi = createApi({
    reducerPath:'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/orders`,
        credentials:'include'
    }),
    tagTypes:['Orders'],
    endpoints:(builder)=>({
        createOrder:(builder.mutation)({
            query:(newOrder)=>({
                url:'/',
                method:'POST',
                body:newOrder,
                credentials:'include'
            })

        }),
        getOrderByEmail:(builder.query)({
            query:(email)=>({
                url:`/email/${email}`,
                method:'GET'
            }),
            providesTags:['Orders']
        })
    })
})

export const {useCreateOrderMutation,useGetOrderByEmailQuery} = ordersApi;
export default ordersApi
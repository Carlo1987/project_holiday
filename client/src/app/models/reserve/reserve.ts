 export const reserve_model = {
    home_id: '', 
    home_calendary: {},
    home_data : {},
    user_data:{},
    checkIn:'',
    checkOut:'',
    total_nights:0,
    guests:1,
    date_reserve: new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()+' alle '+new Date().getHours()+':'+new Date().getMinutes(),
    discount: {
      set : false,
      days: 0,
      value_percentage: 0,
      value:0
    },
    clean: "",
    advance: {
      set : false,
      value : 0,
      value_advance: 0,
      rest_advance: 0 
    },
    cost: {
      total_cost : 0,
      discounted_cost: 0,
      final_cost : 0 
   },
    payment:[],
    status : "in sospeso",
    refund: {}
  }; 



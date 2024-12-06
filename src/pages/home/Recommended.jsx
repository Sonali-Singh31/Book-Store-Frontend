// import { useEffect, useState } from "react";
import BookCard from "../books/BookCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
const Recommended = () => {
  const { data = {} } = useFetchAllBooksQuery();
  const books = data.book || [];
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6 ">Recommended for you</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        // navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
        //   640: {
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //     spaceBetween: 30,
        //   },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1180: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
            books.length>0 && books.slice(8,13).map((book,index)=>(
                <SwiperSlide key={index} className="flex justify-center">
                    <BookCard book={book}/>
                </SwiperSlide>
                
            ))
        }
        
      </Swiper>
    </div>
  )
}

export default Recommended

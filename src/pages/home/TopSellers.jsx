import {  useState } from "react";
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


const categories = ["Choose a genre","Business","Fiction","Horror","Adventure"]

const TopSellers = () => {
  
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  // const {data:books=[]} = useFetchAllBooksQuery();
  // console.log(books)
  const { data = {} } = useFetchAllBooksQuery();
  const books = data.book || [];
  
  const filteredBooks = selectedCategory === "Choose a genre" ? books:books.filter(book => book.category === selectedCategory.toLowerCase())

  return (
    <>
    <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6 ">Top Seller</h2>

        {/* Category filtering */}
        <div className="mb-8 flex items-center">
            <select onClick={(e)=> setSelectedCategory(e.target.value)} name="category" id="category" className="border border-gray-300 bg-[#EAEAEA] rounded-md px-4 py-2 focus:outline-none">
                {
                    categories.map((category,index)=>(
                        <option value={category} key={index}>{category}</option>
                    ))
                }
            </select>
        </div>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        // navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // 640: {
          //   slidesPerView: 1,
          //   spaceBetween: 20,
          // },
          // 768: {
          //   slidesPerView: 1,
          //   spaceBetween: 20,
          // },
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
            filteredBooks.length>0 && filteredBooks.map((book,index)=>(
                <SwiperSlide key={index} className="flex justify-center">
                    <BookCard book={book}/>
                </SwiperSlide>
                
            ))
        }
        
      </Swiper>
    </div>
    </>
  )
}

export default TopSellers;
